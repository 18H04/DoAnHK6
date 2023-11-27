using Microsoft.AspNetCore.Identity;

namespace Server.Models
{
    public class User:IdentityUser
    {
        public string FullName { get; set; }

        public DateTime Birthday { get; set; }
    }
}
