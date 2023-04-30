using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareEaseAPI.Models
{
    public class ResourceModel
    {

        [Key]
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string description { get; set; }
        [Required]
        public string img { get; set; }
         [Required]
        public string location { get; set; }
        public string availability { get; set; }

        [ForeignKey("Category")]
        public int categoryId { get; set; }


        [ForeignKey("Users")]
        public int UserId { get; set; }
        public UserModel Owner { get; set; }

        public CategoryModel Category { get; set; }
    }
}
