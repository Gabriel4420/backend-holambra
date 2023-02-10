import { z } from 'zod'
import { prisma } from '../infra/conn'
import { FastifyReply, FastifyRequest } from 'fastify'
import path from 'node:path'

export class ProspectController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createProspectBody = z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
    })

    const { name, email, phone } = createProspectBody.parse(request.body)

    const { file }: any = request

    try {
      const prospect = await prisma.prospect.create({
        data: {
          name,
          email,
          phone,
          document: `${path.dirname(__dirname)}\\uploads\\${Date.now()} - ${
            file.originalname
          }`,
        },
      })

      reply.code(201)

      return { prospect }
    } catch (error) {
      console.error(error)
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const prospectsId = z.object({ id: z.string().uuid() })

    const { id } = prospectsId.parse(request.params)

    console.log(request)

    const createProspectBody = z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
    })

    const { name, email, phone } = createProspectBody.parse(request.body)

    const { file }: any = request

    try {
      const prospects = await prisma.prospect.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          phone,
          document: `${path.dirname(__dirname)}\\uploads\\${Date.now()} - ${
            file.originalname
          }`,
        },
      })

      reply.code(200)

      return { prospects }
    } catch (error) {
      console.error(error)
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const prospectsId = z.object({ id: z.string().uuid() })

    const { id } = prospectsId.parse(request.params)

    const prospects = await prisma.prospect.delete({
      where: {
        id,
      },
    })

    reply.code(204)

    return { prospects }
  }

  async findManyProspects() {
    const prospects = await prisma.prospect.findMany()

    return { prospects }
  }

  async findOneProspect(request: FastifyRequest, reply: FastifyReply) {
    const prospectsId = z.object({ id: z.string().uuid() })

    const { id } = prospectsId.parse(request.params)

    let prospect = await prisma.prospect.findUnique({
      where: {
        id,
      },
    })
    reply.code(200)
    return { prospect }
  }
}
