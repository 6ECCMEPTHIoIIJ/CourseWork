using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class PassedTicket
{
    public Guid Id { get; set; }

    public Guid TicketId { get; set; }

    public string StudentId { get; set; } = null!;

    public virtual InputsPassed? InputsPassed { get; set; }

    public virtual ICollection<MultiplesPassed> MultiplesPasseds { get; set; } = new List<MultiplesPassed>();

    public virtual SinglesPassed? SinglesPassed { get; set; }

    public virtual Student Student { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;
}
