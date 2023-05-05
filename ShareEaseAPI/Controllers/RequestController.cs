using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShareEaseAPI.Data;
using ShareEaseAPI.Dto;
using ShareEaseAPI.Handler;
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
                    OwnerId = request.resource.Users.user_id,
                    Borrower = request.Borrower,
                    borrowerId = request.Borrower.user_id,
                    Resource = request.resource,
                    status = request.status,
                    date = request.date,
                    Owner = request.resource.Users,
                    resourceId = request.ResourceId
                };
                reqList.Add(req);
            }
            return Ok(reqList);

        }


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



        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequestModel(int id, RequestModel requestModel)
        {
            if (id != requestModel.id)
            {
                return BadRequest();
            }
            if (requestModel.status == "approved")
            {
                ResourceModel resource = await _context.Resource.FindAsync(requestModel.resource.id);
                resource.availability = "borrowed";
                string message = "A new resource is available:\n"
                      + $"Name: {resource.name}\n"
                      + $"Description: {resource.description}\n"
                      + $"Location: {resource.location}\n";

                SendEmail.send( message,"Product Has Been Approved", requestModel.Borrower.email);
                _context.Entry(resource).State = EntityState.Modified;
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



        [HttpPost]
        public async Task<ActionResult<RequestModel>> PostRequestModel(PostRequestDto requestModel)
        {
            RequestModel temp = new RequestModel()
            {
                BorrowerId = requestModel.BorrowerId,
                ResourceId = requestModel.ResourceId,
                OwnerId = 1,
                status = "Pending",
                date = requestModel.date
            };
            _context.Request.Add(temp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRequestModel", new { id = temp.id }, temp);
        }


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
