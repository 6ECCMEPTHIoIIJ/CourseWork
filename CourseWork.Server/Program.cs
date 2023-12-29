using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using System.Text.Json.Serialization;


namespace CourseWork.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(o =>
            {
                var validator = new JwtTokenValidator();
                o.UseSecurityTokenValidators = true;
                o.SecurityTokenValidators.Add(validator);
            });
            builder.Services.AddAuthorization();
            builder.Services.AddHostedService<PostgresBackup>();



            builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.WriteIndented = true;
            });
            builder.Services.AddDbContext<DefaultDbContext>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            //app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");
            //damp(app);

            app.Run();
        }

        private static void ExportDataToXML(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            var dbContext = services.GetRequiredService<DefaultDbContext>();
            var xmlExporter = new XmlExporter(dbContext);

            xmlExporter.ExportAll("Data");
        }

        private static async void damp(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var dbContext = services.GetRequiredService<DefaultDbContext>();
                    var backup = new PostgresBackup();

                    await backup.CreateBackup("G:\\VS repos\\CourseWork\\CourseWork.Server\\ExportXML\\dump.sql");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error exporting data to CSV: {ex.Message}");
                }
            }

            Console.WriteLine("Data exported to CSV file successfully.");
        }
    }
}
