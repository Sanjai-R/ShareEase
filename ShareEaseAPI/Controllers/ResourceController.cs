using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShareEaseAPI.Data;
using ShareEaseAPI.Models;
using static ShareEaseAPI.Dto.ResourceDto;

namespace ShareEaseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ResourceController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Resource
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResourceModel>>> GetResource()
        {
            return await _context.Resource.Include(r => r.Category).ToListAsync();
        }

        // GET: api/Resource/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResourceModel>> GetResourceModel(int id)
        {
            var resourceModel = await _context.Resource.FindAsync(id);

            if (resourceModel == null)
            {
                return NotFound();
            }

            return resourceModel;
        }

        // PUT: api/Resource/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResourceModel(int id, ResourceModel resourceModel)
        {
            if (id != resourceModel.id)
            {
                return BadRequest();
            }

            _context.Entry(resourceModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceModelExists(id))
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

        // POST: api/Resource
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ResourceModel>> PostResourceModel(PostResourceDto resourceModel)
        {
            ResourceModel res = new ResourceModel()
            {
                name = resourceModel.name,
                description = resourceModel.description,
                img = resourceModel.img,
                availability = "Available",
                location = resourceModel.location,
                categoryId = resourceModel.categoryId,
                UserId = resourceModel.userId
            };
            _context.Resource.Add(res);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResourceModel", new { id = resourceModel.id }, resourceModel);
        }

        // DELETE: api/Resource/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResourceModel(int id)
        {
            var resourceModel = await _context.Resource.FindAsync(id);
            if (resourceModel == null)
            {
                return NotFound();
            }

            _context.Resource.Remove(resourceModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResourceModelExists(int id)
        {
            return _context.Resource.Any(e => e.id == id);
        }
    }
}
