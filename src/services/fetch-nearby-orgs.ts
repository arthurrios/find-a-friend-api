import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { Org } from '@prisma/client'

interface FetchNearbyOrgsRequest {
  userLatitude: number
  userLongitude: number
  radius?: number
}

interface FetchNearbyOrgsResponse {
  orgs: Org[]
}

export class FetchNearbyOrgsService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
    radius,
  }: FetchNearbyOrgsRequest): Promise<FetchNearbyOrgsResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      radius,
    })

    return { orgs }
  }
}
