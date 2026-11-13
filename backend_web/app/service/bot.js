// const qr = require('qrcode');
// const Jimp = require('jimp');
// const path = require('path');
// const dayjs = require('dayjs'); 
// const TronWeb = require('tronweb');
// const { async_get_telegram } = require('../plugin/redis');
// // 
// const generateUsdtQR = async(walletAddress) =>
// {
//     // console.log(walletAddress)
//     try {
//         const font = await Jimp.loadFont(path.join(__dirname+ '/font', 'PingFang_24_BLACK.fnt'));
//         //
//         const qrJimp = await Jimp.read(await qr.toBuffer(walletAddress, {}));
//         qrJimp.resize(512, 512);
//         // 
//         let watermark = await Jimp.read(path.join(__dirname, 'tether-usdt-logo.png'));
//         watermark = watermark.resize(100,100);
//         const x_watermark = (qrJimp.bitmap.width - watermark.bitmap.width) / 2;
//         const y_watermark = (qrJimp.bitmap.height - watermark.bitmap.height) / 2;
//         // 
//         watermark = await watermark
//         qrJimp.composite(watermark, x_watermark, y_watermark, {
//             mode: Jimp.BLEND_SOURCE_OVER,
//             opacityDest: 1
//         })
//         // 
//         const text_top = '当前中国时间: ' + dayjs().format('YYYY-MM-DD HH:mm:ss');
//         const text_width_top = Jimp.measureText(font, text_top);
//         const text_width_bot = Jimp.measureText(font, walletAddress);
//         // 
//         const text_x_top = (qrJimp.bitmap.width - text_width_top) / 2;  
//         const text_x_bot = (qrJimp.bitmap.width - text_width_bot) / 2;  
//         const textHeight = Jimp.measureTextHeight(font, walletAddress);
//         const text_y_top = qrJimp.bitmap.height - textHeight + 26;
//         // 
//         qrJimp.print(font, text_x_top, 10, text_top);
//         qrJimp.print(font, text_x_bot, text_y_top, walletAddress);
//         // console.log(qrJimp)
//         // 
//         return await qrJimp.getBase64Async(Jimp.MIME_JPEG);
//     } catch (error) {
//         // console.log(error)
//     }
    
// }
// // 
// const deriveHDWallet = async(path) =>
// {
//     if (!path) return;
//     const { mnemonic } = await async_get_telegram("environment");
//     const _path = "m/44'/195'/0'/0/" + path;
//     const node = TronWeb.fromMnemonic(mnemonic, _path);
//     return node.address;
// }
// // 
// module.exports={
//     generateUsdtQR,
//     deriveHDWallet
// }