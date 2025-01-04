import { makeSearchPetsService } from '@/services/factories/make-search-pets-service'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string().min(1),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    independency_level: z.string().optional(),
    environment: z.string().optional(),
  })

  const query = searchPetsQuerySchema.parse(request.query)

  const searchPetsService = makeSearchPetsService()

  try {
    const { pets } = await searchPetsService.execute({
      city: query.city,
      age: query.age,
      size: query.size,
      energy_level: query.energy_level,
      independency_level: query.independency_level,
      environment: query.environment,
    })

    reply.status(200).send({ pets })
  } catch (error) {
    console.log(error)
  }
}
