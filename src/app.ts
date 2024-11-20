import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { ZodError } from 'zod'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@example.com',
  },
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
