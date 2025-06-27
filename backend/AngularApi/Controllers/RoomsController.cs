using Hotel_Backend.Models;
using Hotel_Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly HotelDbContext _context;
        private readonly StripeService _stripeService;

        public RoomsController(HotelDbContext context, StripeService stripeService)
        {
            _context = context;
            _stripeService = stripeService;
        }

        [HttpPost("reserve/{roomId}")]
        public async Task<IActionResult> ReserveRoom(int roomId)
        {
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
            {
                return NotFound("Room not found");
            }

            var session = _stripeService.CreateCheckoutSession(room);
            return Ok(new { sessionId = session.Id, checkoutUrl = session.Url });
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _context.Rooms.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int? id)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom(int? id, Room room)
        {
            if (id != room.RoomID)
            {
                return BadRequest();
            }

            _context.Entry(room).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
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
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoom", new { id = room.RoomID }, room);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int? id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoomExists(int? id)
        {
            return _context.Rooms.Any(e => e.RoomID == id);
        }
    }
}
