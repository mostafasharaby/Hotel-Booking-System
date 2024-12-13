namespace Hotel_Backend.Models
{
    public class BlogDetails
    {
        public int Id{ get; set; }
        public int? BlogID { get; set; } // Foreign Key
        public string? Content { get; set; }
        public string? ImageURL { get; set; }
        public string? VideoURL { get; set; }

        // Navigation Property
        public Blog? Blog { get; set; }
    }
}
