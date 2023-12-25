using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseWork.Server;

namespace CourseWork.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestsController : ControllerBase
    {
        private readonly DefaultDbContext _context;

        public TestsController(DefaultDbContext context)
        {
            _context = context;
        }

        // GET: api/Tests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Test>>> GetTests()
        {
            return await _context.Tests.ToListAsync();
        }

        // GET: api/Tests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Test>> GetTest(Guid id)
        {
            var test = await _context.Tests.FindAsync(id);

            if (test == null)
            {
                return NotFound();
            }

            return test;
        }

        // PUT: api/Tests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTest(Guid id, Test test)
        {
            if (id != test.Id)
            {
                return BadRequest();
            }

            _context.Entry(test).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TestExists(id))
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

        // POST: api/Tests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Test>> PostTest(Test test)
        {
            // Проверьте, не имеет ли какой-либо связанный с ним билет Тип не равен 0, 1 или 2
            if (test.Tickets.Any(ticket => ticket.Type < 0 || ticket.Type > 2))
            {
                return BadRequest("Invalid Type in associated Ticket(s). Type must be 0, 1, or 2.");
            }

            if (test.Tickets.Any(ticket => ticket.Cost == 0))
            {
                return BadRequest("Cost in associated Ticket(s) cannot be 0.");
            }

            if (test.Tickets == null || !test.Tickets.Any())
            {
                return BadRequest("The Tickets collection cannot be empty.");
            }

            // Проверьте, если Type равен 0, то Single не должен быть -1
            //if (test.Tickets.Any(ticket => ticket.Type == 0 && ticket.Single != -1))
            //{
            //    return BadRequest("If Type is 0, then Single should not be -1.");
            //}

            _context.Tests.Add(test);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTest", new { id = test.Id }, test);
        }

        // DELETE: api/Tests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTest(Guid id)
        {
            var test = await _context.Tests.FindAsync(id);
            if (test == null)
            {
                return NotFound();
            }

            _context.Tests.Remove(test);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TestExists(Guid id)
        {
            return _context.Tests.Any(e => e.Id == id);
        }
    }
}
