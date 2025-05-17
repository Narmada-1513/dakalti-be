import nodemailer from "nodemailer";
import { getEnv } from "../config/getEnv";

const { emailUser, emailPass } = getEnv();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) => {
  try {
    const mailOptions = {
      from: `"No Reply" <${emailUser}>`,
      to,
      subject,
      text,
      html: html || text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Email sending failed:`, error);
    throw new Error("Email could not be sent.");
  }
};
