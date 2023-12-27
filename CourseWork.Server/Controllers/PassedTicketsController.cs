using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CourseWork.Server;

namespace CourseWork.Server.Controllers
{
    public class PassedTicketsController : Controller
    {
        private readonly DefaultDbContext _context;

        public PassedTicketsController(DefaultDbContext context)
        {
            _context = context;
        }

        // GET: PassedTickets
        public async Task<IActionResult> Index()
        {
            var defaultDbContext = _context.PassedTickets.Include(p => p.Student).Include(p => p.Ticked);
            return View(await defaultDbContext.ToListAsync());
        }

        // GET: PassedTickets/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var passedTicket = await _context.PassedTickets
                .Include(p => p.Student)
                .Include(p => p.Ticked)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (passedTicket == null)
            {
                return NotFound();
            }

            return View(passedTicket);
        }

        // GET: PassedTickets/Create
        public IActionResult Create()
        {
            ViewData["StudentId"] = new SelectList(_context.Students, "PassbookNumber", "PassbookNumber");
            ViewData["TickedId"] = new SelectList(_context.Tickets, "Id", "Id");
            return View();
        }

        // POST: PassedTickets/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,TickedId,StudentId")] PassedTicket passedTicket)
        {
            if (ModelState.IsValid)
            {
                passedTicket.Id = Guid.NewGuid();
                _context.Add(passedTicket);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["StudentId"] = new SelectList(_context.Students, "PassbookNumber", "PassbookNumber", passedTicket.StudentId);
            ViewData["TickedId"] = new SelectList(_context.Tickets, "Id", "Id", passedTicket.TickedId);
            return View(passedTicket);
        }

        // GET: PassedTickets/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var passedTicket = await _context.PassedTickets.FindAsync(id);
            if (passedTicket == null)
            {
                return NotFound();
            }
            ViewData["StudentId"] = new SelectList(_context.Students, "PassbookNumber", "PassbookNumber", passedTicket.StudentId);
            ViewData["TickedId"] = new SelectList(_context.Tickets, "Id", "Id", passedTicket.TickedId);
            return View(passedTicket);
        }

        // POST: PassedTickets/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,TickedId,StudentId")] PassedTicket passedTicket)
        {
            if (id != passedTicket.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(passedTicket);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PassedTicketExists(passedTicket.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["StudentId"] = new SelectList(_context.Students, "PassbookNumber", "PassbookNumber", passedTicket.StudentId);
            ViewData["TickedId"] = new SelectList(_context.Tickets, "Id", "Id", passedTicket.TickedId);
            return View(passedTicket);
        }

        // GET: PassedTickets/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var passedTicket = await _context.PassedTickets
                .Include(p => p.Student)
                .Include(p => p.Ticked)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (passedTicket == null)
            {
                return NotFound();
            }

            return View(passedTicket);
        }

        // POST: PassedTickets/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var passedTicket = await _context.PassedTickets.FindAsync(id);
            if (passedTicket != null)
            {
                _context.PassedTickets.Remove(passedTicket);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PassedTicketExists(Guid id)
        {
            return _context.PassedTickets.Any(e => e.Id == id);
        }
    }
}
