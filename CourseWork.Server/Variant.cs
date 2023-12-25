namespace CourseWork.Server;

public partial class Variant
{
    public Guid Id { get; set; }

    public Guid TicketId { get; set; }

    public string Data { get; set; } = null!;

    public virtual Ticket Ticket { get; set; } = null!;
}
