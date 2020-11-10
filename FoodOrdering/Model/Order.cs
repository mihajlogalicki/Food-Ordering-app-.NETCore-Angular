using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FoodOrdering.Model
{
    public class Order
    {
        public int OrderId {get; set;}
        public string OrderNumber { get; set; }
        [Required]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string PaymentMethod { get; set; }
        public double Total { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
