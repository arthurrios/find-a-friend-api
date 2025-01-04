import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsService } from '../search-pets'

export function makeSearchPetsService() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const registerService = new SearchPetsService(prismaPetsRepository)

  return registerService
}
