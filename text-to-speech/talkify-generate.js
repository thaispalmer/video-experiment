require('dotenv').config({ path: '../.env' });
const { createWriteStream } = require('fs');
const { Talkify } = require('talkify-tts-api');

const text = process.argv[2];
const outputFilePath = process.argv[3] || 'output.mp3';

if (!text)
  throw new Error('Please enter a valid text entry for audio generation');

if (!process.env.TALKIFY_KEY)
  throw new Error('Please configure the TALKIFY_KEY on your environment file');

const talkify = new Talkify({
  key: process.env.TALKIFY_KEY
});

console.log(`Generating audio at ${outputFilePath}...`);

talkify.speech(text, {
  voice: 'David',
  soft: true,
  volume: 2,
  wordBreak: 0
}).then(result => {
  result.pipe(createWriteStream(outputFilePath));
}).catch(err => {
  throw new Error(`Could not process the audio. Error code ${err.statusCode}: ${err.message}`);
});
