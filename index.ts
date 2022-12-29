import * as ethers from 'https://esm.sh/ethers@5.7.2'
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"

const humanReadableToJson = (data: string[]) => {
  const abi = new ethers.utils.Interface(data)

  return abi.format(ethers.utils.FormatTypes.json)
}

const jsonToHumanReadable = (data: ethers.utils.Fragment[]) => {
  const abi = new ethers.utils.Interface(data)

  return abi.format(ethers.utils.FormatTypes.full)
}

// ----

const router = new Router()
router
  .get("/", (context) => {
    context.response.body = "Ethers ABI Converter."
  })
  .post("/to-json", async (context) => {
    const body = await context.request.body().value

    context.response.body = {
      abi: humanReadableToJson(body.abi)
    }
  })
  .post("/from-json", async (context) => {
    const body = await context.request.body().value

    context.response.body = {
      abi: jsonToHumanReadable(body.abi)
    }
  })
  
const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })
