namespace AngularApi.Services
{
    public class Response
    {
        public string Status { get; set; }
        public string Message { get; set; }

        public Response(string status, string message)
        {
            Status = status;
            Message = message;
        }
    }

}
