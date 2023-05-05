using System.ComponentModel.DataAnnotations.Schema;

namespace ShareEaseAPI.Dto
    {
    public class SubscriptionDto
        {
        public int categoryId { get; set; }

        public int userId { get; set; }
        }
    }
