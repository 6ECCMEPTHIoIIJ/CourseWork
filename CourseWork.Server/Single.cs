using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class Single
{
    public Guid Id { get; set; }

    public int Data { get; set; }

    public Guid? TicketId { get; set; }

    public virtual Ticket? Ticket { get; set; }
}
