import { Hono } from "hono";
import { html } from "hono/html";
import "jsr:@std/dotenv/load";
import dictionaryComponent from "../components/dictionary.component.ts";

export const dictionaries = new Hono();

dictionaries.get("/", async (c) => {
  try {
    const word = c.req.query("word");
    const baseUrl = Deno.env.get("BASE_URL");

    const response = await fetch(`${baseUrl}/v2/entries/en/${word}`);
    const jsonResponse = await response.json();

    const data = jsonResponse.at(0);
    if (data === undefined) {
      return c.html(html`<p>404 Not Found</p>`);
    }

    const component = dictionaryComponent(data);
    return c.html(component);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
  }
});
