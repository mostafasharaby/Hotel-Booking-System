namespace Hotel_Backend.Models
{
    public class ReservationStatusEvent
    {
        public int Id { get; set; }
        public int? ReservationId { get; set; }
        public Reservation? Reservation { get; set; }    
        public string? Details { get; set; }
        public DateTime? TsCreated { get; set; }
    }

}
