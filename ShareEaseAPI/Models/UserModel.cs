using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        public string mobile { get; set; }
        public string avatar { get; set; }


        [JsonIgnore]
        public virtual ICollection<RequestModel> OwnerRequests { get; set; }

        [JsonIgnore]
        public virtual ICollection<RequestModel> BorrowerRequests { get; set; }
        }

}
