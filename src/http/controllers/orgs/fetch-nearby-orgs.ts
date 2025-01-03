import { makeFetchNearbyOrgsService } from '@/services/factories/make-fetch-nearby-orgs'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchNearbyOrgs(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchNearbyOrgsBodySchema = z.object({
    userLatitude: z.number(),
    userLongitude: z.number(),
    radius: z.number().optional(),
  })

  const { userLatitude, userLongitude, radius } =
    fetchNearbyOrgsBodySchema.parse(request.body)

  const fetchNearbyOrgsService = makeFetchNearbyOrgsService()

  const { orgs } = await fetchNearbyOrgsService.execute({
    userLatitude,
    userLongitude,
    radius,
  })

  reply.status(200).send({ orgs })
}
