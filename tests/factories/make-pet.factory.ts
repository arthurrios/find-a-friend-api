import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  org_id?: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
  independency_level?: string
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    org_id: overwrite?.org_id ?? crypto.randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int().toString(),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large']),
    energy_level:
      overwrite?.energy_level ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    independency_level:
      overwrite?.independency_level ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment:
      overwrite?.environment ??
      faker.helpers.arrayElement(['indoor', 'outdoor']),
  }
}
