import { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import type { BookingType, CalendarEvent } from "../../../interfaces";
import { getUserBookings } from "../../../api/bookingsService";
import { Button, message, Table } from "antd";
import { getDateTimeFormat } from "../../../formatting/dateTime";
import { generateGoogleCalendarLink } from "../../../utils/googleCalendarLink";



function UserBookingsPage() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserBookings();
      setBookings(response.data);
    } catch (error: any) {
      message.error(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Event Name",
      dataIndex: "event",
      key: "event",
      render: (event: any) => event.name,
    },
    {
      title: "Event Date",
      dataIndex: "event",
      key: "event",
      render: (event: any) => getDateTimeFormat(`${event.date} ${event.time}`),
    },
    {
      title: "Ticket Type",
      dataIndex: "ticketType",
      key: "ticketType",
    },
    {
      title: "Ticket Count",
      dataIndex: "ticketCount",
      key: "ticketCount",
    },
    {
      title: "Total Price",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount :any ) => `£${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render : (status :any) => status.toUpperCase(),
    },
    {
  title: 'Action',
  render: (_: any, record: BookingType) => {
    const { event } = record;

    // Constructing the CalendarEvent
    const calendarEvent: CalendarEvent = {
      name: event.name,
      date: `${event.date}T${event.time}`, // e.g. 2025-06-20T18:00
      durationMinutes: 60,
      location: event.address || 'TBD',
      description: event.description || `Booking for ${event.name}`,
    };

    const calendarLink = generateGoogleCalendarLink(calendarEvent);

    return (
      <Button
        type="link"
        href={calendarLink}
        target="_blank"
        style={{ color: 'green' }}
      >
        Add to Calendar
      </Button>
    );
  },
}
  ];
  return (
    <div>
      <PageTitle title="My Bookings" />

      <Table columns={columns} dataSource={bookings} loading={loading} pagination={false} rowKey="_id"/>
    </div>
  );
}

export default UserBookingsPage;
