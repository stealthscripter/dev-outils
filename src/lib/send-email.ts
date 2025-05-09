const nodemailer = require("nodemailer");

interface emailInput {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, text, html, from }: emailInput) => {
  const info = await transporter.sendMail({
    from: from || "Dev Outils Support<noreply@devoutils.team>",
    to,
    subject,
    text: text || "",
    html,
  });

  console.log("Message sent: %s", info.messageId);
};

export default sendEmail;