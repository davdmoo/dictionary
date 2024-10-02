import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { html } from "hono/html";
import { Edge } from "npm:edge.js";
import { dictionaries } from "./handlers/dictionary.handler.ts";
import getAudioFromPhonetics from "./helpers/get_audio_from_phonetics.helper.ts";
import getSynonymsFromDefinitions from "./helpers/get_synonyms_from_definitions.helper.ts";
import Dictionary from "./models/dictionary.model.ts";

const app = new Hono();
app.use("/favicon.ico", serveStatic({ path: "/static/icon.png" }));

export const edge = Edge.create();
edge.mount(new URL("./views", import.meta.url));

edge.global("getSynonymsFromDefinitions", getSynonymsFromDefinitions);
edge.global("getAudioFromPhonetics", getAudioFromPhonetics);

app.get("/", async (c) => {
  const response = await Deno.readTextFile("dictionary.json");
  const jsonResponse = JSON.parse(response) as Array<Dictionary>;

  const data = jsonResponse.at(0);
  if (data === undefined) {
    return c.html(html`<p>404 Not Found</p>`);
  }

  const indexPage = await edge.render("index", { ...data });
  return c.html(indexPage);
});

app.route("/dictionaries", dictionaries);

Deno.serve(app.fetch);
