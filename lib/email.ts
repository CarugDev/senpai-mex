import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmation({
  customerEmail,
  customerName,
  orderId,
  items,
  total,
  shipping,
  shippingAddress,
}: {
  customerEmail: string
  customerName: string
  orderId: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  shipping: number
  shippingAddress: string
}) {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #EDE8E1; font-family: Georgia, serif; font-size: 14px; color: #1A1A1A;">
        ${item.name}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #EDE8E1; font-family: Georgia, serif; font-size: 14px; color: #1A1A1A; text-align: center;">
        x${item.quantity}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #EDE8E1; font-family: Georgia, serif; font-size: 14px; color: #1A1A1A; text-align: right;">
        $${(item.price * item.quantity).toFixed(2)} MXN
      </td>
    </tr>
  `).join('')

  await resend.emails.send({
    from: 'Senpai Mex <onboarding@resend.dev>',
    to: customerEmail,
    subject: 'ありがとう — Tu pedido fue confirmado',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 0; background-color: #F7F3EE; font-family: system-ui, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-family: Georgia, serif; font-size: 48px; color: #1A1A1A; margin: 0;">先輩</h1>
            <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #8C8880; margin: 8px 0 0;">SENPAI MEX</p>
          </div>

          <div style="background: #ffffff; padding: 40px; margin-bottom: 24px;">
            <h2 style="font-family: Georgia, serif; font-size: 32px; color: #1A1A1A; margin: 0 0 8px;">ありがとう</h2>
            <p style="font-size: 13px; color: #8C8880; margin: 0 0 24px;">Gracias por tu compra</p>

            <p style="font-size: 14px; color: #1A1A1A; margin: 0 0 24px;">
              Hola <strong>${customerName}</strong>, tu pedido fue confirmado y está siendo procesado.
            </p>

            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="text-align: left; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8C8880; padding-bottom: 12px; border-bottom: 2px solid #1A1A1A;">Producto</th>
                  <th style="text-align: center; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8C8880; padding-bottom: 12px; border-bottom: 2px solid #1A1A1A;">Cant.</th>
                  <th style="text-align: right; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8C8880; padding-bottom: 12px; border-bottom: 2px solid #1A1A1A;">Precio</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #EDE8E1;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 13px; color: #8C8880;">Envío</span>
                <span style="font-size: 13px; color: #1A1A1A;">${shipping === 0 ? 'Gratis' : '$150.00 MXN'}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="font-size: 14px; font-weight: bold; color: #1A1A1A;">Total</span>
                <span style="font-size: 14px; font-weight: bold; color: #1A1A1A;">$${total.toFixed(2)} MXN</span>
              </div>
            </div>
          </div>

          <div style="background: #ffffff; padding: 40px; margin-bottom: 24px;">
            <h3 style="font-family: Georgia, serif; font-size: 18px; color: #1A1A1A; margin: 0 0 16px;">Dirección de envío</h3>
            <p style="font-size: 14px; color: #1A1A1A; margin: 0; line-height: 1.6;">${shippingAddress}</p>
          </div>

          <div style="background: #C0392B; padding: 32px; text-align: center; margin-bottom: 24px;">
            <p style="font-size: 13px; color: rgba(255,255,255,0.8); margin: 0 0 8px;">Procesaremos tu pedido en las próximas 24 horas.</p>
            <p style="font-size: 13px; color: rgba(255,255,255,0.8); margin: 0;">¿Dudas? Contáctanos por WhatsApp.</p>
          </div>

          <div style="text-align: center;">
            <p style="font-size: 11px; color: #8C8880; letter-spacing: 0.15em;">SENPAI MEX · DE TOKIO UN POCO</p>
          </div>

        </div>
      </body>
      </html>
    `,
  })
}
