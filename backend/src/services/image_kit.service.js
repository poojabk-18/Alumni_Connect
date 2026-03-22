const ImageKit = require('@imagekit/nodejs')

const client = new ImageKit({
  privateKey: process.env.ImageKit_PRIVATE_KEY,
});

async function ImageUrl(buffer) {
  const url = await client.files.upload({
  file: buffer.toString('base64'),
  fileName: 'image.png',
});

return url
}

module.exports = ImageUrl