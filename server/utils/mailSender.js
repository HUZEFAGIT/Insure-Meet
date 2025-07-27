const nodemailer = require("nodemailer")



const mailSender = async (email, title, body) => {
  try {
    console.log("mail hosting", process.env.MAIL_HOST)
    console.log("mail user", process.env.MAIL_USER)
    console.log("mail pass", process.env.MAIL_PASS)
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })

    let info = await transporter.sendMail({
      from: `"Care to Sure" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log(info.response)
    return info
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

module.exports = mailSender