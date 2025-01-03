import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetService } from './register-pet'
import { hash } from 'bcrypt'
import { OrgNotFoundError } from './errors/org-not-found-error'

describe('Register Pet Service', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: RegisterPetService

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new RegisterPetService(orgsRepository, petsRepository)
  })

  it('should be able to register a new pet', async () => {
    const org = await orgsRepository.create({
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

    const { pet } = await sut.execute({
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energy_level: 'High',
      environment: 'Open space',
      independency_level: '1',
      size: '4',
      org_id: org.id,
    })

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a new pet with a non-existing org', async () => {
    await expect(
      sut.execute({
        name: 'Pet name',
        about: 'Pet description',
        age: '3',
        energy_level: 'High',
        environment: 'Open space',
        independency_level: '1',
        size: '4',
        org_id: 'non-existing-org-id',
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
