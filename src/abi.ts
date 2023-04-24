import * as ethers from "https://esm.sh/ethers@5.7.2";
import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const humanReadableToJson = (data: string[]) => {
  const abi = new ethers.utils.Interface(data);

  return abi.format(ethers.utils.FormatTypes.json);
};

const jsonToHumanReadable = (data: ethers.utils.Fragment[]) => {
  const abi = new ethers.utils.Interface(data);

  return abi.format(ethers.utils.FormatTypes.full);
};

export const abiRouter = new Router();
abiRouter
  .get("/", (context) => {
    context.response.body = "ABI";
  })
  .post("/format-to-json", async (context) => {
    const body = await context.request.body().value;

    context.response.body = {
      abi: humanReadableToJson(body.abi),
    };
  })
  .post("/format-from-json", async (context) => {
    const body = await context.request.body().value;

    context.response.body = {
      abi: jsonToHumanReadable(body.abi),
    };
  })
  .post("/encode-function-data", async (context) => {
    try {
      const body = await context.request.body().value
      const { abi, method, args } = body 
  
      const contract = new ethers.utils.Interface(abi)
      const data = contract.encodeFunctionData(method, args)
  
      context.response.body = {
        data
      }
    } catch (error) {
      context.response.status = 400
      context.response.body = {
        message: 'Error: ' + 'Failed to encode function data (' + error.message + ')'
      }
    }
  });
