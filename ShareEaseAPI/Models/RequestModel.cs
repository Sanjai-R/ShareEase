using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ShareEaseAPI.Models
{
    public class RequestModel
    {
        [Key]
        public int id { get; set; }

        [ForeignKey("Owner")]
        public int OwnerId { get; set; }

        [ForeignKey("resource")]
        public int ResourceId { get; set; }

        [ForeignKey("Borrower")]
        public int BorrowerId { get; set; }

        public string status { get; set; }

        public DateTime date { get; set; }

        public virtual UserModel Borrower { get; set; }

        public virtual UserModel Owner { get; set; }

        public virtual ResourceModel resource { get; set; }
    }
}
