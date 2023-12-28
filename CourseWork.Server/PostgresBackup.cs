using System.Diagnostics;
using System;
using System.Data;
using YandexDisk.Client.Http;
using YandexDisk.Client;
using YandexDisk.Client.Clients;

namespace CourseWork.Server
{
    public class PostgresBackup
    {
        private readonly string connectionStr;

        string accessToken = "y0_AgAAAABUzwr2AAsQFgAAAAD2PZhK3pTEhMMST_yui2-7m9PPdJXDjyM";

        string filePath = "G:\\VS repos\\CourseWork\\CourseWork.Server\\Data\\text.txt";

        string destinationPath = "client/disk/DatabaseBackup/text.txt";

        public PostgresBackup()
        {
            connectionStr = DatabaseConfig.GetDumpString();
        }

        public async void CreateBackup(string outputPath)
        {
            try
            {
                DateTime dt = new DateTime();
                string dtNow = $"{dt.Day}-{dt.Month}-{dt.Year}_{dt.Hour}:{dt.Minute}_dump.sql";
                

                using var db = new DefaultDbContext();
                // Создание бэкапа с помощью pg_dump
                using var process = Process.Start("pg_dump.exe", $"{connectionStr} -f {dtNow}");
                process.WaitForExit();

                //Console.WriteLine($"Backup completed. File saved to {outputPath}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during backup: {ex.Message}");
            }
        }

        static async Task UploadFileToYandexDisk(string accessToken, string filePath, string destinationPath)
        {
            try
            {
                if (!File.Exists(filePath))
                {
                    Console.WriteLine($"Файл {filePath} не существует.");
                    return;
                }

                IDiskApi diskApi = new DiskHttpApi(accessToken);
                await diskApi.Files.UploadFileAsync(
                    path: destinationPath,
                    overwrite: true,
                    localFile: filePath,
                    cancellationToken: CancellationToken.None);

                Console.WriteLine("Файл успешно загружен на Яндекс.Диск.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }
    }
}
