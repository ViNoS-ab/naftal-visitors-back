import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// verify connection configuration
export function verifySMTPConnection() {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Server is ready to take our messages");
    }
  });
}
export async function sendMail({ html, text, email, subject }: EmailArgs) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"NAFTAL visitors app" <${process.env.EMAIL}>`,
      to: email,
      subject,
      text,
      html,
    });
  } catch (error) {
    throw new Error("error sending email ");
  }
}

export type EmailArgs = {
  html?: string;
  text: string;
  email: string;
  subject: string;
};
