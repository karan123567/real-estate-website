// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

// const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@yourdomain.com';
// const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yourdomain.com';

// const sendInquiryEmails = async (inquiry) => {
//   try {
//     // 1. Notify admin
//     await resend.emails.send({
//       from: FROM_EMAIL,
//       to: ADMIN_EMAIL,
//       subject: `🏠 New Inquiry: ${inquiry.propertyTitle || 'General Inquiry'}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background: #1a1a2e; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
//             <h2 style="margin: 0;">🏠 New Property Inquiry</h2>
//           </div>
//           <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
//             <table style="width: 100%; border-collapse: collapse;">
//               <tr><td style="padding: 8px; font-weight: bold; width: 30%;">Property:</td>
//                   <td style="padding: 8px;">${inquiry.propertyTitle || 'General'}</td></tr>
//               <tr style="background: white;"><td style="padding: 8px; font-weight: bold;">Name:</td>
//                   <td style="padding: 8px;">${inquiry.name}</td></tr>
//               <tr><td style="padding: 8px; font-weight: bold;">Email:</td>
//                   <td style="padding: 8px;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
//               <tr style="background: white;"><td style="padding: 8px; font-weight: bold;">Phone:</td>
//                   <td style="padding: 8px;">${inquiry.phone || 'Not provided'}</td></tr>
//               <tr><td style="padding: 8px; font-weight: bold;">Message:</td>
//                   <td style="padding: 8px;">${inquiry.message}</td></tr>
//               <tr style="background: white;"><td style="padding: 8px; font-weight: bold;">Received:</td>
//                   <td style="padding: 8px;">${new Date().toLocaleString()}</td></tr>
//             </table>
//             <div style="margin-top: 20px; text-align: center;">
//               <a href="${process.env.FRONTEND_URL}/admin/inquiries" 
//                  style="background: #e74c3c; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none;">
//                 View in Admin Panel
//               </a>
//             </div>
//           </div>
//         </div>
//       `
//     });

//     // 2. Thank you to visitor
//     await resend.emails.send({
//       from: FROM_EMAIL,
//       to: inquiry.email,
//       subject: 'Thank you for your inquiry!',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background: #1a1a2e; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
//             <h1 style="margin: 0;">Thank You!</h1>
//           </div>
//           <div style="padding: 30px; background: white; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
//             <p>Dear <strong>${inquiry.name}</strong>,</p>
//             <p>We received your inquiry${inquiry.propertyTitle ? ` about <strong>${inquiry.propertyTitle}</strong>` : ''}.</p>
//             <p>Our team will contact you within <strong>24 hours</strong>.</p>
//             <hr style="border: 1px solid #eee; margin: 20px 0;">
//             <p>In the meantime, browse more properties:</p>
//             <div style="text-align: center; margin-top: 20px;">
//               <a href="${process.env.FRONTEND_URL}/properties"
//                  style="background: #1a1a2e; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none;">
//                 Browse Properties
//               </a>
//             </div>
//             <p style="margin-top: 30px; color: #666; font-size: 12px;">
//               Best regards,<br>The Real Estate Team
//             </p>
//           </div>
//         </div>
//       `
//     });

//     console.log('✅ Inquiry emails sent to:', inquiry.email);
//   } catch (error) {
//     console.error('❌ Email error:', error.message);
//     // Don't throw - inquiry should be saved even if email fails
//   }
// };
// export { sendInquiryEmails };
// export default { sendInquiryEmails };


import { Resend } from 'resend';

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@yourdomain.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yourdomain.com';

const sendInquiryEmails = async (inquiry) => {
  // Check if email service is configured
  if (!resend) {
    console.warn('⚠️  Email service not configured (missing RESEND_API_KEY)');
    console.log('📧 Would have sent inquiry email to:', inquiry.email);
    return { success: false, message: 'Email service not configured' };
  }

  try {
    // 1. Notify admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🏠 New Inquiry: ${inquiry.propertyTitle || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a2e; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">🏠 New Property Inquiry</h2>
          </div>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold; width: 30%;">Property:</td>
                  <td style="padding: 8px;">${inquiry.propertyTitle || 'General'}</td></tr>
              <tr style="background: white;"><td style="padding: 8px; font-weight: bold;">Name:</td>
                  <td style="padding: 8px;">${inquiry.name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td>
                  <td style="padding: 8px;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
              <tr style="background: white;"><td style="padding: 8px; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px;">${inquiry.phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Message:</td>
                  <td style="padding: 8px;">${inquiry.message}</td></tr>
              <tr style="background: white;"><td style="padding: 8px; font-weight: bold;">Received:</td>
                  <td style="padding: 8px;">${new Date().toLocaleString()}</td></tr>
            </table>
            <div style="margin-top: 20px; text-align: center;">
              <a href="${process.env.FRONTEND_URL}/admin/inquiries" 
                 style="background: #e74c3c; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none;">
                View in Admin Panel
              </a>
            </div>
          </div>
        </div>
      `
    });

    // 2. Thank you to visitor
    await resend.emails.send({
      from: FROM_EMAIL,
      to: inquiry.email,
      subject: 'Thank you for your inquiry!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a2e; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Thank You!</h1>
          </div>
          <div style="padding: 30px; background: white; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
            <p>Dear <strong>${inquiry.name}</strong>,</p>
            <p>We received your inquiry${inquiry.propertyTitle ? ` about <strong>${inquiry.propertyTitle}</strong>` : ''}.</p>
            <p>Our team will contact you within <strong>24 hours</strong>.</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p>In the meantime, browse more properties:</p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${process.env.FRONTEND_URL}/properties"
                 style="background: #1a1a2e; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none;">
                Browse Properties
              </a>
            </div>
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              Best regards,<br>The Real Estate Team
            </p>
          </div>
        </div>
      `
    });

    console.log('✅ Inquiry emails sent to:', inquiry.email);
    return { success: true };
  } catch (error) {
    console.error('❌ Email error:', error.message);
    // Don't throw - inquiry should be saved even if email fails
    return { success: false, error: error.message };
  }
};

export { sendInquiryEmails };
export default { sendInquiryEmails };