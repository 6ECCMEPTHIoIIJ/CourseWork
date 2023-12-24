using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class MultiplesPassed
{
    public Guid Id { get; set; }

    public Guid PassedTicketId { get; set; }

    public int Data { get; set; }

    public virtual PassedTicket PassedTicket { get; set; } = null!;
}
