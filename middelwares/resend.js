const { Resend } = require("resend");
const fs = require("fs");

const resend = new Resend(process.env.RESEND);
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

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: subject,
      html: modifiedHtml,
    });
    return {
      status: true,
      msg: "successful delivered",
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
