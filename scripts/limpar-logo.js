// Remove o fundo claro do logo (deixa transparente) e apaga a marca d'água
// do Gemini no canto inferior-direito. Gera public/logo.png limpo.
// Uso: node scripts/limpar-logo.js
const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "logo-original.png");
const OUT = path.join(__dirname, "..", "public", "logo.png");

(async () => {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Limites de luminância para separar fundo (claro) do logo (escuro)
  const HARD_BG = 224; // acima disso = fundo puro -> transparente
  const HARD_FG = 185; // abaixo disso = logo -> opaco
  // Região do canto inferior-direito a apagar (marca d'água). O conteúdo do
  // logo termina em ~70% x / ~71% y, então apagar a partir de 80%/78% é seguro.
  const eraseX = Math.floor(width * 0.8);
  const eraseY = Math.floor(height * 0.78);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;

      let alpha;
      if (lum >= HARD_BG) alpha = 0;
      else if (lum <= HARD_FG) alpha = data[i + 3];
      else {
        // rampa suave para bordas (anti-serrilhado)
        const t = (HARD_BG - lum) / (HARD_BG - HARD_FG);
        alpha = Math.round(data[i + 3] * t);
      }

      // apaga o canto da marca d'água
      if (x >= eraseX && y >= eraseY) alpha = 0;

      data[i + 3] = alpha;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .trim({ threshold: 10 }) // remove a moldura transparente ao redor
    .toFile(OUT);

  console.log("Logo limpo salvo em public/logo.png");
})();
