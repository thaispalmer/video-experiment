const fs = require('fs');
const yaml = require('yaml');

const filepath = process.argv[2];
if (!filepath || !fs.existsSync(filepath))
  throw new Error('Please enter a valid location for the script file');

console.log(`Reading script file ${filepath}...`);

console.log(`${'-'.repeat(20)}\n`);

const file = fs.readFileSync(filepath, 'utf-8');
const parsed = yaml.parse(file);

/**
 * Metadata display
 */
if (parsed.metadata) {
  if (parsed.metadata.title) {
    console.log(`Video title:\n\n\t${parsed.metadata.title}\n`);
  }
  if (parsed.metadata.description) {
    console.log(`Description:\n\n\t${parsed.metadata.description}`);
  }
} else {
  console.log('The video has no metadata.\n');
}
console.log(`${'-'.repeat(20)}\n`);

/**
 * Video content display
 */
parsed.video.forEach(section => {
  switch (Object.keys(section)[0]) {
    /**
     * Title section
     */
    case 'title': {
      if (section.title.text && section.title.voiceover) {
        console.log(`A title screen with "${section.title.text}" written, with the following voice-over: "${section.title.voiceover}".\n`);
      } else if (section.title.text && !section.title.voiceover) {
        console.log(`A title screen with "${section.title.text}" written.\n`);
      } else if (!section.title.text && section.title.voiceover) {
        console.log(`A title screen with the following voice-over: "${section.title.voiceover}".\n`);
      }
      break;
    }

    /**
     * Content section
     */
    case 'content': {
      if (Array.isArray(section.content.image)) {
        console.log(`An slideshow with the following images will ocurr: ${section.content.image.join(', ')}${section.content.voiceover ? `, with the following voice-over: "${section.content.voiceover}"` : '.'}\n`);
      } else {
        console.log(`The image ${section.content.image} will appear on the screen${section.content.voiceover ? `, with the following voice-over: "${section.content.voiceover}"` : '.'}\n`);
      }
      break;
    }
    default:
  }
});