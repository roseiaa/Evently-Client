import { message, Table } from 'antd';
import  { useEffect, useState } from 'react'
import PageTitle from '../../../../components/PageTitle';
import type { BookingType } from '../../../../interfaces';
import { getAllBookings, } from '../../../../api/bookingsService';
import { getDateTimeFormat } from '../../../../formatting/dateTime';

function AdminBookings() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings();
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
      title: "Event",
      dataIndex: "event",
      key: "event",
      render: (event: any) => event.name,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
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
    

  ];
  return (
    <div>
      <PageTitle title="Bookings" />

      <Table columns={columns} dataSource={bookings} loading={loading} pagination={false} rowKey="_id"/>
    </div>
  );
}

export default AdminBookings
