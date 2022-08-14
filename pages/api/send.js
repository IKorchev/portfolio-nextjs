import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
})

const sendEmail = async (name, email, text) => {
  try {
    const options = {
      from: '"IKORCHEV.COM" new_email@zohomail.eu',
      to: 'korchev94@gmail.com',
      subject: `From:${name}, ${email}`,
      text: text,
    }
    transporter.sendMail(options)
    return 'success'
  } catch (error) {
    return 'failed'
  }
}

export default async function sendAPI(req, res) {
  const { name, email, text } = JSON.parse(req.body)
  if (!name || !email || !text) return res.status(400).json({ status: 'failed' }) // if the a form field wasn't filled
  const emailStatus = await sendEmail(name, email, text)
  await res.status(200).json({ status: emailStatus })
}
