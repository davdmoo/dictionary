import { Hono } from "hono";
import { html } from "hono/html";
import { Edge } from "npm:edge.js";
import { dictionaries } from "./handlers/dictionary.handler.ts";
import getAudioFromPhonetics from "./helpers/get_audio_from_phonetics.helper.ts";
import getSynonymsFromDefinitions from "./helpers/get_synonyms_from_definitions.helper.ts";
import Dictionary from "./models/dictionary.model.ts";

const app = new Hono();

export const edge = Edge.create();
edge.mount(new URL("./views", import.meta.url));

edge.global("getSynonymsFromDefinitions", getSynonymsFromDefinitions);
edge.global("getAudioFromPhonetics", getAudioFromPhonetics);

app.get("/", async (c) => {
  // const response = await fetch(
  //   " https://api.dictionaryapi.dev/api/v2/entries/en/word",
  // );
  // const jsonData = await response.json();

  // if (response.ok) {
  //   const data = jsonData as Array<any>;
  //   console.log(data);

  //   if (data.length < 1) {
  //     return c.html(html`<div>404 Not Found</div>`);
  //   }

  //   return c.html(html`<p>${data.at(0)["phonetic"]}</p>`);
  // }

  // return c.html(html`<div>404 Not Found</div>`);

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
