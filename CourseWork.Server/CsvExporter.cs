using System.Text;

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
            try
            {
                var data = _сontext.Set<T>().ToList();

                using var writer = new StreamWriter(filePath, false, Encoding.UTF8);

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
            catch (Exception ex)
            {
                Console.WriteLine($"Error exporting data to CSV: {ex.Message}");
            }

            Console.WriteLine("Data exported to CSV file successfully.");
        }

        private string FormatCsvCell(object? value)
        {
            // Если значение содержит разделитель, обернем его в кавычки
            var stringValue = value?.ToString() ?? "";
            if (stringValue.Contains(_columnSeparator))
            {
                return $"\"{stringValue}\"";
            }

            return stringValue;
        }

        public void ExportStudents(string filePath)
        {
            ExportToCsv<Student>(filePath);
        }

        public void ExportTeachers(string filePath)
        {
            ExportToCsv<Teacher>(filePath);
        }

        public void ExportSingles(string filePath)
        {
            ExportToCsv<Single>(filePath);
        }

        public void ExportInputs(string filePath)
        {
            ExportToCsv<Input>(filePath);
        }

        public void ExportMultiples(string filePath)
        {
            ExportToCsv<Multiple>(filePath);
        }

        public void ExportPassedInputs(string filePath)
        {
            ExportToCsv<PassedInput>(filePath);
        }

        public void ExportPassedMultiples(string filePath)
        {
            ExportToCsv<PassedMultiple>(filePath);
        }

        public void ExportPassedSingles(string filePath)
        {
            ExportToCsv<PassedSingle>(filePath);
        }

        public void ExportPassedTickets(string filePath)
        {
            ExportToCsv<PassedTicket>(filePath);
        }

        public void ExportTests(string filePath)
        {
            ExportToCsv<Test>(filePath);
        }

        public void ExportTickets(string filePath)
        {
            ExportToCsv<Ticket>(filePath);
        }

        public void ExportAll(string directoryPath)
        {
            try
            {
                ExportStudents(Path.Combine(directoryPath, "Students.csv"));
                ExportTeachers(Path.Combine(directoryPath, "Teachers.csv"));
                ExportSingles(Path.Combine(directoryPath, "Singles.csv"));
                ExportInputs(Path.Combine(directoryPath, "Inputs.csv"));
                ExportMultiples(Path.Combine(directoryPath, "Multiples.csv"));
                ExportPassedInputs(Path.Combine(directoryPath, "PassedInputs.csv"));
                ExportPassedMultiples(Path.Combine(directoryPath, "PassedMultiples.csv"));
                ExportPassedSingles(Path.Combine(directoryPath, "PassedSingles.csv"));
                ExportPassedTickets(Path.Combine(directoryPath, "PassedTickets.csv"));
                ExportTests(Path.Combine(directoryPath, "Tests.csv"));
                ExportTickets(Path.Combine(directoryPath, "Tickets.csv"));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error exporting all data to CSV: {ex.Message}");
            }

            Console.WriteLine("All data exported to CSV files successfully.");
        }
    }
}