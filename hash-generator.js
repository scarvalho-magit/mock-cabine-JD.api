const crypto = require("crypto");

function hashGenerator(key) {
  const [dataAtual] = new Date().toISOString().split("T");
  
  return crypto
    .createHash("sha256")
    .update(`${key}-${dataAtual}`)
    .digest("hex");
}

module.exports = { hashGenerator };
