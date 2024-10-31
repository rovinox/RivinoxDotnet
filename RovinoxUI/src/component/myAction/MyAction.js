import React from 'react'
import NotificationsList from './NotificationsList'

export default function MyAction() {
    const  notifications  = [
        {
          id: 12,
          type: null,
          name: "Accept Payment",
          description: "please approve this if you have received the payment",
          senderId: "aea53a3d-736c-4917-8ad4-6969e42ef7fe",
          sender: {
            firstName: "Jane",
            lastName: "Mahmud"
          },
          receiverId: "7ee6cf1a-2f18-4edd-b353-cb77b945c998",
          seen: false,
          enabled: true,
          completed: false,
          completedOn: "2024-10-23T21:57:04.087167",
          paymentId: 56,
          payment: null
        },
        {
          id: 61,
          type: "invoice",
          name: "Accept Payment",
          description: "please approve this if you have received the payment",
          senderId: "622bcb67-7d86-498b-8191-db796ddcac73",
          sender: {
            firstName: "Alex",
            lastName: "Mahmud"
          },
          receiverId: "ee640120-b0fa-4c35-8c27-620cebe62880",
          seen: true,
          enabled: true,
          completed: true,
          completedOn: "2024-10-23T21:57:04.087501",
          paymentId: 90,
          payment: null
        },
        {
          id: 98,
          type: null,
          name: "Accept Payment",
          description: "please approve this if you have received the payment",
          senderId: "59b8fe48-707d-4858-a2f5-89e87f22b5e6",
          sender: {
            firstName: "Alex",
            lastName: "Mahmud"
          },
          receiverId: "aefd026a-a50b-4d49-8aa8-d2be2b9cbe96",
          seen: true,
          enabled: true,
          completed: false,
          completedOn: "2024-10-23T21:57:04.087601",
          paymentId: 77,
          payment: null
        },
        {
          id: 71,
          type: "payment",
          name: "Accept Payment",
          description: "please approve this if you have received the payment",
          senderId: "78fb815c-3776-4a63-90af-5cf890581d5a",
          sender: {
            firstName: "Alex",
            lastName: "Mahmud"
          },
          receiverId: "471faed7-0529-4028-9cd3-324b5613de63",
          seen: false,
          enabled: true,
          completed: true,
          completedOn: "2024-10-23T21:57:04.087690",
          paymentId: 42,
          payment: null
        },
        {
          id: 84,
          type: "invoice",
          name: "Accept Payment",
          description: "please approve this if you have received the payment",
          senderId: "09fed93a-672e-4efd-856e-d678fcf22771",
          sender: {
            firstName: "John",
            lastName: "Mahmud"
          },
          receiverId: "ba5d715d-868c-4dad-8a01-9d7086439be6",
          receiver: null,
          seen: false,
          enabled: true,
          completed: false,
          completedOn: "2024-10-23T21:57:04.087987",
          paymentId: 84,
          payment: null
        }
      ]
 const handleViewNotification = ( id ) =>{
  // make API call to get more data related to the notification Id 

 }     
  return (
    <div>
      <NotificationsList navigateToNotification={handleViewNotification} notifications={notifications}  
      />
    </div>
  )
}
