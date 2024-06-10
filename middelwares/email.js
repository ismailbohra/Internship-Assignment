require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require("fs");

const readHTMLFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

const sendEmail = async (to, subject, templatePath, replacements) => {
  const html = await readHTMLFile(templatePath);
  let modifiedHtml = html;
  for (const [placeholder, value] of Object.entries(replacements)) {
    modifiedHtml = modifiedHtml.replace(new RegExp(placeholder, "g"), value);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: to,
    subject: subject,
    html: modifiedHtml,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(result);
    return {
      status: true,
      msg: "Email successfully delivered",
    };
  } catch (sendError) {
    console.error("Error sending email:", sendError);
    return {
      status: false,
      msg: "Failed to send email",
    };
  }
};

module.exports = sendEmail;
