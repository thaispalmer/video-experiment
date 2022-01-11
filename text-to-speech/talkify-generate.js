require('dotenv').config({ path: '../.env' });
const { createWriteStream } = require('fs');
const axios = require('axios');

const text = process.argv[2];
const outputFilePath = process.argv[3] || 'output.mp3';

if (!text)
  throw new Error('Please enter a valid text entry for audio generation');

if (!process.env.TALKIFY_KEY)
  throw new Error('Please configure the TALKIFY_KEY on your environment file');

console.log(`Generating audio at ${outputFilePath}...`);

/**
 * Since talkify-tts is a frontend package with player, we'll be using
 * Axios to get the output audio file directly through Talkify API.
 */
axios({
  method: 'post',
  url: 'https://talkify.net/api/speech/v1',
  responseType: 'stream',
  headers: {
    'x-api-key': process.env.TALKIFY_KEY
  },
  data: {
    Text: text,
    Format: 'mp3',
    Voice: 'David',
    Rate: 0,
    TextType: 1, // SSML
    Whisper: false,
    Soft: true,
    Volume: 2,
    WordBreakMs: 0,
    Pitch: 0,
  }
}).then(response => {
  response.data.pipe(createWriteStream(outputFilePath));
}).catch(err => {
  throw new Error(`Could not process the audio. Error code ${err.response.status}: ${err.response.statusText}`);
});
