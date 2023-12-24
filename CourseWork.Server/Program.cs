using CourseWork.Server.libs.utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Abstractions;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;


namespace CourseWork.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

            try
            {
                var connectionString = "User ID=gen_user;Password=o*=1/.CX$J8ew/;Server=185.154.195.121;Port=5432;Database=default_db;Integrated Security=true;Pooling=true;";

                builder.Services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseNpgsql(connectionString));

                Console.WriteLine($"Подключения к базе данных успешно");
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Ошибка подключения к базе данных: {ex.Message}");
                Console.WriteLine(ex.ToString());
            }


            builder.Services.AddControllers();
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

            app.Run();
        }
    }
}
