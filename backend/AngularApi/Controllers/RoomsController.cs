using Hotel_Backend.Models;
using Hotel_Backend.Services;
using AngularApi.Services;

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
        private readonly ICacheService _cacheService;
        public RoomsController(HotelDbContext context, StripeService stripeService , ICacheService cache)
        {
            _context = context;
            _stripeService = stripeService;
             _cacheService = cache;
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
            var userID = Request.Headers["UserId"];
            var cacheKey = $"Roomby_{userID}";
            var cachedRooms = await _cacheService.GetAsync<IEnumerable<Room>>(cacheKey);
            if (cachedRooms != null)
            {
                return Ok(cachedRooms);
            }
            var roomsFromDb = await _context.Rooms.ToListAsync();
            await _cacheService.SetAsync(cacheKey, roomsFromDb); // Convert Object → String
            return Ok(roomsFromDb);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int? id)
        {
            string cacheKey = $"Room_{id}";
            var roomCach = await _cacheService.GetAsync<Room>(cacheKey);
            if (roomCach != null)
            {
                return Ok(roomCach);
            }
            var room = await _context.Rooms.FindAsync(id);
            await _cacheService.SetAsync(cacheKey, room);

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
