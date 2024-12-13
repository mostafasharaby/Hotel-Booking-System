using Hotel_Backend.Models;

namespace Hotel_Backend.DTO
{
    public class CartDto
    {
        public int ReservationId { get; set; }  
        public string? GuestId { get; set; }
        public Guest? Guest { get; set; } = null;
        public int? RoomId { get; set; }  
        public decimal? Price { get; set; }  
    }

}
