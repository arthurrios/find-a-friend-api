import type { Pet } from '@prisma/client'
import type { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsServiceRequest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  independency_level?: string
  environment?: string
}

interface SearchPetsServiceResponse {
  pets: Pet[]
}

export class SearchPetsService {
  constructor(private petsRepository: PetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute({
    city,
    age,
    energy_level,
    environment,
    independency_level,
    size,
  }: SearchPetsServiceRequest): Promise<SearchPetsServiceResponse> {
    const pets = await this.petsRepository.findAllInCity({
      city,
      age,
      energy_level,
      environment,
      independency_level,
      size,
    })

    return { pets }
  }
}
