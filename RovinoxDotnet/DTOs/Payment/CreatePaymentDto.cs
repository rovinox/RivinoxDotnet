using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.DTOs.Payment
{
    public class CreatePaymentDto
    {
        public int? Cvc { get; set; }
        public int? Expiry { get; set; }
        public int? Number { get; set; }
        public decimal Amount { get; set; }
        public string? Name { get; set; } 
        public int? ZipCode { get; set; }
        public string? CashReceiverId { get; set; }
        public string? ApproverId { get; set; }
        public string? TransactionId { get; set; }
        public string? Email { get; set; }
        public string? UserId { get; set; }
        public string? PaymentType { get; set; }

    }
}