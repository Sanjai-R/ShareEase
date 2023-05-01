using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareEaseAPI.Models
    {
    public class SubscriptionModel
        {

        [Key]
        public int subId { get; set; }
       [ForeignKey("Category")]
        public int categoryId { get; set; }


        [ForeignKey("Users")]
        public int userId { get; set; }

        public virtual UserModel User { get; set; }

        public virtual CategoryModel Category { get; set; }
        }
    }
