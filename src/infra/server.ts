import { prospectsRoutes, addressRoutes } from '../routes'
import cors from '@fastify/cors'
import Fastify from 'fastify'
import multer from 'fastify-multer'

const app = Fastify()

app.register(cors)
app.register(require('@fastify/express'))
app.register(multer.contentParser)
app.register(prospectsRoutes)
app.register(addressRoutes)

app
  .listen({ port: 3333 })
  .then((data) => console.log(`running on port ${data.substring(13, 17)}`))
