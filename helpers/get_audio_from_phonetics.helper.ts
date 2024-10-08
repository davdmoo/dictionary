import Phonetic from "../models/phonetic.model.ts";

export default function getAudioFromPhonetics(
  phonetics: Array<Phonetic>,
): string | undefined {
  let sourceUrl: string | undefined;
  phonetics.forEach((phonetic) => {
    if (phonetic.audio.length > 1) {
      sourceUrl = phonetic.audio;
    }
  });

  return sourceUrl;
}
