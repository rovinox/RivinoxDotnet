using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.common
{
    public static class NotificationType
    {
        
        public const string CashPayment = "CASH_PAYMENT";
        public const string CashPaymentName = "Made a cash payment";
        public const string CashPaymentDescription = "please approve this if you have received the payment";
        public const string CardPayment = "CARD_PAYMENT";
        public const string ApprovedPayment  = "APPROVED_PAYMENT";
        public const string ApprovedPaymentName  = "Account Balance have been updated";
        public const string ApprovedPaymentDescription  = "we have received your payment. your balance will be updated";
        public const string RejectedPayment  = "REJECTED_PAYMENT";
    
    }
}