﻿using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class InputsPassed
{
    public Guid PassedTicketId { get; set; }

    public string Data { get; set; } = null!;

    public bool? Correct { get; set; }

    public virtual PassedTicket PassedTicket { get; set; } = null!;
}
