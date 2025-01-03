import { prisma } from '@/lib/prisma'
import { Prisma, type Org } from '@prisma/client'
import type { FindManyNearbyParams, OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findManyNearby({ latitude, longitude, radius }: FindManyNearbyParams) {
    const orgs = await prisma.$queryRaw<Org[]>`
       SELECT * from orgs
       WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${radius}
    `

    return orgs
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: { id },
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: { email },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
