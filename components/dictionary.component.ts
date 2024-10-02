import getAudioFromPhonetics from "../helpers/get_audio_from_phonetics.helper.ts";
import Dictionary from "../models/dictionary.model.ts";

export default function dictionaryComponent(dictionary: Dictionary) {
  const { word, phonetic, meanings, phonetics } = dictionary;

  const meaningElements = meanings.map(function (meaning) {
    const synonyms = meaning.synonyms.length > 1
      ? `
          <div>
            <p>Synonyms</p>
            <p>${meaning.synonyms.map((el) => el).join(", ")}</p> 
          </div>`
      : "";

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
      ${synonyms}
    `;
  }).join("");

  const audioSrc = getAudioFromPhonetics(phonetics);
  const audioElement = audioSrc === undefined
    ? ""
    : `<audio src="${getAudioFromPhonetics(phonetics)}"></audio>`;

  return `
    <h1>${word}</h1>
    <div>
      <h2>${phonetic}</h2>
      ${audioElement}
      <button disabled id="audio-player">Play audio</button>
    </div>
    ${meaningElements}
  `;
}
