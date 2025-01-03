import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { Pet } from '@prisma/client'
import { OrgNotFound } from './errors/org-does-not-exist-error'
import type { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetServiceRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  independency_level: string
  environment: string
  org_id: string
}

interface RegisterPetServiceResponse {
  pet: Pet
}

export class RegisterPetService {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {
    this.orgsRepository = orgsRepository
    this.petsRepository = petsRepository
  }

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    independency_level,
    environment,
    org_id,
  }: RegisterPetServiceRequest): Promise<RegisterPetServiceResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFound()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energyLevel: energy_level,
      environment,
      independencyLevel: independency_level,
      size,
      org_id,
    })

    return { pet }
  }
}
