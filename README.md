
# Evently Frontend

This is the **frontend repository** for **Evently**, an events app. The frontend is developed using **React** and **TypeScript**, with **Firebase** for media uploads, **Ant Design (antd)** for UI components, **Zustand** for global state management, and **Axios** for API interactions.

---

## Features

- Users can create an account and browse various events created by staff accounts.
- Users can filter events by date or name.
- View detailed information about each event.
- Purchase tickets via **Stripe** if the event has tickets on sale.
- View all bookings made from the bookings screen.
- Optionally add events to their Google Calendar.

### Staff Accounts

Staff accounts have additional permissions:

- View, create, edit, and delete events.
- View all bookings for events.
- View all registered users.
- Promote or demote user accounts to/from staff status (**please use this power responsibly**).

---
## Login 
   Click here to see the [Hosted Version](https://evently-client.vercel.app/profile/bookings)
   Here I will add two generic users created for testing the application:
   ```
   Staff User:
   Email: staff@gmail.com
   Password: staff
   ```
   ```
   Standard User:
   Email: user@gmail.com
   Password: user
   ```
   Feel free to create your own user login and events to test the application

## Stripe Payments

This application uses Stripe to process payments. **For testing purposes, do NOT use real card information.** Use the following test card details instead:
```
Card Number: 4242 4242 4242 4242
Expiration Date: 12/25
CVC: 123
```

---

## Running Locally

> **Note:** To run the frontend locally, you **must** have the backend repository running as well.  
> You can find the backend repo here: [Backend Repository Link](https://github.com/roseiaa/Evently-Server/tree/main?tab=readme-ov-file)

### Steps to run locally:

1. Clone this repository and open it in Visual Studio Code (or your preferred IDE).
2. Open the terminal and run:

   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add the following environment variables with your own values:

   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_FIREBASE_MEASUREMENT_ID=
   VITE_STRIPE_PUBLISHABLE_KEY=
    ```
  4. Start the frontend development server with:
    ``` npm run dev ```

     Enjoy using Evently! If you have any questions or need assistance, feel free to contact me.
