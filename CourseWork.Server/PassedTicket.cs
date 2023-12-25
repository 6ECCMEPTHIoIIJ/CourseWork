using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class PassedTicket
{
    public Guid Id { get; set; }

    public Guid? TickedId { get; set; }

    public string? StudentId { get; set; }

    public virtual PassedInput? PassedInput { get; set; }

    public virtual ICollection<PassedMultiple> PassedMultiples { get; set; } = new List<PassedMultiple>();

    public virtual PassedSingle? PassedSingle { get; set; }

    public virtual Student? Student { get; set; }

    public virtual Ticket? Ticked { get; set; }
}
