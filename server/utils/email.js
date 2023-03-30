const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mailOptions = {
    form: "Adam <adam@mgil.com>",
    to: options.to,
    subject: options.subject,
    html: options.message,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
