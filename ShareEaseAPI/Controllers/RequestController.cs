using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShareEaseAPI.Data;
using ShareEaseAPI.Dto;
using ShareEaseAPI.Models;

namespace ShareEaseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public RequestController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Request
        [HttpGet]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetRequest()
        {
            var temp = await _context.Request.Include(j => j.Borrower).Include(j => j.resource).ThenInclude(j => j.Users)
                .ToListAsync();
            List<dynamic> reqList = new List<dynamic>();
            foreach (RequestModel request in temp)
            {
                var req = new
                {
                    id = request.id,
                    Borrower = request.Borrower,
                    ResourceName = request.resource.name,
                    status = request.status,
                    date = request.date,
                    OwnerName = request.resource.Users
                };
                reqList.Add(req);
            }
            return Ok(reqList);

        }

        // GET: api/Request/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RequestModel>> GetRequestModel(int id)
        {
            var requestModel = await _context.Request.FindAsync(id);

            if (requestModel == null)
            {
                return NotFound();
            }

            return requestModel;
        }

        // PUT: api/Request/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequestModel(int id, RequestModel requestModel)
        {
            if (id != requestModel.id)
            {
                return BadRequest();
            }

            _context.Entry(requestModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestModelExists(id))
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

        // POST: api/Request
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RequestModel>> PostRequestModel(PostRequestDto requestModel)
        {
            RequestModel temp = new RequestModel()
            {
                BorrowerId = requestModel.BorrowerId,
                ResourceId = requestModel.ResourceId,
                status = "Pending",
                date = requestModel.date
            };
            _context.Request.Add(temp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRequestModel", new { id = temp.id }, temp);
        }

        // DELETE: api/Request/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequestModel(int id)
        {
            var requestModel = await _context.Request.FindAsync(id);
            if (requestModel == null)
            {
                return NotFound();
            }

            _context.Request.Remove(requestModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RequestModelExists(int id)
        {
            return _context.Request.Any(e => e.id == id);
        }
    }
}
