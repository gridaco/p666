import puppeteer, { Page, Browser, WaitForOptions } from "puppeteer";
/**
 * Loads a page into Puppeteer either from a URL or an HTML document.
 *
 * @param {Object} input - The input object containing the `url` or `html`.
 * @param {string} [input.url] - The URL to load in the Puppeteer browser.
 * @param {string} [input.html] - The HTML document to load in the Puppeteer browser.
 * @param {Object} [options] - Puppeteer launch options.
 * @returns {Promise<Page>} - The Puppeteer Page instance with the content loaded.
 * @throws Will throw an error if neither `url` nor `html` is provided.
 */
export async function page(
  browser: Browser,
  input: { url?: string; html?: string },
  options?: WaitForOptions
): Promise<Page> {
  const { url, html } = input;

  if (!url && !html) {
    throw new Error('Either "url" or "html" must be provided');
  }

  const page = await browser.newPage();

  try {
    if (url) {
      // Load the page from a URL
      await page.goto(url, options);
    } else if (html) {
      // Load the page from an HTML document
      await page.setContent(html, options);
    }
    return page;
  } catch (error) {
    await browser.close();
    throw new Error(`Failed to load the page: ${(error as any).message}`);
  }
}
