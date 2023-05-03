const fs = require("fs/promises");
const path = require("path");
const Handlebars = require("handlebars");

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

    const htmlDoc = template({ name: "Adam Małysz" });
    console.log(htmlDoc);
    expect(htmlDoc).toBeTruthy();
  });
});
