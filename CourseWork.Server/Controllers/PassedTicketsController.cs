using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseWork.Server;
using Microsoft.AspNetCore.Authorization;

namespace CourseWork.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PassedTicketsController : ControllerBase
    {
        private readonly DefaultDbContext _context;

        public PassedTicketsController(DefaultDbContext context)
        {
            _context = context;
        }

        // GET: api/PassedTickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PassedTicket>>> GetPassedTickets()
        {
            return await _context.PassedTickets
                .Include(p =>p.PassedInput)
                .Include(p =>p.PassedSingle)
                .Include(p =>p.PassedMultiples)
                .Include(p => p.Student)
                .Include(p => p.Ticked)
                .ToListAsync();
        }

        // GET: api/PassedTickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PassedTicket>> GetPassedTicket(Guid id)
        {
            var passedTicket = await _context.PassedTickets
                .Include(p => p.PassedInput)
                .Include(p => p.PassedSingle)
                .Include(p => p.PassedMultiples)
                .Include(p => p.Student)
                .Include(p => p.Ticked)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (passedTicket == null)
            {
                return NotFound();
            }

            return passedTicket;
        }

        // PUT: api/PassedTickets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPassedTicket(Guid id, PassedTicket passedTicket)
        {
            if (id != passedTicket.Id)
            {
                return BadRequest();
            }

            _context.Entry(passedTicket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassedTicketExists(id))
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

        // POST: api/PassedTickets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PassedTicket>> PostPassedTicket(PassedTicket passedTicket)
        {
            _context.PassedTickets.Add(passedTicket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPassedTicket", new { id = passedTicket.Id }, passedTicket);
        }

        [HttpPost("Many")]
        public async Task<ActionResult<PassedTicket>> PostPassedTickets(ICollection<PassedTicket> passedTickets)
        {
            _context.PassedTickets.AddRange(passedTickets);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPassedTickets", passedTickets);
        }

        // DELETE: api/PassedTickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassedTicket(Guid id)
        {
            var passedTicket = await _context.PassedTickets.FindAsync(id);
            if (passedTicket == null)
            {
                return NotFound();
            }

            _context.PassedTickets.Remove(passedTicket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PassedTicketExists(Guid id)
        {
            return _context.PassedTickets.Any(e => e.Id == id);
        }
    }
}
