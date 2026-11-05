import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  // Don't attempt or hang if credentials are not configured
  if (!user || !pass) {
    console.warn("⚠️ GMAIL_USER or GMAIL_APP_PASSWORD is not set. Skipping email delivery.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
      connectionTimeout: 5000, // 5s timeout to prevent hanging
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });

    await transporter.sendMail({
      from: `"SkillBridge LMS" <${user}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Confirmation email sent to:", to);
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error.message);
    // Don't throw so caller isn't interrupted
  }
};