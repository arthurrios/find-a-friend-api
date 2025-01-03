import { compare } from 'bcrypt'
import { OrgsRepository } from './../repositories/orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import type { Org } from '@prisma/client'

interface AuthenticateOrgServiceRequest {
  email: string
  password: string
}
interface AuthenticateOrgServiceResponse {
  org: Org
}

export class AuthenticateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const passwordsDoMatch = await compare(password, org.passwordHash)

    if (!passwordsDoMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
