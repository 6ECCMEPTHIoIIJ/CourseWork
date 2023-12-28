using System.Diagnostics;

namespace CourseWork.Server
{
    public class PostgresBackup
    {
        private readonly string connectionStr;

        public PostgresBackup()
        {
            connectionStr = DatabaseConfig.GetConnectionString();
        }

        public void CreateBackup(string outputPath)
        {
            try
            {
                //string pgDumpCommand = $"-h 185.154.195.121 -U gen_user -d default_db -Fc -f {outputPath}";

                using (var db = new DefaultDbContext())
                {
                    // Создание бэкапа с помощью pg_dump
                    var processInfo = new ProcessStartInfo("D:\\PostgreSQL\\15\\bin\\pg_dump.exe")
                    {
                        Arguments = $"-U {connectionStr} > {outputPath}",
                        RedirectStandardOutput = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    };

                    using (var process = Process.Start(processInfo))
                    {
                        process.WaitForExit();
                    }

                    Console.WriteLine($"Backup completed. File saved to {outputPath}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during backup: {ex.Message}");
            }
        }
    }
}
