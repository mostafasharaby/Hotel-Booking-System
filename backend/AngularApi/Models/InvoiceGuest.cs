namespace Hotel_Backend.Models
{
    public class InvoiceGuest
    {
        public int Id { get; set; }
        public string? GuestId { get; set; }
        public Guest? Guest { get; set; }

        public int? ReservationId { get; set; }
        public Reservation? Reservation { get; set; }

        public decimal? InvoiceAmount { get; set; }
        public DateTime? TsIssued { get; set; }
        public DateTime? TsPaid { get; set; }
        public DateTime? TsCanceled { get; set; }
        public InvoiceStatus? Status { get; set; }
    }
    public enum InvoiceStatus
    {
        Pending,    
        Paid,       
        Canceled   
    }
}
