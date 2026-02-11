import nodemailer from "nodemailer";

// Create transporter lazily to ensure env vars are loaded
let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: process.env.BREVO_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
      },
    });
  }
  return transporter;
};

export const sendOTP = async (email, otp) => {
  const currentTransporter = getTransporter();
  const mailOptions = {
    from: `"Global Education Awards" <${process.env.BREVO_FROM_EMAIL}>`,
    to: email,
    subject: "Your OTP Verification Code",
    text: `Your OTP for registration is: ${otp}. It will expire in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #d4af37; border-radius: 10px;">
        <h2 style="color: #d4af37; text-align: center;">Global Education Awards</h2>
        <p>Hello,</p>
        <p>Your verification code for registration is:</p>
        <div style="font-size: 24px; font-weight: bold; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request this code, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">
          &copy; 2026 Prime Time Research Media Pvt. Ltd. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    await currentTransporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP email");
  }
};
