import { prisma } from '@/lib/prisma'
import { Prisma, type Org } from '@prisma/client'
import type { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
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
