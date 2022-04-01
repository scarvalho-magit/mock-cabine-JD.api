const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

let contagem = 0;
app.post("/", async (req, res) => {
  try {
    const nomeArquivo = contagem > 10 ? "vazio.xml" : "SEL1054R1.xml";
    // const nomeArquivo = contagem > 10 ? "vazio.xml" : "SEL1611.xml";

    const arquivo = path.join(__dirname, nomeArquivo);
    const xml = await fs.promises.readFile(arquivo);

    if (contagem > 10) contagem = 0;

    console.log("> REQ: ", contagem);
    console.log(xml.toString());

    res.type("application/xml");

    contagem++;

    res.send(xml);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.listen(4500, () => {
  console.log(`🚀😍 Server running on port ${4500}`);
});
