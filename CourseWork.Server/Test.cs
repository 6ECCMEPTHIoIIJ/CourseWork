using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class Test
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public Guid TeacherId { get; set; }

    public virtual Teacher Teacher { get; set; } = null!;

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
