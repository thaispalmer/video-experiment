const fs = require('fs');
const yaml = require('yaml');
const path = require('path');
const mustache = require('mustache');
const express = require('express');

const filepath = process.argv[2];
if (!filepath || !fs.existsSync(filepath))
  throw new Error('Please enter a valid location for the script file');

// Web server with rendered page for visualization
let app = express();
app.get('/', (req, res) => {
  console.log(`Reading script file ${filepath}...`);

  const file = fs.readFileSync(filepath, 'utf-8');
  const parsed = yaml.parse(file);
  const template = fs.readFileSync(path.resolve(__dirname, '../assets/template.html'), 'utf8');
  const renderedHtml = mustache.render(template, { section: parsed.video });

  res.send(renderedHtml);
});
app.use(express.static(path.dirname(filepath)));

app.listen(8000);

console.log('Listening on http://localhost:8000/');