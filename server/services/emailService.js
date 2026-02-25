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

export const sendNominationConfirmation = async (email, name) => {
  const currentTransporter = getTransporter();
  const mailOptions = {
    from: `"Global Education Awards" <${process.env.BREVO_FROM_EMAIL}>`,
    to: email,
    subject: "Nomination Received - Global Education Awards",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #d4af37; border-radius: 10px; background-color: #ffffff;">
        <h2 style="color: #d4af37; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Submission Successful!</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Your nomination has been successfully received. Our team will connect with you after reviewing the profile.</p>
        
        <div style="background-color: #fcf8e3; border-left: 5px solid #d4af37; padding: 15px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #8a6d3b;">Any Queries? Feel free to contact us</h3>
          <p style="margin-bottom: 5px;"><strong>General Queries:</strong> 📞 +91 9810 88 2769</p>
          <p style="margin-bottom: 5px;"><strong>Nominations:</strong> 📞 +91 9971 00 2984</p>
          <p style="margin-bottom: 0;"><strong>Sponsorship:</strong> 📞 +91 9810 91 0686</p>
        </div>

        <p>Regards,<br><strong>Global Education Awards Team</strong></p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">
          &copy; 2026 Prime Time Research Media Pvt. Ltd. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    await currentTransporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // We don't throw here to avoid failing the nomination creation if email fails
  }
};
export const sendNominationCredentialsEmail = async (email, name, password) => {
  const currentTransporter = getTransporter();
  const mailOptions = {
    from: `"Global Education Awards" <${process.env.BREVO_FROM_EMAIL}>`,
    to: email,
    subject: "Your Account Credentials - Global Education Awards",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #d4af37; border-radius: 10px; background-color: #ffffff;">
        <h2 style="color: #d4af37; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Account Created Successfully</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>An account has been automatically created for you so you can track your nomination status.</p>
        
        <div style="background-color: #f9f9f9; border-left: 5px solid #d4af37; padding: 15px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Username:</strong> ${email}</p>
          <p style="margin: 5px 0 0 0;"><strong>Password:</strong> ${password}</p>
        </div>

        <p>You can use these credentials to log in at our website and view your nominations.</p>
        
        <p>Regards,<br><strong>Global Education Awards Team</strong></p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">
          &copy; 2026 Prime Time Research Media Pvt. Ltd. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    await currentTransporter.sendMail(mailOptions);
    console.log(`Credentials email sent to ${email}`);
  } catch (error) {
    console.error("Error sending credentials email:", error);
  }
};
export const sendNominationAndCredentialsEmail = async (email, name, password) => {
  const currentTransporter = getTransporter();
  const mailOptions = {
    from: `"Global Education Awards" <${process.env.BREVO_FROM_EMAIL}>`,
    to: email,
    subject: "Nomination Received & Account Credentials - Global Education Awards",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #d4af37; border-radius: 10px; background-color: #ffffff;">
        <h2 style="color: #d4af37; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Submission Successful!</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Your nomination has been successfully received. Our team will connect with you after reviewing the profile.</p>
        
        <h2 style="color: #d4af37; text-align: center; text-transform: uppercase; letter-spacing: 2px; margin-top: 30px;">Account Created</h2>
        <p>An account has been automatically created for you so you can track your nomination status.</p>
        
        <div style="background-color: #f9f9f9; border-left: 5px solid #d4af37; padding: 15px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Username:</strong> ${email}</p>
          <p style="margin: 5px 0 0 0;"><strong>Password:</strong> ${password}</p>
        </div>

        <p>You can use these credentials to log in at our website and view your nominations.</p>

        <div style="background-color: #fcf8e3; border-left: 5px solid #d4af37; padding: 15px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #8a6d3b;">Any Queries? Feel free to contact us</h3>
          <p style="margin-bottom: 5px;"><strong>General Queries:</strong> 📞 +91 9810 88 2769</p>
          <p style="margin-bottom: 5px;"><strong>Nominations:</strong> 📞 +91 9971 00 2984</p>
          <p style="margin-bottom: 0;"><strong>Sponsorship:</strong> 📞 +91 9810 91 0686</p>
        </div>

        <p>Regards,<br><strong>Global Education Awards Team</strong></p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #777; text-align: center;">
          &copy; 2026 Prime Time Research Media Pvt. Ltd. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    await currentTransporter.sendMail(mailOptions);
    console.log(`Combined email sent to ${email}`);
  } catch (error) {
    console.error("Error sending combined email:", error);
  }
};
