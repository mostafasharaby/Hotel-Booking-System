using Hotel_Backend.Models;
using Hotel_Backend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/payment")]
public class PaymentController : ControllerBase
{
    private readonly StripeService _stripeService;
    private readonly HotelDbContext _context;

    public PaymentController(StripeService stripeService, HotelDbContext context)
    {
        _stripeService = stripeService;
        _context = context;
    }

    [HttpPost("create-checkout-session")]
    public IActionResult CreateCheckoutSession()
    {
        var room = new Room { Capacity = 2, Description = "ssssss", ImageURL = ".as" };
        var session = _stripeService.CreateCheckoutSession(room);
        return Ok(new { url = session.Url });
    }

    [HttpGet("success")]
    public async Task<IActionResult> PaymentSuccess(int roomId)
    {
        var room = await _context.Rooms.FindAsync(roomId);
        if (room == null)
        {
            return NotFound("Room not found");
        }

        var reservedRoom = new ReservedRoom
        {
            RoomId = roomId,
            Price = room.Price
        };

        _context.ReservedRooms.Add(reservedRoom);
        await _context.SaveChangesAsync();

        return Ok("Payment successful! Room is reserved.");
    }

    [HttpGet("cancel")]
    public IActionResult Cancel()
    {
        return Ok("Payment Cancelled.");
    }
}
