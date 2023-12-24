using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class SinglesPassed
{
    public Guid PassedTicketId { get; set; }

    public int Data { get; set; }

    public virtual PassedTicket PassedTicket { get; set; } = null!;
}
