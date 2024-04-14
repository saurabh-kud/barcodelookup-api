const puppeteer = require("puppeteer");

const getBarCode = async (barCodeId) => {
  let browser;
  try {
    // Launch the browser and open a new blank page
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null, // otherwise it defaults to 800x600
      args: ["--no-sandbox", "--start-fullscreen"],
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://www.barcodelookup.com/" + barCodeId, {
      waitUntil: "load",
    });

    // Get the image URL
    const imageUrl = await page.evaluate(() => {
      const imageElement = document.querySelector("#largeProductImage img");
      return imageElement.getAttribute("src");
    });
    // console.log("Image URL:", imageUrl);

    // Get the title

    const title = await page.evaluate(() => {
      const titleElement = document.querySelector(
        ".container .row .product-details h4"
      );
      return titleElement.textContent.trim();
    });

    const categoty = await page.evaluate(() => {
      const titleElements = document.querySelectorAll(
        ".container .row .product-details div.product-text-label"
      );
      const lastTitleElement = titleElements[1];
      // Selecting the second element
      const categotyfinal = lastTitleElement.textContent.substring(10);
      return categotyfinal;
    });

    await browser.close();
    console.log(title, imageUrl, categoty);
    return { title, imageUrl, categoty };
  } catch (error) {
    await browser.close();
    return { error };
  } finally {
    // Close the browser
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = getBarCode;
