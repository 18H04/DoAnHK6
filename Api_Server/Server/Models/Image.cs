using System.ComponentModel;

namespace Server.Models
{
    public class Image
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int PhoneModelId { get; set; }

        public PhoneModel PhoneModel { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        public Image()
        {
            Status = true;
        }
    }
}
