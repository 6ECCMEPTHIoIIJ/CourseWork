using System.Globalization;
using System.IO;
using System.Text;
using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.Configuration.Attributes;
using Microsoft.EntityFrameworkCore;

namespace CourseWork.Server
{
    public class CsvExporter
    {
        private readonly DefaultDbContext _сontext;
        private readonly char _columnSeparator = ';'; // Задайте нужный разделитель

        public CsvExporter(DefaultDbContext dbContext)
        {
            _сontext = dbContext;
        }

        private void ExportToCsv<T>(string filePath) where T : class
        {
            var data = _сontext.Set<T>().ToList();

            using (var writer = new StreamWriter(filePath,false, Encoding.UTF8))
            {
                // Записываем заголовки
                var headers = string.Join(_columnSeparator, typeof(T).GetProperties().Select(p => p.Name));
                writer.WriteLine(headers);

                // Записываем данные
                foreach (var item in data)
                {
                    var values = string.Join(_columnSeparator, typeof(T).GetProperties().Select(p => FormatCsvCell(p.GetValue(item))));
                    writer.WriteLine(values);
                }
            }
        }

        private string FormatCsvCell(object value)
        {
            // Если значение содержит разделитель, обернем его в кавычки
            var stringValue = value?.ToString() ?? "";
            if (stringValue.Contains(_columnSeparator))
            {
                return $"\"{stringValue}\"";
            }

            return stringValue;
        }

        public void ExportStudents()
        {
            // Путь для сохранения CSV файла
            string csvFilePath = "G:\\VS repos\\CourseWork\\CourseWork.Server\\ExportCSV\\Students.csv";

                try
                {
                    ExportToCsv<Student>(csvFilePath);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error exporting data to CSV: {ex.Message}");
                }

            Console.WriteLine("Data exported to CSV file successfully.");
        }

        public void ExportTeachers()
        {
            // Путь для сохранения CSV файла
            string csvFilePath = "G:\\VS repos\\CourseWork\\CourseWork.Server\\ExportCSV\\Teachers.csv";

            try
            {
                ExportToCsv<Student>(csvFilePath);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error exporting data to CSV: {ex.Message}");
            }

            Console.WriteLine("Data exported to CSV file successfully.");
        }
    }
}