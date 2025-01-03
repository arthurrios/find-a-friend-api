import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterService } from './register-org'
import { compare } from 'bcrypt'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterService
describe('Register service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterService(orgsRepository)
  })
  it('should be able to register an organization', async () => {
    const { org } = await sut.execute({
      name: 'Org name',
      owner_name: 'Owner name',
      email: 'org@email.com',
      whatsapp: '61999999999',
      password: '123456',
      cep: '70000000',
      state: 'DF',
      city: 'Brasília',
      neighborhood: 'Plano Piloto',
      street: 'Quadra 1',
      latitude: 0,
      longitude: 0,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Org name',
      owner_name: 'Owner name',
      email: 'org@email.com',
      whatsapp: '61999999999',
      password: '123456',
      cep: '70000000',
      state: 'DF',
      city: 'Brasília',
      neighborhood: 'Plano Piloto',
      street: 'Quadra 1',
      latitude: 0,
      longitude: 0,
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'org@email.com'

    await sut.execute({
      name: 'Org name',
      owner_name: 'Owner name',
      email,
      whatsapp: '61999999999',
      password: '123456',
      cep: '70000000',
      state: 'DF',
      city: 'Brasília',
      neighborhood: 'Plano Piloto',
      street: 'Quadra 1',
      latitude: 0,
      longitude: 0,
    })

    await expect(() =>
      sut.execute({
        name: 'Org name',
        owner_name: 'Owner name',
        email,
        whatsapp: '61999999999',
        password: '123456',
        cep: '70000000',
        state: 'DF',
        city: 'Brasília',
        neighborhood: 'Plano Piloto',
        street: 'Quadra 1',
        latitude: 0,
        longitude: 0,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
