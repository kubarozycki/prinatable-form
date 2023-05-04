const fs = require("fs/promises");
const path = require("path");
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");

describe("document-builder tests", () => {
  it("generate document based on payload", async () => {
    const templateFilePath = path.join(
      __dirname,
      "../templates",
      "some-document-template.hbs"
    );
    const templateFileContent = await fs.readFile(templateFilePath, "utf8");

    const template = Handlebars.compile(templateFileContent);
    expect(template).toBeTruthy();

    const htmlDoc = template({ name: "Adam", surname: "Małysz", age: 18 });
    console.log(htmlDoc);
    expect(htmlDoc).toBeTruthy();

    const browser = await puppeteer.launch({
      args: ["--disable-dev-shm-usage", "'--shm-size=3gb'"],
    });
    const page = await browser.newPage();

    await page.setContent(htmlDoc);

    await page.pdf({
      path: path.join(__dirname, "../dist", "generated-doc.pdf"),
      margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
      printBackground: true,
      format: "A4",
    });

    await page.close();
    await browser.close();
  });
});
