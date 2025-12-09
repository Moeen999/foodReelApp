const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

// console.log("1>>>", process.env.IMAGE_KIT_URL_ENDPOINT);
// console.log("2>>>", process.env.IMAGE_KIT_PUBLIC_KEY);
// console.log("3>>>", process.env.IMAGE_KIT_PRIVATE_KEY);

async function uploadFile(file, fileName) {
  const result = await imageKit.upload({
    file,
    fileName
  });

  return result;
}

module.exports = { uploadFile };
