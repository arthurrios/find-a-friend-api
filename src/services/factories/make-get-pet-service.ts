import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetService } from '../get-pet'

export function makeGetPetService() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPetService = new GetPetService(prismaPetsRepository)

  return getPetService
}
