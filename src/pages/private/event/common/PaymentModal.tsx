import { Button, message, Modal } from 'antd';
import { PaymentElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { EventType } from '../../../../interfaces';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../../../../api/bookingsService';

function PaymentModal({ showPaymentModal, setShowPaymentModal, selectedTicketType, ticketCount, totalAmount, event}: {showPaymentModal: any; setShowPaymentModal: any; selectedTicketType: string; ticketCount: number; totalAmount: number; event: EventType}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment successful");
        const bookingPayload = {
          event: event._id,
          ticketType: selectedTicketType,
          ticketCount: ticketCount,
          totalAmount: totalAmount,
          paymentId: result.paymentIntent.id,
          status: "booked"
        };
        await createBooking(bookingPayload);
        message.success("Booking successful");
        navigate("/profile/bookings");
        setShowPaymentModal(false);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal title="Make Payment" open={showPaymentModal} onCancel={() => setShowPaymentModal(false)} centered footer={null}>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement options={{mode: "shipping", allowedCountries: ["GB"]}}/>

        <div className="mt-7 flex justify-end gap-6">
          <Button disabled={loading} onClick={() => setShowPaymentModal(false)}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>Pay</Button>
        </div>
      </form>
    </Modal>
  )
}

export default PaymentModal
