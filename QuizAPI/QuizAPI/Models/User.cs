using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class User
    {
        [Key]
        public int UserId {  get; set; }
        public required string Email { get; set; }
        public required string Name { get; set; }
        public int Score { get; set; }
        public TimeSpan TimeTaken { get; set; }
    }

    public class UserResult
    {
        public int UserId { get; set; }
        public int Score {  set; get; }
        public TimeSpan TimeTaken { get; set; }
    }
}
