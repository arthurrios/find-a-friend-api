import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyOrgsService } from './fetch-nearby-orgs'
import { hash } from 'bcrypt'

describe('Fetch Nearby Orgs Service', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: FetchNearbyOrgsService

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchNearbyOrgsService(orgsRepository)
  })
  it('should be able to fetch nearby organizations inside user defined radius', async () => {
    const RADIUS_IN_KILOMETERS = 5
    const userLatitude = 0
    const userLongitude = 0

    const org1 = await orgsRepository.create({
      name: 'Org name',
      ownerName: 'Owner name',
      email: 'org@email.com',
      whatsapp: '61999999999',
      passwordHash: await hash('123456', 6),
      cep: '70000000',
      state: 'DF',
      city: 'Brasília',
      neighborhood: 'Plano Piloto',
      street: 'Quadra 1',
      latitude: 0,
      longitude: 0,
    })

    await orgsRepository.create({
      name: 'Org 2',
      ownerName: 'Owner 2',
      email: 'org2@email.com',
      whatsapp: '61999999998',
      passwordHash: await hash('123456', 6),
      cep: '70000000',
      state: 'DF',
      city: 'Brasília',
      neighborhood: 'Asa Norte',
      street: 'Quadra 2',
      latitude: 1.0,
      longitude: 1.0,
    })

    const nearbyOrgs = await sut.execute({
      userLatitude,
      userLongitude,
      radius: RADIUS_IN_KILOMETERS,
    })

    expect(nearbyOrgs.orgs).toEqual([org1])
    expect(nearbyOrgs.orgs).toHaveLength(1)
  })
  it('should be able to fetch nearby organizations inside default radius of 10km', async () => {
    const userLatitude = 0
    const userLongitude = 0

    const org1 = await orgsRepository.create({
      name: 'Org name',
      ownerName: 'Owner name',
      email: 'org@email.com',
      whatsapp: '61999999999',
      passwordHash: await hash('123456', 6),
      cep: '70000000',
      state: 'DF',
      city: 'Brasília',
      neighborhood: 'Plano Piloto',
      street: 'Quadra 1',
      latitude: 0,
      longitude: 0,
    })

    const org2 = await orgsRepository.create({
      name: 'Org 2',
      ownerName: 'Owner 2',
      email: 'org2@email.com',
      whatsapp: '61999999998',
      passwordHash: await hash('123456', 6),
      cep: '70000000',
      state: 'DF',
      city: 'Brasília',
      neighborhood: 'Asa Norte',
      street: 'Quadra 2',
      latitude: 0.000000001,
      longitude: 0.000000001,
    })

    const nearbyOrgs = await sut.execute({
      userLatitude,
      userLongitude,
      // radius: 10
    })

    expect(nearbyOrgs.orgs).toEqual([org1, org2])
    expect(nearbyOrgs.orgs).toHaveLength(2)
  })
})
