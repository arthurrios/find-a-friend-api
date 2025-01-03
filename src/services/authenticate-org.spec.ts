import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcrypt'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateOrgService } from './authenticate-org'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate service', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateOrgService

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgService(orgsRepository)
  })
  it('should be able to authenticate as an organization', async () => {
    await orgsRepository.create({
      name: 'Org name',
      ownerName: 'Owner name',
      email: 'org@email.com',
      whatsapp: '61999999999',
      passwordHash: await hash('123456', 6),
      cep: '70000000',
      state: 'DF',
      city: 'Brasília',
      neighborhood: 'Plano Piloto',
      street: 'Quadra 1',
      latitude: 0,
      longitude: 0,
    })

    const { org } = await sut.execute({
      email: 'org@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'org@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'Org name',
      ownerName: 'Owner name',
      email: 'org@email.com',
      whatsapp: '61999999999',
      passwordHash: await hash('123456', 6),
      cep: '70000000',
      state: 'DF',
      city: 'Brasília',
      neighborhood: 'Plano Piloto',
      street: 'Quadra 1',
      latitude: 0,
      longitude: 0,
    })

    await expect(
      sut.execute({
        email: 'org@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
