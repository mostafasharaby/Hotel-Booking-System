namespace Hotel_Backend.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string? HotelName { get; set; }
        public string? Description { get; set; }
        public bool? IsActive { get; set; }

        public int? CompanyId { get; set; }
        public Company? Company { get; set; }

        public int CityId { get; set; }
        public City? City { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public ICollection<Room>? Rooms { get; set; } = new List<Room>();
    }

}
