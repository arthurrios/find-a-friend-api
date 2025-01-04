import { makeFetchNearbyOrgsService } from '@/services/factories/make-fetch-nearby-orgs'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchNearbyOrgs(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchNearbyOrgsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    radius: z.coerce.number(),
  })

  const query = fetchNearbyOrgsQuerySchema.parse(request.query)

  const fetchNearbyOrgsService = makeFetchNearbyOrgsService()

  const { orgs } = await fetchNearbyOrgsService.execute({
    userLatitude: query.latitude,
    userLongitude: query.longitude,
    radius: query.radius,
  })

  reply.status(200).send({ orgs })
}
