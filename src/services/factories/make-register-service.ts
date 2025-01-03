import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterService } from '../register-org'

export function makeRegisterService() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const registerService = new RegisterService(prismaOrgsRepository)

  return registerService
}
