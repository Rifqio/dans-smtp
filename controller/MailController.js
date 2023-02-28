const nodemailer = require("nodemailer");
const { MailContent } = require("../mail/MailContent");

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.SendMail = async (req, res, user) => {
  try {
    await transporter.sendMail({
      from: '"Bill Gates" <admin@microsoft.com>', 
      to: `"${user.name}" <${user.email}>`, 
      subject: "Welcome To Microsoft",
      text: "Welcome",
      html: MailContent(user),
    });
  } catch (error) {
    console.log(error.message)
  }
};
