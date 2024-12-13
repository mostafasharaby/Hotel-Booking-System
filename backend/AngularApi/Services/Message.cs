namespace AngularApi.Services
{
    public class Message
    {
        public IEnumerable<string> To { get; }
        public string Subject { get; }
        public string Body { get; }

        public Message(IEnumerable<string> to, string subject, string body)
        {
            To = to;
            Subject = subject;
            Body = body;
        }
    }

}
