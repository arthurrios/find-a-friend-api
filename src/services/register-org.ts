import type { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './erros/org-already-exists-error'

interface RegisterServiceRequest {
  name: string
  owner_name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

export class RegisterService {
  constructor(private orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({
    name,
    owner_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: RegisterServiceRequest) {
    const passwordHash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    await this.orgsRepository.create({
      name,
      ownerName: owner_name,
      email,
      whatsapp,
      passwordHash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })
  }
}
