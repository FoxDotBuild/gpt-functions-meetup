import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Missing ENV Var: OPENAI_API_KEY");
}

const configuration = new Configuration({ apiKey });
export const openai = new OpenAIApi(configuration);
