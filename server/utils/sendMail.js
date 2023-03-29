import nodemailer from "nodemailer";
import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTestAccount({
    host: process.env.MAILTRAP_HOST,
    port: MAILTRAP_PORT,
    secure: false,
    auth: {
      user: testAccount.MAILTRAP_USERNAME,
      pass: testAccount.MAILTRAP_PASSWORD,
    },
  });

  const mailOptions = {
    form: "Adam <adam@mgil.com>",
    to: options.to,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendEmail(mailOptions);
};
