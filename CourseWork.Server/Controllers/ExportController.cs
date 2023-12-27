using Microsoft.AspNetCore.Mvc;

namespace CourseWork.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportController : ControllerBase
    {
        private readonly CsvExporter _exporter;

        public ExportController(DefaultDbContext context)
        {
            _exporter = new CsvExporter(context);
        }

        [HttpPost("Students")]
        public void PostStudents([FromBody] string value)
        {
            _exporter.ExportStudents(value + "/Students.csv");
        }

        [HttpPost("Teachers")]
        public void PostTeachers([FromBody] string value)
        {
            _exporter.ExportTeachers(value + "/Teachers.csv");
        }
    }
}
