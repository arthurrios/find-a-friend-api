import type { Pet } from '@prisma/client'
import type { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found-error copy'

interface GetPetServiceRequest {
  id: string
}

interface GetPetServiceResponse {
  pet: Pet
}

export class GetPetService {
  constructor(private petsRepository: PetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute({ id }: GetPetServiceRequest): Promise<GetPetServiceResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
