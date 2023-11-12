const sharp = require("sharp");
const fs = require("fs");
const directory = "./images/who";
const gm = require("gm");

redimImage();
//920
//1080
//1280
//1920

function redimImage() {
  //   for (size in [[450,"small"], [920,"big"], [1280,"veryb"], [1920,"rr"]]) {
  for (const size of [450 / 2, 920 /2, 1280/2, 1920/2]){
    fs.readdirSync(directory).forEach(async (file) => {
      const image = sharp(`${directory}/${file}`);
      const metadata = await image.metadata();
      console.log(metadata);

      image
        .resize(
          Math.floor(size),
          Math.floor((size * metadata.height) / metadata.width)
        ) // width, height
        .toFile(`${directory}/${file.substring(0,file.indexOf('.'))}-${size}.avif`);
      // sharp(`${directory}/${file}`);
    });
}
}
// }
