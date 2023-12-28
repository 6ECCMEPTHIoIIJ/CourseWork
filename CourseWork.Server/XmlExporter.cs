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

        public void ExportToXml<T>(string filePath) where T : class
        {
            try
            {
                var data = _context.Set<T>().ToList();

                var xmlDocument = new XDocument(
                    new XElement(typeof(T).Name + "s",
                        data.Select(item =>
                            new XElement(typeof(T).Name,
                                item.GetType().GetProperties().Select(property =>
                                    new XElement(property.Name, property.GetValue(item))
                                )
                            )
                        )
                    )
                );

                using (var writer = new StreamWriter(filePath))
                {
                    xmlDocument.Save(writer);
                }


            }
            catch (Exception ex) 
            {
                Console.WriteLine($"Error exporting data to CSV: {ex.Message}");
            }
            
            Console.WriteLine("Data exported to CSV file successfully.");
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



        public void ExportTeachers(string xmlFilePath)
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
                ExportStudents(Path.Combine(directoryPath, "Students.xml"));
                ExportTeachers(Path.Combine(directoryPath, "Teachers.xml"));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error exporting all data to XML: {ex.Message}");
            }

            Console.WriteLine("All data exported to XML files successfully.");
        }
    }
}
