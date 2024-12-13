using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hotel_Backend.Models;

namespace Hotel_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogDetailsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public BlogDetailsController(HotelDbContext context)
        {
            _context = context;
        }

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogDetails>>> GetBlogDetails()
        {
            return await _context.BlogDetails.ToListAsync();
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogDetails>> GetBlogDetails(int id)
        {
            var blogDetails = await _context.BlogDetails.FindAsync(id);

            if (blogDetails == null)
            {
                return NotFound();
            }

            return blogDetails;
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlogDetails(int id, BlogDetails blogDetails)
        {
            if (id != blogDetails.Id)
            {
                return BadRequest();
            }

            _context.Entry(blogDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogDetailsExists(id))
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
        public async Task<ActionResult<BlogDetails>> PostBlogDetails(BlogDetails blogDetails)
        {
            _context.BlogDetails.Add(blogDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlogDetails", new { id = blogDetails.Id }, blogDetails);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogDetails(int id)
        {
            var blogDetails = await _context.BlogDetails.FindAsync(id);
            if (blogDetails == null)
            {
                return NotFound();
            }

            _context.BlogDetails.Remove(blogDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BlogDetailsExists(int id)
        {
            return _context.BlogDetails.Any(e => e.Id == id);
        }
    }
}
