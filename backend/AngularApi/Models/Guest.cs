using Microsoft.AspNetCore.Identity;

namespace Hotel_Backend.Models
{
    public class Guest : IdentityUser
    {          
        public string? Address { get; set; }
        public string? Details { get; set; }

        public string?PersonalImgUrl{ get; set; }
        public string? CoverImgUrl { get; set; }
        public ICollection<Reservation>? Reservations { get; set; } = new List<Reservation>();
    }
}
