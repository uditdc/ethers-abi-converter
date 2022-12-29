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
  .post("/encode", (context) => {
    context.response.body = "Encode ...";
  })
  .post("/decode", (context) => {
    context.response.body = "Decode ...";
  });
