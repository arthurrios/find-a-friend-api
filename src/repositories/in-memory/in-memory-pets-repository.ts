import type { Pet, Prisma } from '@prisma/client'
import type { FindAllParams, PetsRepository } from '../pets-repository'
import type { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository?: InMemoryOrgsRepository) {}

  async findAllInCity(params: FindAllParams): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository?.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((item) => orgsByCity?.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energyLevel === params.energy_level : true,
      )
      .filter((item) =>
        params.independency_level
          ? item.independencyLevel === params.independency_level
          : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: 'pet-1',
      ...data,
    }

    this.items.push(pet)

    return pet
  }
}
