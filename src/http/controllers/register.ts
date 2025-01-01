import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    owner_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string().min(11),
    password: z.string().min(6),
    cep: z.string().min(8),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const {
    name,
    owner_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  } = registerOrgBodySchema.parse(request.body)

  const passwordHash = await hash(password, 6)

  const orgWithSameEmail = await prisma.org.findUnique({
    where: { email },
  })

  if (orgWithSameEmail) {
    return reply.status(409).send({ message: 'Email already in use.' })
  }

  await prisma.org.create({
    data: {
      name,
      ownerName: owner_name,
      whatsapp,
      email,
      passwordHash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    },
  })

  reply.status(201).send()
}
