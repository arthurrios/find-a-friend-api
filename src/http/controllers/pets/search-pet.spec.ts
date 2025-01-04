import { app } from '@/app'
import request from 'supertest'
import { makeOrg } from 'tests/factories/make-org.factory'
import { makePet } from 'tests/factories/make-pet.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server).post('/sessions').send({
      email: org.email,
      password: org.password,
    })

    const { token } = authResponse.body

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet())
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet())
      .expect(201)

    const response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
    })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/pets/byCity')

    expect(response.status).toBe(400)
  })

  it('should be able to search pets by city and age', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server).post('/sessions').send({
      email: org.email,
      password: org.password,
    })

    const { token } = authResponse.body

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ age: '5' }))
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ age: '3' }))
      .expect(201)

    const response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      age: '3',
    })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
  it('should be able to search pets by city and size', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server).post('/sessions').send({
      email: org.email,
      password: org.password,
    })

    const { token } = authResponse.body

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ size: 'small' }))
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ size: 'medium' }))
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ size: 'large' }))
      .expect(201)

    const response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      size: 'small',
    })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
  it('should be able to search pets by city and energy level', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server).post('/sessions').send({
      email: org.email,
      password: org.password,
    })

    const { token } = authResponse.body

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ energy_level: 'low' }))
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ energy_level: 'medium' }))
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ energy_level: 'high' }))
      .expect(201)

    const response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      energy_level: 'medium',
    })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
  it('should be able to search pets by city and independency level', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server).post('/sessions').send({
      email: org.email,
      password: org.password,
    })

    const { token } = authResponse.body

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ independency_level: 'low' }))
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ independency_level: 'medium' }))
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ independency_level: 'high' }))
      .expect(201)

    const response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      independency_level: 'medium',
    })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
  it('should be able to search pets by city and environment', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server).post('/sessions').send({
      email: org.email,
      password: org.password,
    })

    const { token } = authResponse.body

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ environment: 'indoor' }))
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ environment: 'indoor' }))
      .expect(201)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ environment: 'outdoor' }))
      .expect(201)

    const response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      environment: 'indoor',
    })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })
  it('should be able to search pets by city and all filters', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server).post('/sessions').send({
      email: org.email,
      password: org.password,
    })

    const pets = [
      makePet({
        age: '1',
        size: 'small',
        energy_level: 'low',
        environment: 'indoor',
        independency_level: 'medium',
      }),
      makePet({
        age: '2',
        size: 'medium',
        energy_level: 'medium',
        environment: 'outdoor',
        independency_level: 'medium',
      }),
      makePet({
        age: '1',
        size: 'large',
        energy_level: 'high',
        environment: 'indoor',
        independency_level: 'high',
      }),
      makePet({
        age: '4',
        size: 'small',
        energy_level: 'low',
        environment: 'outdoor',
        independency_level: 'low',
      }),
      makePet({
        age: '5',
        size: 'medium',
        energy_level: 'medium',
        environment: 'indoor',
        independency_level: 'medium',
      }),
    ]

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post('/pets')
          .set('Authorization', `Bearer ${authResponse.body.token}`)
          .send(pet),
      ),
    )

    let response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      age: '1',
      size: 'small',
      energy_level: 'low',
      environment: 'indoor',
    })

    expect(response.body.pets).toHaveLength(1)

    response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      size: 'medium',
    })

    expect(response.body.pets).toHaveLength(2)

    response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      energy_level: 'low',
    })

    expect(response.body.pets).toHaveLength(2)

    response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      independency_level: 'medium',
    })
    expect(response.body.pets).toHaveLength(3)

    response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      environment: 'indoor',
    })
    expect(response.body.pets).toHaveLength(3)
    response = await request(app.server).get('/pets/byCity').query({
      city: org.city,
      age: '1',
    })
    expect(response.body.pets).toHaveLength(2)
  })
})
