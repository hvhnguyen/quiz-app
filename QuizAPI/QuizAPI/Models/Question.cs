using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Question
    {
        [Key]
        public int QuestionId { get; set; }
        public required string QuestionInWords {  get; set; }
        public string? ImageName { get; set; }
        public required string Option1 { get; set; }
        public required string Option2 { get; set; }
        public required string Option3 { get; set; }
        public required string Option4 {  get; set; }
        public required int Answer {  get; set; }
    }
}
