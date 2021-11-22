import {resolve} from 'path';
import {promises} from 'fs';
import puppeteer, {Page} from 'puppeteer';

import {AwesomeApp} from '../src/types';

/**
 * Path resolve helper.
 */
const root = (...paths: string[]) => resolve(__dirname, '..', ...paths);

/**
 * Base URL.
 */
const {HOST} = process.env;

/**
 * Output data file name.
 */
const outputJsonFile = root('src', 'awesome-apps.json');

/**
 * Root directory to scan.
 */
const scanDir = root('src');

/**
 * Test directory name.
 * @example
 * testDirName('001-test-app'); // true
 */
const testDirName = (dirName: string) => /^[0-9]+-/.test(dirName);

/**
 * Get title from directory name.
 * @example
 * parseTitle('001-test-app'); // 'Test App'
 */
const parseTitle = (name: string) =>
  name.replace(/^([0-9]+)([-a-z]+)/g, '$2').replace(/-([a-z]{1})/g, (match, s1, offset) => {
    return (offset ? ' ' : '') + (s1 as string).toUpperCase();
  });

/**
 * Write data to json file.
 */
const writeJson = async (data: unknown, fileName: string) => {
  await promises.writeFile(fileName, JSON.stringify(data));
};

/**
 * Resolve app location.
 */
const getAppUrl = (path: string) => `${HOST}/${path}`;

/**
 * Navigate to app location, take and save screenhot.
 */
const takeScreenshot = async (page: Page, url: string, fileName: string) => {
  try {
    await page.goto(url);
    await page.screenshot({path: fileName});
    return true;
  } catch (err) {
    return false;
  }
};

(async () => {
  const data: AwesomeApp[] = [];

  // Read directory entries.
  const dirents = await promises.readdir(scanDir, {withFileTypes: true});

  for (const entry of dirents) {
    if (entry.isDirectory() && testDirName(entry.name)) {
      const dirName = entry.name;
      const title = parseTitle(dirName);

      data.push({
        componentName: title.replace(/\s+/g, ''),
        dirName,
        imgSrc: '',
        location: dirName,
        title,
      });
    }
  }

  if (data.length) {
    // Write data to file.
    await writeJson(data, outputJsonFile);

    // Init Puppeteer.
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Take screenshots.
    for await (const [i, d] of data.entries()) {
      const {dirName} = d;
      const imgSrc = `assets/awesome-apps/${dirName}.png`;
      const url = getAppUrl(dirName);

      if (await takeScreenshot(page, url, root('public', imgSrc))) {
        console.log(`Processing '${dirName}'...OK`);
        data[i].imgSrc = imgSrc;
      } else {
        console.log(`Processing '${dirName}'...FAILD (please check: ${url})`);
      }
    }

    await browser.close();
    // Write data to file.
    await writeJson(data, outputJsonFile);
  }
})();
