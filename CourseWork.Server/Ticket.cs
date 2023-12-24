using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class Ticket
{
    public Guid Id { get; set; }

    public string Question { get; set; } = null!;

    public string? Description { get; set; }

    public int Cost { get; set; }

    public Guid TestId { get; set; }

    public virtual Input? Input { get; set; }

    public virtual ICollection<Multiple> Multiples { get; set; } = new List<Multiple>();

    public virtual ICollection<PassedTicket> PassedTickets { get; set; } = new List<PassedTicket>();

    public virtual Single? Single { get; set; }

    public virtual Test Test { get; set; } = null!;

    public virtual ICollection<Variant> Variants { get; set; } = new List<Variant>();
}
