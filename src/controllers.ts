import { Request, Response } from "express";
import puppeteer from "puppeteer";
import { page } from "./lib";

export async function generatePDF(req: Request, res: Response) {
  const { url, html, options = {} } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch();
    const p = await page(browser, { url, html }, { waitUntil: "networkidle0" });

    const pdf = await p.pdf({
      format: "A4",
      printBackground: true,
      ...options,
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}

export async function generateScreenshot(req: Request, res: Response) {
  const { url, html, options = {} } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch();
    const p = await page(browser, { url, html }, { waitUntil: "networkidle0" });

    const screenshot = await p.screenshot({
      type: "png",
      fullPage: true,
      ...options,
    });

    await browser.close();

    res.contentType("image/png");
    res.send(screenshot);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate screenshot" });
  }
}
