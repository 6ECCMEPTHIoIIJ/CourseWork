using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using System.Xml.Serialization;
using Microsoft.EntityFrameworkCore;

namespace CourseWork.Server
{
    public class XmlExporter
    {
        private readonly DefaultDbContext _context;

        public XmlExporter(DefaultDbContext context)
        {
            _context = context;
        }

        public void ExportToXml<T>(string xmlFilePath) where T : class
        {
            var data = _context.Set<T>().ToList();

            try
            {
                using (var writer = new StreamWriter(xmlFilePath, false, Encoding.UTF8))
                {
                    var serializer = new XmlSerializer(typeof(List<T>));
                    serializer.Serialize(writer, data);
                }

                Console.WriteLine($"Data exported to XML file ({typeof(T).Name}.xml) successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error exporting data to XML ({typeof(T).Name}.xml): {ex.Message}");
            }
        }

        public void ExportSingles(string xmlFilePath)
        {
            ExportToXml<Single>(xmlFilePath);
        }

        public void ExportInputs(string xmlFilePath)
        {
            ExportToXml<Input>(xmlFilePath);
        }

        public void ExportMultiples(string xmlFilePath)
        {
            ExportToXml<Multiple>(xmlFilePath);
        }

        public void ExportPassedInputs(string xmlFilePath)
        {
            ExportToXml<PassedInput>(xmlFilePath);
        }

        public void ExportPassedMultiples(string xmlFilePath)
        {
            ExportToXml<PassedMultiple>(xmlFilePath);
        }

        public void ExportPassedSingles(string xmlFilePath)
        {
            ExportToXml<PassedSingle>(xmlFilePath);
        }

        public void ExportPassedTickets(string xmlFilePath)
        {
            ExportToXml<PassedTicket>(xmlFilePath);
        }

        public void ExportTests(string xmlFilePath)
        {
            ExportToXml<Test>(xmlFilePath);
        }

        public void ExportTickets(string xmlFilePath)
        {
            ExportToXml<Ticket>(xmlFilePath);
        }



        public void ExportTeathers(string xmlFilePath)
        {
            //string xmlFilePath = "G:\\VS repos\\CourseWork\\CourseWork.Server\\ExportXML\\Students.xml";
            ExportToXml<Teacher>(xmlFilePath);
        }


        public void ExportStudents(string xmlFilePath)
        {
            //string xmlFilePath = "G:\\VS repos\\CourseWork\\CourseWork.Server\\ExportXML\\Students.xml";
            ExportToXml<Student>(xmlFilePath);
        }

        public void ExportAll(string directoryPath)
        {
            try
            {
                ExportSingles(Path.Combine(directoryPath, "Singles.xml"));
                ExportInputs(Path.Combine(directoryPath, "Inputs.xml"));
                ExportMultiples(Path.Combine(directoryPath, "Multiples.xml"));
                ExportPassedInputs(Path.Combine(directoryPath, "PassedInputs.xml"));
                ExportPassedMultiples(Path.Combine(directoryPath, "PassedMultiples.xml"));
                ExportPassedSingles(Path.Combine(directoryPath, "PassedSingles.xml"));
                ExportPassedTickets(Path.Combine(directoryPath, "PassedTickets.xml"));
                ExportTests(Path.Combine(directoryPath, "Tests.xml"));
                ExportTickets(Path.Combine(directoryPath, "Tickets.xml"));
                ExportStudents(Path.Combine(directoryPath, "Teachers.xml"));
                ExportTeathers(Path.Combine(directoryPath, "Students.xml"));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error exporting all data to XML: {ex.Message}");
            }

            Console.WriteLine("All data exported to XML files successfully.");
        }
    }
}
