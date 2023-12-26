using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseWork.Server;
using System.Text;

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
            var tests = await _context.Tests.Include(t => t.Tickets).ThenInclude(t => t.Variants).ToListAsync();
            var test = tests.Find(t => t.Id == id);

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
            var errorMsgBuilder = new StringBuilder();
            bool hasError = false;
            var tickets = (List<Ticket>)test.Tickets;

            if (string.IsNullOrWhiteSpace(test.Name))
            {
                errorMsgBuilder.AppendLine($"Название теста не задано;");
                hasError = true;
            }
            if (tickets == null || tickets.Count == 0)
            {
                errorMsgBuilder.AppendLine($"Тест не содержит ни одного билета;");
                hasError = true;
            }
            else
            {
                for (int i = 0; i < tickets.Count; ++i)
                {
                    int ticketId = i + 1;
                    var ticket = tickets[i];
                    if (ticket.Type < 0 || ticket.Type > 2)
                    {
                        errorMsgBuilder.AppendLine($"Билет №{ticketId}: не указан тип вопроса;");
                        hasError = true;
                    }
                    if (ticket.Cost == 0)
                    {
                        errorMsgBuilder.AppendLine($"Билет №{ticketId}: не указана стоимость вопроса;");
                        hasError = true;
                    }
                    if (string.IsNullOrWhiteSpace(ticket.Question))
                    {
                        errorMsgBuilder.AppendLine($"Билет №{ticketId}: не указан текст вопроса;");
                        hasError = true;
                    }
                    if (ticket.Type == 1 && (ticket.Variants == null || ticket.Variants.Count == 0))
                    {
                        errorMsgBuilder.AppendLine($"Билет №{ticketId}: не указано ни одного варианта ответа;");
                        hasError = true;
                    }
                    else if (ticket.Type == 0 && (ticket.Variants == null || ticket.Variants.Count <= 1))
                    {
                        errorMsgBuilder.AppendLine($"Билет №{ticketId}: слишком мало вариантов ответа;");
                        hasError = true;
                    }
                    if (ticket.Type == 0 && (ticket.Single == null || ticket.Single.Data == -1))
                    {
                        errorMsgBuilder.AppendLine($"Билет №{ticketId}: не указан правильный варинат ответа;");
                        hasError = true;
                    }
                    if (ticket.Variants != null && ticket.Variants.Any(v => string.IsNullOrWhiteSpace(v.Data)))
                    {
                        errorMsgBuilder.AppendLine($"Билет №{ticketId}: один из вариантов ответа не содержит текст;");
                        hasError = true;
                    }
                }
            }

            if (hasError)
                return BadRequest(errorMsgBuilder.ToString());

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
