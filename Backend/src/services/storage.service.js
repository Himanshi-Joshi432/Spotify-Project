const ImageKit = require('@imagekit/nodejs');

const imageKit = new ImageKit({
    privateKey: "private_cVoz0MlK5BNf2bv3Zt82chENcps="
});

async function uploadImage(buffer) {
    const result = await imageKit.files.upload({
        file: buffer.toString('base64'),
        fileName: "music"+Date.now()
    });
    return result;
}   

module.exports = uploadImage