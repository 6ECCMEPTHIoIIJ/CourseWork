using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class Input
{
    public Guid Id { get; set; }

    public string Data { get; set; } = null!;

    public Guid? TicketId { get; set; }

    public virtual Ticket? Ticket { get; set; }
}
