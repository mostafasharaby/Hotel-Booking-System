using System.Text.Json.Serialization;

namespace Hotel_Backend.Models
{
    public class Room
    {
        public int? RoomID { get; set; }
        public string? RoomName { get; set; }        
        public decimal? Price { get; set; }
        public int RoomTypeId { get; set; }
        public string? Description { get; set; }
        public int? Capacity { get; set; }
        public int? Size { get; set; }
        public string? Services { get; set; }
        public string? ImageURL { get; set; }
        public RoomType? RoomType { get; set; }
        [JsonIgnore]
        public ICollection<ReservedRoom> RoomReserved { get; set; } = new List<ReservedRoom>();
    }

}
