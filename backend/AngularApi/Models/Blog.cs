namespace Hotel_Backend.Models
{
    public class Blog
    {
        public int BlogID { get; set; }
        public string? Title { get; set; }
        public string?Summary { get; set; }
        public string? Author { get; set; }
        public DateTime CreatedDate { get; set; }

        // Navigation Property
        public ICollection<BlogDetails>? BlogDetails { get; set; } = new List<BlogDetails>();
    }
}
