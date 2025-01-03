import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsService } from './search-pets'
import { hash } from 'bcrypt'

describe('Search Pets Service', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsService

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsService(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const org = await orgsRepository.create({
      id: 'org-1',
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

    await petsRepository.create({
      id: 'pet-1',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: '4',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-2',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: '4',
      org_id: org.id,
    })

    const org2 = await orgsRepository.create({
      id: 'org-2',
      name: 'Org 2 name',
      ownerName: 'Owner name',
      email: 'org2@email.com',
      whatsapp: '61999999999',
      passwordHash: await hash('123456', 6),
      cep: '70000000',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Plano Piloto',
      street: 'Quadra 1',
      latitude: 0,
      longitude: 0,
    })

    await petsRepository.create({
      id: 'pet-3',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: '4',
      org_id: org2.id,
    })

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city })

    expect(pets2).toHaveLength(1)
  })
  it('should be able to search pets by city and size', async () => {
    const org = await orgsRepository.create({
      id: 'org-1',
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

    await petsRepository.create({
      id: 'pet-1',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'small',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-2',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'medium',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-3',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'large',
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city, size: 'small' })

    expect(pets).toHaveLength(1)
  })
  it('should be able to search pets by city and age', async () => {
    const org = await orgsRepository.create({
      id: 'org-1',
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

    await petsRepository.create({
      id: 'pet-1',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'small',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-2',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'medium',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-3',
      name: 'Pet name',
      about: 'Pet description',
      age: '4',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'large',
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: org.city, age: '4' })

    expect(pets).toHaveLength(1)
  })
  it('should be able to search pets by city and energyLevel', async () => {
    const org = await orgsRepository.create({
      id: 'org-1',
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

    await petsRepository.create({
      id: 'pet-1',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'small',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-2',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'Medium',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'medium',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-3',
      name: 'Pet name',
      about: 'Pet description',
      age: '4',
      energyLevel: 'Low',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'large',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      city: org.city,
      energy_level: 'Medium',
    })

    expect(pets).toHaveLength(1)
  })
  it('should be able to search pets by city and environment', async () => {
    const org = await orgsRepository.create({
      id: 'org-1',
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

    await petsRepository.create({
      id: 'pet-1',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'small',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-2',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'Medium',
      environment: 'Closed space',
      independencyLevel: '1',
      size: 'medium',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-3',
      name: 'Pet name',
      about: 'Pet description',
      age: '4',
      energyLevel: 'Low',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'large',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      city: org.city,
      environment: 'Open space',
    })

    expect(pets).toHaveLength(2)
  })

  it('should be able to search pets by city and independencyLevel', async () => {
    const org = await orgsRepository.create({
      id: 'org-1',
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

    await petsRepository.create({
      id: 'pet-1',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: 'small',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-2',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'Medium',
      environment: 'Closed space',
      independencyLevel: '2',
      size: 'medium',
      org_id: org.id,
    })

    await petsRepository.create({
      id: 'pet-3',
      name: 'Pet name',
      about: 'Pet description',
      age: '4',
      energyLevel: 'Low',
      environment: 'Open space',
      independencyLevel: '3',
      size: 'large',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      city: org.city,
      independency_level: '2',
    })

    expect(pets).toHaveLength(1)
  })
})
