using ShareEaseAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShareEaseAPI.Dto
{
    public class ResourceDto
    {
        public class PostResourceDto
        {
            public int id { get; set; }
            public string name { get; set; }
            public string description { get; set; }
            public string img { get; set; }
            public string location { get; set; }
            public string availability { get; set; }
            public int categoryId { get; set; }

            public int userId { get; set; }

            }
    }
}
