import { describe, it, expect } from 'vitest'
import { RegisterService } from './register-org'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

describe('Register service', () => {
  it('should be able to register an organization', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const registerService = new RegisterService(orgsRepository)

    const { org } = await registerService.execute({
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
    const orgsRepository = new InMemoryOrgsRepository()
    const registerService = new RegisterService(orgsRepository)

    const { org } = await registerService.execute({
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
    const orgsRepository = new InMemoryOrgsRepository()
    const registerService = new RegisterService(orgsRepository)

    const email = 'org@email.com'

    await registerService.execute({
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
      registerService.execute({
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
