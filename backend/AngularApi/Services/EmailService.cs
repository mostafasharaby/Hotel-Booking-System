using System.Net.Mail;

namespace AngularApi.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public void SendEmail(Message message)
        {
            try
            {
                var emailUsername = _configuration["EmailSettings:EmailUsername"];
                var emailPassword = _configuration["EmailSettings:EmailPassword"];

                using var smtpClient = new SmtpClient("smtp.gmail.com")
                {

                    Port = 587, // Use your email provider's port
                    Credentials = new System.Net.NetworkCredential(emailUsername, emailPassword),
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(emailUsername),
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
