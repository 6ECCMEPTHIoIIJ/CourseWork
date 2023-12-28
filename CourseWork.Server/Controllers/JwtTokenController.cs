using Azure.Core;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseWork.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JwtTokenController : ControllerBase
    {
        public class TeacherLogin
        {
            public required Teacher Teacher { get; set; }
            public required JwtToken Token { get; set; }
        }

        public class JwtToken
        {
            public required string Token { get; set; }
            public required int Lifetime { get; set; }

        }

        private readonly DefaultDbContext _context;

        public JwtTokenController(DefaultDbContext context)
        {
            _context = context;
        }

        public class Login
        {
            public required string L { get; set; }
            public required string P { get; set; }
        }


        [HttpPost]
        public async Task<ActionResult<TeacherLogin>> LoginAsTeacher(Login login)
        {
            var teacher = await _context.Teachers.SingleOrDefaultAsync(t => t.Login.Equals(login.L));
            if (teacher == null)
                return BadRequest($"Пользователя \'{login.L}\' не существует");

            if (!teacher.Password.Equals(login.P))
                return BadRequest($"Неверный логин или пароль");

            return new TeacherLogin
            {
                Teacher = teacher,
                Token = new()
                {
                    Token = JwtTokenValidator.GenerateToken(teacher.Id.ToString(), "Teacher"),
                    Lifetime = (int)TimeSpan.FromMinutes(300).TotalSeconds
                }
            };
        }
    }
}
