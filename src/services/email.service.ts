import nodemailer from "nodemailer";
import logger from "../utils/logger";

export const sendWelcomeEmail = async (email: string, password: string): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our Service!",
      text: `Hello! Welcome to our platform. Your password is: ${password}`,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Welcome email sent successfully to ${email}`);
  } catch (error) {
    logger.error(`Error sending welcome email to ${email}:`, error);
    throw new Error("Failed to send welcome email. Please try again later.");
  }
};
