using System.Net.Mail;

namespace AngularApi.Services
{
    public class EmailService : IEmailService
    {
        public void SendEmail(Message message)
        {
            try
            {
                using var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587, // Use your email provider's port
                    Credentials = new System.Net.NetworkCredential("mustafasharaby18@gmail.com", "ltlvdncdekpfsoeq"),
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("mustafasharaby18@gmail.com"),
                    Subject = message.Subject,
                    Body = message.Body,
                    IsBodyHtml = true
                };

                foreach (var recipient in message.To)
                {
                    mailMessage.To.Add(recipient);
                }

                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Email sending failed: {ex.Message}");
                throw;
            }
        }
    }
}
