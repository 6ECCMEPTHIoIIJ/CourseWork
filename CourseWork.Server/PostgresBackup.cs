using System.Diagnostics;
using System;
using System.Data;
using YandexDisk.Client.Http;
using YandexDisk.Client;
using YandexDisk.Client.Clients;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json.Serialization;

using YandexDisk.Client;
using YandexDisk.Client.Clients;
using YandexDisk.Client.Http;
using YandexDisk.Client.Protocol;

namespace CourseWork.Server
{
    public class PostgresBackup : BackgroundService
    {
        private readonly string connectionStr;
        private readonly string backupFile = Path.Combine($"backup_{DateTime.Now:yyyy.MM.dd.HHmmss}.sql");

        string accessToken = "y0_AgAAAABUzwr2AAsQFgAAAAD2PZhK3pTEhMMST_yui2-7m9PPdJXDjyM";

        string filePath = "G:\\VS repos\\CourseWork\\CourseWork.Server\\Data\\text.txt";

        string destinationPath = "client/disk/DatabaseBackup/text.txt";

        public PostgresBackup()
        {
            connectionStr = DatabaseConfig.GetDumpString();
        }

        public async Task CreateBackup(string outputPath)
        {
            try
            {

                using (var process = Process.Start(new ProcessStartInfo
                {
                    FileName = "pg_dump",
                    RedirectStandardOutput = false,
                    UseShellExecute = true,
                    CreateNoWindow = true,
                    Arguments = $"{connectionStr} -f ../{backupFile}"
                }))
                {
                    process.WaitForExit();
                }


            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating PostgreSQL backup: {ex.Message}");
            }

            await SendBackup();
        }


        class Link
        {
            [JsonPropertyName("href")]
            public string Href { get; set; } = null!;
        }

        private async Task SendBackup()
        {
            try
            {

                using HttpClient client = new HttpClient();

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue
                (
                    "OAuth",
                    "y0_AgAAAABw8zkpAAsQCAAAAAD2Ot5ucIz7sr6GQWejPfk0dQMkyxE98G4"
                );

                var responce = await client.GetAsync($"https://cloud-api.yandex.net/v1/disk/resources/upload?path=/DatabaseBackup/{backupFile}&overwrite=true");
                if (!responce.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Error sending PostgreSQL backup: {responce.Content}");
                }

                var linkToLoad = (await responce.Content.ReadFromJsonAsync<Link>()).Href;


                using (var fileStream = File.OpenRead($"../{backupFile}"))
                {
                    var uploadRequest = new HttpRequestMessage(HttpMethod.Put, linkToLoad)
                    {
                        Content = new StreamContent(fileStream)
                    };
                    responce = await client.SendAsync(uploadRequest);

                    if (!responce.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"Error sending PostgreSQL backup: {responce.Content}");
                    }
                }


            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending PostgreSQL backup: {ex.Message}");
            }
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await CreateBackup("");
                await Task.Delay(60 * 60 * 1000);
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
