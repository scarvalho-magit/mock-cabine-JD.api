const { json } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { hashGenerator } = require("./hash-generator");

const app = express();

app.use(cors());
app.use(json());

let contagem = 0;
app.post("/", async (req, res) => {
  try {
    // const nomeArquivo = "STR0016.xml";
    const nomeArquivo = contagem > 9 ? "vazio.xml" : "SEL1611.xml";

    const arquivo = path.join(__dirname, nomeArquivo);
    const xml = await fs.promises.readFile(arquivo);

    if (contagem > 9) contagem = 0;

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

app.post("/graphql", async (req, res) => {
  const { body, headers } = req;
  console.log(body);
  res.status(200).json({
    body,
    headers,
  });
});

app.get("/apikey/hash/:apikey", async (req, res) => {
  const { params } = req;

  const hash = hashGenerator(params.apikey);
  console.log("hash: ", hash);
  res.status(200).json({ hash });
});

const port = 6000;

app.listen(port, () => {
  console.log(`🚀😍 Server running on port ${port}`);
});
