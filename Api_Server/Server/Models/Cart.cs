using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace Server.Models
{
    public class Cart
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        // Reference navigation property cho khóa ngoại đến User
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int PhoneModelId { get; set; }

        // Reference navigation property cho khóa ngoại đến Product
        public PhoneModel PhoneModel { get; set; }

        [DefaultValue(1)]
        public int Quantity { get; set; }

        public Cart()
        {
            Quantity = 1;
        }
    }
}
