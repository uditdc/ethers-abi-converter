import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import { abiRouter } from "./abi.ts";

const router = new Router()
router.get("/abi", abiRouter.routes(), abiRouter.allowedMethods())
  
const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })
