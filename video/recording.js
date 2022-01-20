const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

const filepath = process.argv[2] || 'out.mp4';

const options = {
  followNewTab: false,
  fps: 60,
  ffmpeg_Path: null, // Setting to null will automatically install ffmpeg and use it
  videoFrame: {
    width: 1920,
    height: 1080,
  },
  aspectRatio: '16:9',
  recordDurationLimit: 30
};

(async () => {
  console.log('Launching puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--mute-audio"],
    args: ['--autoplay-policy=no-user-gesture-required'],
  });

  console.log('Creating new page');
  const page = await browser.newPage();

  console.log('Changing viewport size');
  await page.setViewport({
    width: options.videoFrame.width,
    height: options.videoFrame.height
  });

  console.log('Setting up screen recorder');
  const recorder = new PuppeteerScreenRecorder(page, options);

  console.log('Expose stop function to page');
  await page.exposeFunction('stopRecording', async () => {
    console.log(`Recording ended. Saving video file at ${filepath}...`);
    await recorder.stop();
    console.log('Finishing puppeteer...')
    await browser.close();
  });

  // Page load actions
  page.once('load', async () => {
    console.log('Page loaded!');

    await page.evaluate(() => {
      window.jQuery(document).on('video.ended', window.stopRecording);
      window.jQuery('.click-to-start').remove();
    });
    console.log('Added event listeners for video start/end');

    await recorder.start(filepath);
    console.log('Start recording');

    await page.evaluate(() => {
      window.jQuery(document).trigger('video.play');
    });
    console.log('Playback started on remote');
  });

  // Opening URL from generation.js
  console.log('Opening http://localhost:8000');
  await page.goto('http://localhost:8000');
})();
