using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Abstractions;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using System.Text.Json.Serialization;


namespace CourseWork.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            //builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));




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

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");
            //ExportDataToCsv(app);

            app.Run();
        }

        //private static void ExportDataToCsv(WebApplication app)
        //{
        //    using (var scope = app.Services.CreateScope())
        //    {
        //        var services = scope.ServiceProvider;
        //        try
        //        {
        //            var dbContext = services.GetRequiredService<DefaultDbContext>();
        //            var csvExporter = new CsvExporter(dbContext);

        //            csvExporter.ExportStudents();
        //        }
        //        catch (Exception ex)
        //        {
        //            Console.WriteLine($"Error exporting data to CSV: {ex.Message}");
        //        }
        //    }

        //    Console.WriteLine("Data exported to CSV file successfully.");
        //}
    }
}
