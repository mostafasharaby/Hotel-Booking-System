using System.Text.Json.Serialization;

namespace Hotel_Backend.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string? GuestId { get; set; }
        public Guest? Guest { get; set; }
        public string? PaymentMethod { get; set; }
        public string? Status { get; set; }
        public DateTime? TsCreated { get; set; }
        public DateTime? TsUpdated { get; set; }
        public decimal? DiscountPercent { get; set; }
        public decimal? TotalPrice { get; set; }
       
        public ICollection<ReservedRoom>? RoomReserved { get; set; } = new List<ReservedRoom>();
        
    }
}
