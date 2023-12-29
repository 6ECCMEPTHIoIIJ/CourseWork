using Azure.Core;

using Microsoft.AspNetCore.Authorization;
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

        public class StudentLogin
        {
            public required Student Student { get; set; }
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


        [HttpPost("Teacher")]
        public async Task<ActionResult<TeacherLogin>> LoginAsTeacher(Login login)
        {
            var teacher = await _context.Teachers.SingleOrDefaultAsync(t => t.Login.Equals(login.L));
            if (teacher == null)
                return BadRequest($"Преподавателя \'{login.L}\' не существует");

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

        [HttpPost("Student")]
        public async Task<ActionResult<StudentLogin>> LoginAsStudent(Login login)
        {
            var student = await _context.Students.SingleOrDefaultAsync(t => t.PassbookNumber.Equals(login.L));
            if (student == null)
                return BadRequest($"Студента \'{login.L}\' не существует");

            if (!student.Password.Equals(login.P))
                return BadRequest($"Неверный логин или пароль");

            return new StudentLogin
            {
                Student = student,
                Token = new()
                {
                    Token = JwtTokenValidator.GenerateToken(student.PassbookNumber.ToString(), "Student"),
                    Lifetime = (int)TimeSpan.FromMinutes(300).TotalSeconds
                }
            };
        }

        [HttpPost("Admin")]
        public async Task<ActionResult<JwtToken>> LoginAsAdmin(Login login)
        {
            if (login.L != "Admin" || login.P != "Admin")
                return BadRequest($"Неверный логин или пароль");

            return new JwtToken
            {
                Token = JwtTokenValidator.GenerateToken("Admin", "Admin"),
                Lifetime = (int)TimeSpan.FromMinutes(300).TotalSeconds
            };
        }
    }
}
