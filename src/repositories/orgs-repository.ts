import type { Org, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
  radius?: number
}

export interface OrgsRepository {
  findManyNearby(params: FindManyNearbyParams): Promise<Org[]>
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
