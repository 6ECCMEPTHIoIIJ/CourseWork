//using Microsoft.EntityFrameworkCore;

//namespace CourseWork.Server
//{
//    public class TestVerification
//    {
//        private readonly DefaultDbContext _context;

//        public Test Test {  get; set; }
//        public int MaxScore { get; set; }
//        public int ScoreStudent { get; set; }

//        public TestVerification(DefaultDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<TestVerification> VerifyTest(Guid testId, string studentPassbookNumber)
//        {
//            var test = await _context.Tests.Include(t => t.Tickets).ThenInclude(t => t.Variants).FirstOrDefaultAsync(t => t.Id == testId);
//            var student = await _context.Students.FirstOrDefaultAsync(s => s.PassbookNumber == studentPassbookNumber);

//            if (test == null || student == null)
//            {
//                return null;
//            }

//            var passedTickets = await _context.PassedTickets
//            .Include(pt => pt.PassedInput)
//            .Include(pt => pt.PassedSingle)
//            .Include(pt => pt.PassedMultiples)
//            .Where(pt => pt.TickedId == testId && pt.StudentId == studentPassbookNumber)
//            .ToListAsync();

//            int maxScore = 0;
//            int scoreStudent = 0;
//            foreach (var ticket in test.Tickets)
//            {
//                maxScore += ticket.Cost;

//                var passedTicket = passedTickets.FirstOrDefault(pt => pt.TickedId == ticket.Id);

//                if (passedTicket != null)
//                {
//                    if (ticket.Type == 0) // Single Choice
//                    {
//                        var correctAnswer = ticket.Single?.Data ?? -1;
//                        var studentAnswer = passedTicket.PassedSingle?.FirstOrDefault()?.Data ?? -1;

//                        if (correctAnswer == studentAnswer)
//                        {
//                            scoreStudent += ticket.Cost;
//                        }
//                    }
//                    else if (ticket.Type == 1) // Multiple Choice
//                    {
//                        var correctAnswers = ticket.Multiples?.Select(m => m.Data).ToList() ?? new List<int>();
//                        var studentAnswers = passedTicket.PassedMultiples?.Select(m => m.Data).ToList() ?? new List<int>();

//                        if (correctAnswers.SequenceEqual(studentAnswers))
//                        {
//                            scoreStudent += ticket.Cost;
//                        }
//                    }
//                    else if (ticket.Type == 2) // Input
//                    {
//                        var correctAnswer = ticket.Input?.Data ?? "";
//                        var studentAnswer = passedTicket.PassedInput?.FirstOrDefault()?.Data ?? "";

//                        if (string.Equals(correctAnswer, studentAnswer, StringComparison.OrdinalIgnoreCase))
//                        {
//                            scoreStudent += ticket.Cost;
//                        }
//                    }
//                }
//            }

//            var result = new TestVerification(_context)
//            {
//                Test = test,
//                MaxScore = maxScore,
//                ScoreStudent = scoreStudent
//            };

//            return result;
//        }
//    }
//}
