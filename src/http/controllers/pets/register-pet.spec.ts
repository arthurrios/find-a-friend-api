import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should register a new pet', async () => {
    await request(app.server).post('/orgs').send({
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'org@email.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet name',
        about: 'Pet description',
        age: '3',
        energy_level: 'High',
        environment: 'Open space',
        independency_level: '1',
        size: '4',
      })

    expect(response.status).toBe(201)
  })
})
