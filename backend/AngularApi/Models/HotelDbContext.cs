using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Hotel_Backend.Models
{
    public class HotelDbContext : IdentityDbContext<Guest>
    {
        public HotelDbContext() { }     
        public HotelDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions) { }

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<BlogDetails> BlogDetails { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<InvoiceGuest> InvoiceGuests { get; set; }        
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationStatusEvent> ReservationStatusEvents { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<ReservedRoom> ReservedRooms { get; set; }
        public DbSet<RoomType> Room_Types { get; set; }


               
        

    }
}
