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
    public class InvoiceGuestsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public InvoiceGuestsController(HotelDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceGuest>>> GetInvoiceGuests()
        {
            return await _context.InvoiceGuests.ToListAsync();
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceGuest>> GetInvoiceGuest(int id)
        {
            var invoiceGuest = await _context.InvoiceGuests.Include(ig => ig.Guest)
                                                           .Include(ig => ig.Reservation)
                                                           .FirstOrDefaultAsync(ig => ig.Id == id);

            if (invoiceGuest == null)
            {
                return NotFound();
            }

            return invoiceGuest;
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceGuest(int id, InvoiceGuest invoiceGuest)
        {
            if (id != invoiceGuest.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoiceGuest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceGuestExists(id))
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

        
        //[HttpPost]
        //public async Task<ActionResult<InvoiceGuest>> PostInvoiceGuest(InvoiceGuest invoiceGuest)
        //{
        //    _context.InvoiceGuests.Add(invoiceGuest);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetInvoiceGuest", new { id = invoiceGuest.Id }, invoiceGuest);
        //}

        [HttpPost]
        public async Task<ActionResult<InvoiceGuest>> PostInvoiceGuest(InvoiceGuest invoiceGuest)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            }

            var reservation = await _context.Reservations
                .FirstOrDefaultAsync(r => r.GuestId == userId );// && r.Id == invoiceGuest.ReservationId

            if (reservation == null)
            {
                return BadRequest("Reservation not found.");
            }

           
            invoiceGuest.GuestId = userId;
            invoiceGuest.ReservationId = reservation.Id;
            invoiceGuest.TsIssued = DateTime.UtcNow;
            invoiceGuest.InvoiceAmount = reservation.TotalPrice;

            
            _context.InvoiceGuests.Add(invoiceGuest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInvoiceGuest), new { id = invoiceGuest.Id }, invoiceGuest);
        }


     
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceGuest(int id)
        {
            var invoiceGuest = await _context.InvoiceGuests.FindAsync(id);
            if (invoiceGuest == null)
            {
                return NotFound();
            }

            _context.InvoiceGuests.Remove(invoiceGuest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceGuestExists(int id)
        {
            return _context.InvoiceGuests.Any(e => e.Id == id);
        }
    }
}
