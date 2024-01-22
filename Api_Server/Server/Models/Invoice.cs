using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace Server.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public string UserId { get; set; }

        // Reference navigation property cho khóa ngoại đến User
        [ForeignKey("UserId")]
        public User User { get; set; }

        public DateTime IssuedDate { get; set; }

        public string ShippingAddress { get; set; }

        public string ShippingPhone { get; set; }

        public string StatusInvoice { get; set; }

        [DefaultValue(0)]
        public int Total { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        public Invoice()
        {
            Total = 0;
            Status = true;
        }
    }
}
