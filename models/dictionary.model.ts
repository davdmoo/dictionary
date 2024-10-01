import License from "./license.model.ts";
import Meaning from "./meaning.model.ts";
import Phonetic from "./phonetic.model.ts";

export default interface Dictionary {
  word: string;
  phonetic: string;
  phonetics: Array<Phonetic>;
  meanings: Array<Meaning>;
  license: License;
  sourceUrls: Array<string>;
}
