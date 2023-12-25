using System;
using System.Collections.Generic;

namespace CourseWork.Server;

public partial class Student
{
    public string PassbookNumber { get; set; } = null!;

    public string Firstname { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public string Patronymic { get; set; } = null!;

    public string StudentGroup { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<PassedTicket> PassedTickets { get; set; } = new List<PassedTicket>();
}
