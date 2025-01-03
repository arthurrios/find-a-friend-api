import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetService } from './get-pet'
import { PetNotFoundError } from './errors/pet-not-found-error copy'

describe('Get Pet Service', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetService

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetService(petsRepository)
  })
  it('should be able to get a pet by its id', async () => {
    const pet = await petsRepository.create({
      id: 'pet-1',
      name: 'Pet name',
      about: 'Pet description',
      age: '3',
      energyLevel: 'High',
      environment: 'Open space',
      independencyLevel: '1',
      size: '4',
      org_id: 'ord-1',
    })
    const result = await sut.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })

  it('should not be able to get a pet with a non-existing id', async () => {
    await expect(sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
