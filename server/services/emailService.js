export async function sendInquiryNotification(inquiry) {
  if (!process.env.RESEND_API_KEY || !process.env.YOUR_EMAIL) return;

  const text = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Company: ${inquiry.company || "Not provided"}`,
    `Project: ${inquiry.projectType}`,
    `Budget: ${inquiry.budget || "Not provided"}`,
    "",
    `Timeline: ${inquiry.timeline || "Not provided"}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [process.env.YOUR_EMAIL],
      reply_to: inquiry.email,
      subject: `New portfolio inquiry from ${inquiry.name}`,
      text,
    }),
  });
  if (!response.ok) throw new Error(`Resend returned ${response.status}: ${await response.text()}`);
}
