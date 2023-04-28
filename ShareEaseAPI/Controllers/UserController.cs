
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShareEaseAPI.Data;
using ShareEaseAPI.Models;

namespace ShareEaseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public UserController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserModel(int id)
        {
            var userModel = await _context.Users.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserModel(int id, UserModel userModel)
        {
            if (id != userModel.user_id)
            {
                return BadRequest();
            }

            _context.Entry(userModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUserModel(UserModel userModel)
        {

            var temp = _context.Users
                           .Where(x => x.username == userModel.username
                           && x.email == userModel.email)
                           .FirstOrDefault();

            if (temp == null)
            {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userModel.password);
                userModel.password = hashedPassword;
                _context.Users.Add(userModel);
                await _context.SaveChangesAsync();

            }
            else
                userModel = temp;
            return CreatedAtAction("GetUserModel", new { id = userModel.user_id }, userModel);
        }
        [HttpPost("Login")]
        public async Task<ActionResult<UserModel>> LoginUser(UserModel data)
        {
            // Find user by email
            var userModel = await _context.Users.FirstOrDefaultAsync(u => u.email == data.email);

            if (userModel == null)
            {
                return NotFound();
            }

            // Validate password
            if (!BCrypt.Net.BCrypt.Verify(data.password, userModel.password))
            {
                return StatusCode(401, "Invalid password");
            }

            // Return user model
            return Ok(new
            {
                userId = userModel.user_id,
                username = userModel.username,
                email = userModel.email,
                location = userModel.location,
            }
            );
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserModel(int id)
        {
            var userModel = await _context.Users.FindAsync(id);
            if (userModel == null)
            {
                return NotFound();
            }

            _context.Users.Remove(userModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserModelExists(int id)
        {
            return _context.Users.Any(e => e.user_id == id);
        }
    }
}
