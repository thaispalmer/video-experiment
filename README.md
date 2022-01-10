# Video Experiment - Proof of Concept

## How it should work:

1. The user writes a script for the video using proper syntaxes
2. Run the application with the given script
3. The application will render a video following the script
4. Then it will automatically upload the video to YouTube

## Describing each step

### Script writing

Maybe the script should be in a format similar to markdown or yaml?

Then it can specify the video sections and their titles, along with any text-to-speech and the images that should go with the voice-over.

The script should also contain information about the video metadata that will be used on YouTube.

### Video rendering

#### Generating the Text-to-speech

Before creating the video, I believe we should prepare first the TTS that will be used, so the video duration and transitions can match accordingly to their time.

The TTS process should fetch all voice-over available from the script and use a service such as:
- [Talkify](https://www.npmjs.com/package/talkify-tts)
- [Google Cloud Text-to-speech](https://github.com/googleapis/nodejs-text-to-speech)

With the audio files in hand, we can proceed to the next step

#### Building the animation

To take advantage of the easiness of CSS transitions and styling, I recommend rendering the video contents using a HTML+CSS+JS combo, which will read the script and enqueue the titles, voice-overs, pictures/slides and so on. While also considering pauses, transition times and the media duration as well.

The animation could also be previewed when acessing the page through a web browser

#### Rendering the video

The page with the animation ready can be recorded through [Puppeteer](https://www.npmjs.com/package/puppeteer-screen-recorder) using Chromium, directly to a MP4 or WEBM file with the proper duration, frame-rate and resolution/aspect ratio.

We just need to make sure it records the audio as well, if it doesn't, we need to render it elsewhere (not documented yet) and then sync together into another video file to be uploaded.

### Uploading the video

Using the metadata from the script and the final video file, the video will be uploaded to YouTube by using the [Video Insert API](https://developers.google.com/youtube/v3/docs/videos/insert?hl=pt-br) from the [Google APIs](https://github.com/googleapis/google-api-nodejs-client)