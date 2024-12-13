using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hotel_Backend.Models;
using Hotel_Backend.DTO;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Hotel_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public ReservationsController(HotelDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            }
            return await _context.Reservations.Where(i=>i.GuestId==userId)
                                                .Include(i=>i.RoomReserved)
                                                .ThenInclude(i=>i.Room)
                                                .ToListAsync();
            }

      
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Reservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        //{
        //    _context.Reservations.Add(reservation);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation);
        //}
       
        [HttpPost]
        public async Task<IActionResult> PostReservation(CartDto request)
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine("user: : ",User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            } 

            Reservation reservation;            
            reservation = await _context.Reservations
                                        .Include(r => r.RoomReserved)
                                        .FirstOrDefaultAsync(r => r.Id == request.ReservationId);
           

            if (reservation == null)
            {               
                reservation = new Reservation
                {
                    GuestId = userId, 
                    Status = "Pending",
                    TsCreated = DateTime.UtcNow,
                    TsUpdated = DateTime.UtcNow,
                    DiscountPercent = 0,
                    TotalPrice = 0,
                    RoomReserved = new List<ReservedRoom>()
                };                
                _context.Reservations.Add(reservation);
                await _context.SaveChangesAsync();
            }
           
            var reservedRoom = new ReservedRoom
            {
                RoomId = request.RoomId,
                Price = request.Price,
                ReservationId = reservation.Id
            };

            reservation.RoomReserved.Add(reservedRoom);
            
            reservation.TotalPrice += reservedRoom.Price;

            _context.Reservations.Update(reservation);
            await _context.SaveChangesAsync();

            return Ok(reservation);
        }


        // DELETE: api/Reservations/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteReservation(int id)
        //{
        //    var reservation = await _context.Reservations.FindAsync(id);
        //    if (reservation == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Reservations.Remove(reservation);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomFromReservation(int id)
        {
            // Find the reservation by ID
            var reservation = await _context.Reservations
                                            .Include(r => r.RoomReserved)
                                            .FirstOrDefaultAsync(r => r.Id == id);

            if (reservation == null)
            {
                return NotFound("Reservation not found.");
            }

            // Find the room to be deleted within this reservation (you could also pass the ReservedRoomId in the query)
            var reservedRoom = reservation.RoomReserved.FirstOrDefault(rr => rr.Id == id);

            if (reservedRoom == null)
            {
                return NotFound("Room not found in this reservation.");
            }
            
            reservation.RoomReserved.Remove(reservedRoom);           
            reservation.TotalPrice -= reservedRoom.Price;

            if (reservation.TotalPrice < 0)
            {
                reservation.TotalPrice = 0;
            }
          
            _context.Reservations.Update(reservation);
            await _context.SaveChangesAsync();

            return Ok(reservation); 
        }


        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.Id == id);
        }
    }
}
