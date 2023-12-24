using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class Input
{
    public Guid TicketId { get; set; }

    public string Data { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;
}
