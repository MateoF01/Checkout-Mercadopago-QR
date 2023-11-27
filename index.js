import mercadopago from 'mercadopago';
import qrcode from 'qrcode';
import fs from 'fs/promises';

mercadopago.configure({
  access_token: 'TEST-5000516772094794-112711-cf6621f69d3fdc98ee662fcf2fe3a596-316815407'
});

async function generarLinkPago() {
  try {
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: 'Airpods',
          unit_price: 500,
          quantity: 1,
        }
      ]
    });

    console.log(result.body.init_point);
    return result.body.init_point;
  } catch (error) {
    console.error('Error al generar el link de pago:', error);
  }
}

async function generarQRDesdeURL(url, nombreArchivo) {
  try {
    const codigoQR = await qrcode.toDataURL(url);

    const rutaArchivo = `${nombreArchivo}.png`;
    await fs.writeFile(rutaArchivo, codigoQR.split(';base64,').pop(), { encoding: 'base64' });

    console.log(`Código QR generado y guardado en: ${rutaArchivo}`);
  } catch (error) {
    console.error('Error al generar el código QR:', error);
  }
}

async function main() {
  const link = await generarLinkPago();
  await generarQRDesdeURL(link, 'qr');
}

main();
