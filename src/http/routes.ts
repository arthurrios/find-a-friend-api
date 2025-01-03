import type { FastifyInstance } from 'fastify'
import { registerOrg } from './controllers/orgs/register-org'
import { authenticateOrg } from './controllers/orgs/authenticate-org'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
  app.post('/sessions', authenticateOrg)
}
