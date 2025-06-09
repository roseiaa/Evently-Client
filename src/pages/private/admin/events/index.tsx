import  { useState, useEffect } from 'react'
import PageTitle from '../../../../components/PageTitle'
import { Button, message, Table } from 'antd'
import {  useNavigate } from 'react-router-dom';
import { deleteEvent, getEvents } from '../../../../api/eventsService';
import { getDateTimeFormat } from '../../../../formatting/dateTime';
import { Pen, Trash2 } from 'lucide-react';

function EventPage() {
  const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const getData = async () => {
      try {
        setLoading(true);
        const response = await getEvents({
        search: "",
        date: "",
      });
        setEvents(response.data)
      } catch (error: any) {
        message.error("failed to get events:", error)
      }
      finally {
        setLoading(false);
      }
    }

    const deleteEventFunction = async (id: string) => {
      try {
        setLoading(true);
        await deleteEvent(id);
        message.success("Event deleted successfully");
        getData();
      } catch (error: any) {
        message.error("failed to delete event:", error)
        
      } finally {
        setLoading(false);
        
      }
    }
    useEffect(() => {
      getData()
    }, [])

    const columns = [
      {
        title: 'Event Name',
        dataIndex: 'name',
        key:"name"
},
        {
            title: 'Date&Time',
            dataIndex: 'date',
            key: "date",
            render: ( date: any, record: any) => {
              return getDateTimeFormat(`${date} ${record.time}`)        
            }
        },
        {
            title: 'Organiser',
            dataIndex: 'organiser',
            key: "organiser"
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          key: "createdAt",
          render: (createdAt: any) =>  getDateTimeFormat(createdAt)
        },
        {
          title: "Actions",
          dataIndex: "actions",
          key: "actions",
          render: (_: any,row: any) => {
            return (
              <div className="flex gap-5">
                <Pen className='cursor-pointer text-blue-500' size={16} onClick={() => navigate(`/admin/events/edit/${row._id}`)}/>
                <Trash2 className='cursor-pointer text-red-500' size={16} onClick={() => deleteEventFunction(row._id) }/>
                
              </div>
            )
          }
        }
        
    ]
  return (
    <div>
    <div className='flex justify-between items-center'>
        <PageTitle title="EVENTS" />
      <Button type="primary" onClick={() => navigate("/admin/events/create")}> Create Event</Button>
    </div>
    
    <Table  dataSource={events} columns={columns} loading={loading}/>
    </div>

  )
}

export default EventPage
