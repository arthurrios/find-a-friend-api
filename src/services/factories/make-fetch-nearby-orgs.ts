import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FetchNearbyOrgsService } from '../fetch-nearby-orgs'

export function makeFetchNearbyOrgsService() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const fetchNearbyOrgsService = new FetchNearbyOrgsService(
    prismaOrgsRepository,
  )

  return fetchNearbyOrgsService
}
