using System.ComponentModel.DataAnnotations;

namespace Hotel_Backend.DTO
{
    public class RegisterUserDTO
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        [Compare("Password")]
        public string? ConfirmPassword { get; set; }


        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
    }
}
