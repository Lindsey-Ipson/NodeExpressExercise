const fs = require('fs');
const axios = require('axios');
const { URL } = require('url');

const filename = process.argv[2];

if (!filename) {
  console.error('No filename given');
  process.exit(1);
}

fs.readFile(filename, 'utf8', async (err, data) => {
  if (err) {
    console.error(`Error reading ${filename}: ${err.message}`);
    process.exit(1);
  }

  const urls = data.trim().split('\n');

  for (const url of urls) {
    try {
      const resp = await axios.get(url);
      const hostname = new URL(url).hostname;
      const outputFile = `${hostname}`;
      
      fs.writeFile(outputFile, resp.data, (err) => {
        if (err) {
          console.error(`Error writing to ${outputFile}: ${err.message}`);
        } else {
          console.log(`Wrote to ${hostname}`);
        }
      });
    } catch (err) {
      console.error(`Couldn't download ${url}: ${err.message}`);
    }
  }
});
