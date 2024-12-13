using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hotel_Backend.Models;
using System.Security.Claims;

namespace Hotel_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservedRoomsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public ReservedRoomsController(HotelDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservedRoom>>> GetReservedRooms()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            }
            return await _context.ReservedRooms.Include(i => i.Room)
                                                .Include(i=>i.Reservation)
                                                .Where(i=>i.Reservation.GuestId == userId )
                                                .ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<ReservedRoom>> GetReservedRoom(int id)
        {
            var reservedRoom = await _context.ReservedRooms.FindAsync(id);

            if (reservedRoom == null)
            {
                return NotFound();
            }

            return reservedRoom;
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservedRoom(int id, ReservedRoom reservedRoom)
        {
            if (id != reservedRoom.Id)
            {
                return BadRequest();
            }

            _context.Entry(reservedRoom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservedRoomExists(id))
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

      
        [HttpPost]
        public async Task<ActionResult<ReservedRoom>> PostReservedRoom(ReservedRoom reservedRoom)
        {
            _context.ReservedRooms.Add(reservedRoom);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservedRoom", new { id = reservedRoom.Id }, reservedRoom);
        }

        // DELETE: api/ReservedRooms/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteReservedRoom(int id)
        //{
        //    // Find the reserved room by its ID
        //    var reservedRoom = await _context.ReservedRooms
        //                                     .Include(rr => rr.Reservation)
        //                                     .ThenInclude(r => r.RoomReserved)
        //                                     .FirstOrDefaultAsync(rr => rr.Id == id);

        //    if (reservedRoom == null)
        //    {
        //        return NotFound("Reserved room not found.");
        //    }

        //    // Reference the associated reservation
        //    var reservation = reservedRoom.Reservation;

        //    // Remove the reserved room from the database
        //    _context.ReservedRooms.Remove(reservedRoom);
        //    await _context.SaveChangesAsync();

        //    // Check if the reservation has no more reserved rooms
        //    if (!reservation.RoomReserved.Any())
        //    {
        //        // Remove the reservation if it's empty
        //        _context.Reservations.Remove(reservation);
        //        await _context.SaveChangesAsync();
        //    }

        //    return NoContent();
        //}

        [HttpDelete("{roomId}")]
        public async Task<IActionResult> DeleteReservedRoomWithRoomId(int roomId)
        {
            // Find the reserved room by RoomId
            var reservedRoom = await _context.ReservedRooms
                                             .Include(rr => rr.Reservation)
                                             .ThenInclude(r => r.RoomReserved)
                                             .FirstOrDefaultAsync(rr => rr.RoomId == roomId);

            if (reservedRoom == null)
            {
                return NotFound("Reserved room not found.");
            }

            
            var reservation = reservedRoom.Reservation;
           
            _context.ReservedRooms.Remove(reservedRoom);
            await _context.SaveChangesAsync();

            if (!reservation.RoomReserved.Any())
            {               
                _context.Reservations.Remove(reservation);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }



        private bool ReservedRoomExists(int id)
        {
            return _context.ReservedRooms.Any(e => e.Id == id);
        }
    }
}
