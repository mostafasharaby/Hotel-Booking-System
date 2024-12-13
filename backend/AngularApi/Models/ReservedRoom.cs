using System.Text.Json.Serialization;

namespace Hotel_Backend.Models
{
    public class ReservedRoom
    {
        public int Id { get; set; }
        public int ReservationId { get; set; }
        [JsonIgnore]
        public Reservation? Reservation { get; set; }

        public int? RoomId { get; set; }
       
        public Room? Room { get; set; }

        public decimal? Price { get; set; }
    }
}
