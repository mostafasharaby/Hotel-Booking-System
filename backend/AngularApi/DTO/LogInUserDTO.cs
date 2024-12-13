using System.ComponentModel.DataAnnotations;

namespace Hotel_Backend.DTO
{
    public class LogInUserDTO
    {
        [Required]
        public string Email { get; set; }


        [Required]
        public string Password { get; set; }
    }
}
