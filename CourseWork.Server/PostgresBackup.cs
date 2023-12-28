using System.Diagnostics;

namespace CourseWork.Server
{
    public class PostgresBackup
    {
        private readonly string connectionStr;

        public PostgresBackup()
        {
            connectionStr = DatabaseConfig.GetDumpString();
        }

        public async void CreateBackup(string outputPath)
        {
            try
            {
                //string pgDumpCommand = $"-h 185.154.195.121 -U gen_user -d default_db -Fc -f {outputPath}";

                using var db = new DefaultDbContext();
                // Создание бэкапа с помощью pg_dump
                using var process = Process.Start("pg_dump.exe", $"{connectionStr} -f dump.sql");
                process.WaitForExit();

                //Console.WriteLine($"Backup completed. File saved to {outputPath}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during backup: {ex.Message}");
            }
        }
    }
}
