using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseWork.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("Admin")]

    public class ExportController : ControllerBase
    {
        private readonly CsvExporter _csvExporter;
        private readonly XmlExporter _xmlExporter;

        public ExportController(DefaultDbContext context)
        {
            _csvExporter = new CsvExporter(context);
            _xmlExporter = new XmlExporter(context);
        }

        [HttpPost("Csv/Students")]
        public void PostStudentsCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportStudents(Path.Combine(pathDir, "Students.csv"));
        }

        [HttpPost("Csv/Teachers")]
        public void PostTeachersCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportTeachers(Path.Combine(pathDir, "Teachers.csv"));
        }

        [HttpPost("Csv/Singles")]
        public void PostSinglesCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportSingles(Path.Combine(pathDir, "Singles.csv"));
        }
        [HttpPost("Csv/Inputs")]
        public void PostInputsCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportInputs(Path.Combine(pathDir, "Inputs.csv"));
        }

        [HttpPost("Csv/Multiples")]
        public void PostMultiplesCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportMultiples(Path.Combine(pathDir, "Multiples.csv"));
        }
        [HttpPost("Csv/PassedInputs")]
        public void PostPassedInputsCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportPassedInputs(Path.Combine(pathDir, "PassedInputs.csv"));
        }

        [HttpPost("Csv/PassedMultiples")]
        public void PostPassedMultiplesCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportPassedMultiples(Path.Combine(pathDir, "PassedMultiples.csv"));
        }
        [HttpPost("Csv/PassedSingles")]
        public void PostPassedSinglesCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportPassedSingles(Path.Combine(pathDir, "PassedSingles.csv"));
        }

        [HttpPost("Csv/PassedTickets")]
        public void PostPassedTicketsCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportPassedTickets(Path.Combine(pathDir, "PassedTickets.csv"));
        }

        [HttpPost("Csv/Tickets")]
        public void PostTicketsCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportTickets(Path.Combine(pathDir, "Tickets.csv"));
        }

        [HttpPost("Csv/Tests")]
        public void PostTestsCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportTests(Path.Combine(pathDir, "Tests.csv"));
        }

        [HttpPost("Csv")]
        public void PostAllCsv([FromBody] string pathDir)
        {
            _csvExporter.ExportAll(pathDir);
        }

        [HttpPost("Xml/Students")]
        public void PostStudentsXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportStudents(Path.Combine(pathDir, "Students.xml"));
        }

        [HttpPost("Xml/Teachers")]
        public void PostTeachersXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportTeachers(Path.Combine(pathDir, "Teachers.xml"));
        }

        [HttpPost("Xml/Singles")]
        public void PostSinglesXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportSingles(Path.Combine(pathDir, "Singles.xml"));
        }
        [HttpPost("Xml/Inputs")]
        public void PostInputsXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportInputs(Path.Combine(pathDir, "Inputs.xml"));
        }

        [HttpPost("Xml/Multiples")]
        public void PostMultiplesXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportMultiples(Path.Combine(pathDir, "Multiples.xml"));
        }
        [HttpPost("Xml/PassedInputs")]
        public void PostPassedInputsXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportPassedInputs(Path.Combine(pathDir, "PassedInputs.xml"));
        }

        [HttpPost("Xml/PassedMultiples")]
        public void PostPassedMultiplesXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportPassedMultiples(Path.Combine(pathDir, "PassedMultiples.xml"));
        }
        [HttpPost("Xml/PassedSingles")]
        public void PostPassedSinglesXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportPassedSingles(Path.Combine(pathDir, "PassedSingles.xml"));
        }

        [HttpPost("Xml/PassedTickets")]
        public void PostPassedTicketsXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportPassedTickets(Path.Combine(pathDir, "PassedTickets.xml"));
        }

        [HttpPost("Xml/Tickets")]
        public void PostTicketsXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportTickets(Path.Combine(pathDir, "Tickets.xml"));
        }

        [HttpPost("Xml/Tests")]
        public void PostTestsXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportTests(Path.Combine(pathDir, "Tests.xml"));
        }

        [HttpPost("Xml")]
        public void PostAllXml([FromBody] string pathDir)
        {
            _xmlExporter.ExportAll(pathDir);
        }
    }
}
