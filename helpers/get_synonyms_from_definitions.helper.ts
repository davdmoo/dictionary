import Definition from "../models/definition.model.ts";

export default function getSynonymsFromDefinitions(
  definitions: Array<Definition>,
) {
  let result = "";
  definitions.forEach((definition) => {
    const synonyms = definition.synonyms.map((el) => el).join(", ");
    result += synonyms;
  });

  return result;
}
