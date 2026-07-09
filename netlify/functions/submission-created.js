// Netlify Serverless Function: Triggered automatically on form submissions
exports.handler = async function(event, context) {
  try {
    const payload = JSON.parse(event.body).payload;
    
    // Extract form fields
    const name = payload.data.name || 'Valued Customer';
    const email = payload.data.email;
    const company = payload.data.company || 'N/A';
    const appType = payload.data.appType || 'N/A';

    console.log(`Processing submission from: ${name} (${email}) for company: ${company}`);

    if (!email) {
      console.error("No recipient email found in submission data.");
      return { statusCode: 400, body: "Email field is missing." };
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY environment variable is not defined. Email skipped.");
      return { 
        statusCode: 200, 
        body: JSON.stringify({ message: "Verification successful. Set RESEND_API_KEY in Netlify to send actual emails." }) 
      };
    }

    // Call Resend API via native fetch
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Amith Dubey <amith@nexoraio.co.in>',
        to: [email],
        reply_to: 'amith@nexoraio.co.in',
        subject: 'Welcome to NexoraIO - Live Demo Scheduled',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #0d9488; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">NexoraIO</h2>
              <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Enterprise Desktop Automation Platform</p>
            </div>
            
            <div style="border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 20px;">
              <p style="font-size: 16px; margin: 0 0 16px 0;">Hi <strong>${name}</strong>,</p>
              <p style="font-size: 15px; margin: 0 0 16px 0; color: #334155;">Thank you for reaching out! I've received your request for a live demo of NexoraIO.</p>
              <p style="font-size: 15px; margin: 0; color: #334155;">Here are the details we've received:</p>
              
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 16px 0; font-size: 14px; border: 1px solid #e2e8f0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; font-weight: 600; width: 40%;">Company:</td>
                    <td style="padding: 4px 0; color: #0f172a; font-weight: 500;">${company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Legacy Focus App:</td>
                    <td style="padding: 4px 0; color: #0f172a; font-weight: 500; text-transform: capitalize;">${appType}</td>
                  </tr>
                </table>
              </div>
            </div>

            <div>
              <p style="font-size: 15px; margin: 0 0 16px 0; color: #334155;">I will contact you shortly (typically within 4-12 hours) with a scheduling link so we can choose a convenient time for the live demo and discuss your specific automation workflows.</p>
              <p style="font-size: 15px; margin: 0 0 24px 0; color: #334155;">If you have any initial files, screenshots of forms, or specific questions in the meantime, feel free to reply directly to this email.</p>
              
              <p style="margin: 0; font-size: 15px; color: #0f172a;">Best regards,</p>
              <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 700; color: #0f172a;">Amith Dubey</p>
              <p style="margin: 2px 0 0 0; font-size: 14px; color: #64748b; font-weight: 500;">Founder & Solutions Architect, NexoraIO</p>
              <p style="margin: 8px 0 0 0; font-size: 13px;"><a href="mailto:amith@nexoraio.co.in" style="color: #0d9488; text-decoration: none;">amith@nexoraio.co.in</a></p>
            </div>
          </div>
        `
      })
    });

    const result = await response.json();
    console.log("Resend API Email sent successfully. Response payload:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Welcome email triggered successfully." })
    };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
