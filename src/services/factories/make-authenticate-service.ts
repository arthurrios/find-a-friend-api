import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgService } from '../authenticate-org'

export function makeAuthenticateService() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const authenticateService = new AuthenticateOrgService(prismaOrgsRepository)

  return authenticateService
}
