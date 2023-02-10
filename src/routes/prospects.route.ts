import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { upload } from 'helpers/generateFile'
import { ProspectController } from 'controllers/prospects'

export const prospectsRoutes = async (app: FastifyInstance) => {
 
  const prospect = new ProspectController()

  app.post(
    '/prospect/register',
    { preHandler: upload.single('file') },
    async (request: FastifyRequest, reply: FastifyReply) =>
      await prospect.create(request, reply),
  )

  app.patch(
    '/prospects/update/:id',
    { preHandler: upload.single('file') },
    async (request: FastifyRequest, reply: FastifyReply) =>
      await prospect.update(request, reply),
  )

  app.delete(
    '/prospects/delete/:id',
    async (request: FastifyRequest, reply: FastifyReply) =>
      await prospect.delete(request, reply),
  )

  app.get('/prospects', async () => await prospect.findManyProspects())

  app.get(
    '/prospects/:id',
    async (request: FastifyRequest, reply: FastifyReply) =>
      await prospect.findOneProspect(request, reply),
  )
}
