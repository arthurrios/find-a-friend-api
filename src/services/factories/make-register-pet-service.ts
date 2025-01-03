import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterPetService } from '../register-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeRegisterPetService() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const prismaPetsRepository = new PrismaPetsRepository()
  const registerService = new RegisterPetService(
    prismaOrgsRepository,
    prismaPetsRepository,
  )

  return registerService
}
