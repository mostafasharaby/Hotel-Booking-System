namespace Hotel_Backend.DTO
{
    public class UpdateProfileDto
    {
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PersonalImgUrl { get; set; }
        public string? CoverImgUrl { get; set; }

        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}
