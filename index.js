const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/rocketseat_oficial/');

  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('article img');
    const imgArray = [...nodeList];
    const imgList = imgArray.map(({ src }) => ({
      src
    }));

    return imgList;
  });

  //Escrever os dados em um arquivo local
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if (err) throw new Error('Alguma deu errada!');
    console.log('Success!');
  });

  await browser.close();
})();