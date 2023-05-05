using System.Net.Mail;
using System.Net;

namespace ShareEaseAPI.Handler
    {
    public class SendEmail
        {
        public static void send(string body,string subject, string email)
            {
            Console.WriteLine("Sent command triggered");
            var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525)
                {
                Credentials = new NetworkCredential("4daaba8a7d07e1", "3b89834d6b44a8"),
                EnableSsl = true
                };
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("from@example.com");
            mail.To.Add(email);
            mail.Subject = subject;
            mail.Body = body;
            client.Send(mail);
            Console.WriteLine("Sent");
            }
        }
    }
