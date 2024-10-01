import getAudioFromPhonetics from "../helpers/get_audio_from_phonetics.helper.ts";
import Dictionary from "../models/dictionary.model.ts";

export default function dictionaryComponent(dictionary: Dictionary) {
  const { word, phonetic, meanings, phonetics } = dictionary;

  const meaningElements = meanings.map(function (meaning) {
    return `
      <h3>${meaning.partOfSpeech}</h3>
      <h4>Meaning</h4>
      <ul>
        ${
      meaning.definitions.map(function (definition) {
        return `<li>${definition.definition}</li>`;
      }).join("")
    }
      </ul>
    `;
  }).join("");

  return `
    <div id="response">
      <h1>${word}</h1>
      <div>
        <h2>${phonetic}</h2>
        <audio controls src="${getAudioFromPhonetics(phonetics)}"></audio>
      </div>
      ${meaningElements}
    </div>
  `;
}
