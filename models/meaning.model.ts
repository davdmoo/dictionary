import Definition from "./definition.model.ts";

export default interface Meaning {
  partOfSpeech: string;
  definitions: Array<Definition>;
  synonyms: Array<string>;
  antonyms: Array<string>;
}
