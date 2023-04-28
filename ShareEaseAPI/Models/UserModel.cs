using System.ComponentModel.DataAnnotations;

namespace ShareEaseAPI.Models
{
    public class UserModel
    {
        [Key]
        public int user_id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string location { get; set; }

    }

}
