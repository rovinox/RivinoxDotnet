using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Models
{
    [Table("Payments")]
    public class Payment
    {
        public int Id { get; set; }
        public string? TransactionId { get; set; }
        public string? PaymentType { get; set; }
        public string? UserId { get; set; }
        public AppUser? User { get; set; }
        public string? ApproverId { get; set; }
        public AppUser? Approver { get; set; }
        public string? CashReceiverId { get; set; }
        public AppUser? CashReceiver { get; set; }
        public DateTime ProcessDate { get; set; } = DateTime.Now;
        public decimal Amount { get; set; }
        public List<Notification> Notifications { get; set; }



    }
}