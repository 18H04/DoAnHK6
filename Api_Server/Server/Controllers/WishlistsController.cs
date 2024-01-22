using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Versioning;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistsController : ControllerBase
    {
        private readonly PhoneshopIdentityContext _context;
        public WishlistsController(PhoneshopIdentityContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wishlist>>> GetWishlist()
        {
            return await _context.Wishlist.Include(w => w.Phone).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Wishlist>> GetWishlist(int id)
        {
            var wishlist = await _context.Wishlist.Include(w => w.Phone) 
                                                  .FirstOrDefaultAsync(w => w.Id == id);
            if(wishlist == null) { 
                return NotFound();
            }

            return wishlist;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishlist(int id, Wishlist wishlist)
        {
            if(id != wishlist.Id)
            {
                return BadRequest();
            }
            _context.Entry(wishlist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!WishlistExists(id))
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
        public async Task<ActionResult<Wishlist>> PostWishlist(Wishlist wishlist)
        {
            _context.Wishlist.Add(wishlist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWishList", new { id = wishlist.Id }, wishlist);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishlist(int id)
        {
            var wishlist = await _context.Wishlist.FindAsync(id);
            if(wishlist == null) {  return NotFound(); }

            wishlist.Status = false;
            await _context.SaveChangesAsync();

            return NoContent(); 
        }

        private bool WishlistExists(int id)
        {
            return _context.Wishlist.Any(w => w.Id == id);
        }
    }
}
