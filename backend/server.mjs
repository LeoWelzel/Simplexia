import express, { text } from 'express';
import path from 'path';

import fs from 'fs';
import { execSync, exec } from 'child_process';

const server = express();

server.use(express.json());
server.use(express.urlencoded());

server.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    response.setHeader('Access-Control-Allow-Methods',
      'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  next();
});

server.post('/', (req, res, next) => {
  let textForSummary = req.body.text;

  /* If it's undefined or null. */
  if (textForSummary == null)
    textForSummary = '';

  const __dirname = path.resolve();

  /* Write text to file. */
  const tempFolder = path.join(__dirname, 'tmp');
  const inputFileName = path.join(tempFolder, 'input.txt');
  const outputFileName = path.join(tempFolder, 'output.json');
  const pythonScriptName = path.join(__dirname, 'main.py');

  fs.writeFileSync(inputFileName, textForSummary,
    (err) => {
      if (err) {
        return console.log(err);
      }
    });
  
  execSync(`python "${pythonScriptName}"`)

  const result = JSON.parse(fs.readFileSync(outputFileName, 'utf8'));

  res.status(200).json(
    result
  );
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
