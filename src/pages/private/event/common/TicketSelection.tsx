import { useState } from "react";
import type { CalendarEvent, EventType } from "../../../../interfaces";
import { Button, Input, message } from "antd";
import PaymentModal from "./PaymentModal";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getClientSecret } from "../../../../api/paymentsService";
import { generateGoogleCalendarLink } from "../../../../utils/googleCalendarLink";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function TicketSelection({ eventData }: { eventData: EventType }) {
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(1);
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [stripeOptions, setStripeOptions] = useState<any>({});
  const tickets = eventData.tickets;

  const calendarEvent: CalendarEvent = {
    name: eventData.name,
    date: `${eventData.date}T${eventData.time}`, // e.g. 2025-06-20T18:00
    durationMinutes: 60,
    location: eventData.address || "TBD",
    description: eventData.description || `Booking for ${eventData.name}`,
  };

  const calendarLink = generateGoogleCalendarLink(calendarEvent);
  const selectedTicketPrice = tickets?.find(
    (ticket) => ticket.name === selectedTicketType
  )?.price;

  const totalAmount = (selectedTicketPrice! || 0) * (ticketCount || 0);

  const getClientSecretAndOpenModal = async () => {
    try {
      const response = await getClientSecret(totalAmount);
      setStripeOptions({
        clientSecret: response.clientSecret,
      });
      setShowPaymentModal(true);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <div>
      {tickets?.length > 0 ? (
        <div>
          <h1 className="text-md text-titles font-bold">Select Ticket Type</h1>

          <div className="flex flex-wrap gap-5 mt-3">
            {tickets.map((ticket, index) => {
              const available = ticket.available ?? ticket.limit;

              return (
                <div
                  className={`p-2 border border-gray-200 bg-gray-100 lg:w-96 w-full cursor-pointer ${
                    selectedTicketType === ticket.name
                      ? "border-primary border-solid"
                      : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setSelectedTicketType(ticket.name);
                    setMaxCount(available);
                  }}
                >
                  <h1 className="text-sm text-gray-700 uppercase">
                    {ticket.name}
                  </h1>
                  <div className="flex justify-between">
                    <h1 className="text-sm font-bold">£{ticket.price}</h1>
                    <h1 className="text-sm ">{available} left</h1>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <h1 className="text-md text-titles font-bold mt-10">
              Ticket Availability
            </h1>

            <Input
              className="w-96"
              type="number"
              value={ticketCount}
              min={1}
              max={maxCount}
              onChange={(e) => setTicketCount(parseInt(e.target.value))}
            />

            <span className="text-red-600">
              {ticketCount > maxCount && ` Only ${maxCount} tickets left`}
            </span>

            <div className="mt-7 flex justify-between bg-gray-200 border border-solid p-3 items-center">
              <h1 className="text-xl text-gray-600 font-bold">
                Total Amount: £{totalAmount}
              </h1>
              <Button
                disabled={
                  !selectedTicketType || !ticketCount || ticketCount > maxCount
                }
                onClick={() => getClientSecretAndOpenModal()}
                type="primary"
              >
                Purchase
              </Button>
            </div>
          </div>

          {stripeOptions?.clientSecret && (
            <Elements stripe={stripePromise} options={stripeOptions}>
              {showPaymentModal && (
                <PaymentModal
                  showPaymentModal={showPaymentModal}
                  setShowPaymentModal={setShowPaymentModal}
                  selectedTicketType={selectedTicketType}
                  ticketCount={ticketCount}
                  totalAmount={totalAmount}
                  event={eventData}
                />
              )}
            </Elements>
          )}
        </div>
      ) : (
        <div className="flex">
        <div className="bg-gray-100 rounded flex justify-center items-center p-1">
          <h1 className="text-xl  text-gray-600 p-0 m-0 font-semibold">
            Free Entry: No ticket required.
          </h1>
          
        </div>
          <Button
        type="link"
        href={calendarLink}
        target="_blank"
        className="text-titles"
      >
        Add Event to Calendar
      </Button>
      </div>
      )}
    </div>
  );
}

export default TicketSelection;
