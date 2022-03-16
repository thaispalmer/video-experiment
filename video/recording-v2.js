const timecut = require('timecut-core');
const puppeteer = require('puppeteer');
timecut({
  launcher: launchOptions => puppeteer.launch(launchOptions),
  url: 'http://localhost:8000',
  viewport: {
    width: 1920,               // sets the viewport (window size) to 800x600
    height: 1080
  },
  // selector: '.video-main',     // crops each frame to the bounding box of '#container'
  // left: 20, top: 40,          // further crops the left by 20px, and the top by 40px
  // right: 6, bottom: 30,       // and the right by 6px, and the bottom by 30px
  fps: 60,                    // saves 30 frames for each virtual second
  duration: 30,               // for 20 virtual seconds 
  output: 'video.mp4'         // to video.mp4 of the current working directory
}).then(function () {
  console.log('Done!');
});