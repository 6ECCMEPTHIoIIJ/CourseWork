using Microsoft.EntityFrameworkCore;

namespace CourseWork.Server.libs.utils
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    }
}
