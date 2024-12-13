namespace Hotel_Backend.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string? CompanyName { get; set; }
        public string? VATID { get; set; }
        public string? Email { get; set; }
        public string?CompanyAddress { get; set; }
        public bool? IsActive { get; set; }

        public int? CityId { get; set; }
        public City? City { get; set; }
    }

}
