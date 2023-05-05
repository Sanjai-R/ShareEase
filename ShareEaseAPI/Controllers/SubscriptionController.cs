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
    public class SubscriptionController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public SubscriptionController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Subscription
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubscriptionModel>>> GetSubscription()
        {
            return await _context.Subscription.ToListAsync();
        }

        // GET: api/Subscription/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubscriptionModel>> GetSubscriptionModel(int id)
        {
            var subscriptionModel = await _context.Subscription.FindAsync(id);

            if (subscriptionModel == null)
            {
                return NotFound();
            }

            return subscriptionModel;
        }
        [HttpGet("user/{id}")]
        public async Task<ActionResult<dynamic>> GetSubscriptionModelByUser(int id)
            {
            var subscriptionModel = await _context.Subscription.Where(x => x.userId == id).Include(x=>x.Category).ToListAsync();

            if (subscriptionModel == null)
                {
                return NotFound();
                }

            return subscriptionModel;
            }
        // PUT: api/Subscription/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubscriptionModel(int id, SubscriptionModel subscriptionModel)
        {
            if (id != subscriptionModel.subId)
            {
                return BadRequest();
            }

            _context.Entry(subscriptionModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionModelExists(id))
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

        // POST: api/Subscription
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubscriptionModel>> PostSubscriptionModel(SubscriptionDto subscriptionModel)
        {
            SubscriptionModel sub = new SubscriptionModel()
                {
                categoryId = subscriptionModel.categoryId,
                userId = subscriptionModel.userId,
                };
            _context.Subscription.Add(sub);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubscriptionModel", new { id = sub.subId }, subscriptionModel);
        }

        // DELETE: api/Subscription/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscriptionModel(int id)
        {
            var subscriptionModel = await _context.Subscription.FindAsync(id);
            if (subscriptionModel == null)
            {
                return NotFound();
            }

            _context.Subscription.Remove(subscriptionModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubscriptionModelExists(int id)
        {
            return _context.Subscription.Any(e => e.subId == id);
        }
    }
}
