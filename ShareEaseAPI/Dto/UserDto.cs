namespace ShareEaseAPI.Dto
{
    public class UserDto
    {

        public class UserLoginDto
        {
            public string password { get; set; }
            public string email { get; set; }
        }

        public class UserSignupDto{
            public string username { get; set; }
            public string password { get; set; }
            public string email { get; set; }
            public string location { get; set; }
            public string mobile { get; set; }
            public string avatar { get; set; }
        }
    }
}
