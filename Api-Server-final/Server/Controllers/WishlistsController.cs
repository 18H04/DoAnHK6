using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;
        public WishlistsController(PhoneshopIdentityContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wishlist>>> GetWishlist()
        {
            // Lấy thông tin người dùng từ User.Identity
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userId = user.Id;
            //var user = _userManager.FindByNameAsync(username).Result

            var wishlistItems = await _context.Wishlist
                .Where(w => w.UserId == userId && w.Status)
                .Include(w => w.Phone)
                .ToListAsync();

            if (wishlistItems == null || wishlistItems.Count == 0)
            {
                return NotFound();
            }

            return Ok(wishlistItems);
        }

        [HttpGet("GetWishlist")]
        public async Task<ActionResult<IEnumerable<Wishlist>>> GetFavorites(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var favorites = await _context.Wishlist.Where(p => p.UserId == user.Id).Include(p => p.Phone).ToListAsync();


            return favorites;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishlist(int id, Wishlist wishlist)
        {
            if (id != wishlist.Id)
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

            }

            return NoContent();
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddWishlist([FromBody] Wishlist wishlistItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (User.Identity.IsAuthenticated)
            {
                var username = User.Identity.Name;
                var user = await _userManager.FindByNameAsync(username);

                if (user != null)
                {
                    var userId = user.Id;

                    // Kiểm tra xem mục đã tồn tại trong Wishlist chưa
                    var existingItem = _context.Wishlist
                        .FirstOrDefault(w => w.UserId == userId && w.PhoneId == wishlistItem.PhoneId);

                    if (existingItem == null)
                    {
                        // Thêm mục vào Wishlist nếu chưa tồn tại
                        var wishlist = new Wishlist
                        {
                            PhoneId = wishlistItem.PhoneId,
                            UserId = userId,
                        };

                        _context.Wishlist.Add(wishlist);
                        var result = _context.SaveChangesAsync().Result;
                        if (result > 0)
                        {
                            return Ok(new { Message = "Thông tin người dùng đã được cập nhật thành công." });
                        }
                        else
                        {
                            // Xử lý lỗi nếu có
                            return BadRequest(new { Message = "Có lỗi xảy ra khi cập nhật thông tin người dùng." });
                        }
                    }
                    else
                    {
                        // Mục đã tồn tại trong Wishlist
                        return BadRequest("Mục đã tồn tại trong Wishlist.");
                    }
                }
                else
                {
                    // Không tìm thấy người dùng với tên đăng nhập tương ứng
                    return NotFound($"Không tìm thấy người dùng với tên đăng nhập {User.Identity.Name}.");
                }
            }
            else
            {
                // Người dùng chưa đăng nhập
                return Unauthorized("Người dùng chưa đăng nhập.");
            }
        }

        //[HttpPost]
        //[Authorize(Roles = "User")]
        //public async Task<IActionResult> AddToCartFromWishlist(int phoneId)
        //{
        //    // Kiểm tra xem Phone và User có tồn tại hay không
        //    var phone = await _context.Phones.FindAsync(phoneId);
        //    if (phone == null)
        //    {
        //        return NotFound("Phone không tồn tại");
        //    }


        //    var wishlistItem = await _context.Wishlist
        //        .FirstOrDefaultAsync(w => w.PhoneId == phoneId);

        //    if (wishlistItem == null)
        //    {
        //        return NotFound("Mục trong danh sách yêu thích không tồn tại");
        //    }

        //    var username = User.Identity.Name;
        //    var user = await _userManager.FindByNameAsync(username);
        //    var userid = user.Id;
        //    // Tạo mới một đối tượng CartItem từ WishlistItem
        //    var cartItem = new Cart
        //    {
        //        PhoneId = phoneId,
        //        UserId = userid,

        //        Price = phone.Price // Giả sử giá của sản phẩm giống nhau trong giỏ hàng và danh sách yêu thích
        //    };

        //    // Thêm vào DbContext và lưu thay đổi vào cơ sở dữ liệu
        //    _context.CartItems.Add(cartItem);
        //    _context.Wishlists.Remove(wishlistItem); // Xóa khỏi danh sách yêu thích sau khi thêm vào giỏ hàng
        //    await _context.SaveChangesAsync();

        //    return Ok("Đã thêm vào giỏ hàng từ danh sách yêu thích");
        //}

















        [HttpPost("CheckExists")]
        public async Task<bool> WishlistExists(string username, int productId)
        {
            var user = await _userManager.FindByNameAsync(username);
            var check = _context.Wishlist.Any(w => w.PhoneId == productId && w.UserId == user.Id);
            return check;


        }
        //Thêm vào yêu thích 
        [HttpPost("addFavorite")]
        public async Task AddProductToFavorite(string username, int productId)
        {
            bool isProductExists = false;
            var user = await _userManager.FindByNameAsync(username);
            var existingFavoriteItem = _context.Wishlist
            .FirstOrDefault(f => f.UserId == user.Id && f.Id == productId);

            if (existingFavoriteItem != null)
            {
                // Nếu sản phẩm đã tồn tại, đặt biến là true
                isProductExists = true;
            }
            else
            {
                var newFavoriteItem = new Wishlist
                {
                    UserId = user.Id,
                    PhoneId = productId,
                };


                _context.Wishlist.Add(newFavoriteItem);
            }


            await _context.SaveChangesAsync();
        }


        [HttpDelete("DeleteWishList")]
        public async Task<IActionResult> DeleteWishList(string username, int productId)
        {

            var user = await _userManager.FindByNameAsync(username);
            var existingFavoriteItem = _context.Wishlist.Where(f => f.UserId == user.Id && f.Id == productId).FirstOrDefault();
            _context.Wishlist.Remove(existingFavoriteItem);
            await _context.SaveChangesAsync();
            return NoContent();


        }

        [HttpDelete("DeleteAllWishList")]
        public async Task<IActionResult> DeleteAllWishList(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            // Lấy tất cả sản phẩm trong wishlist của người dùng cụ thể
            var itemsToDelete = _context.Wishlist.Where(f => f.UserId == user.Id).ToList();

            // Xóa tất cả sản phẩm
            _context.Wishlist.RemoveRange(itemsToDelete);

            await _context.SaveChangesAsync();
            return NoContent();
        }


    }
}