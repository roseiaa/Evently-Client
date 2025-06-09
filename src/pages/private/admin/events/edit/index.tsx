
import { useEffect, useState } from 'react'
import PageTitle from '../../../../../components/PageTitle'
import EventForm from '../common/event-form'
import { getEventById } from '../../../../../api/eventsService'
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import Spinner from '../../../../../components/spinner'

function EditEventPage() {
  const [eventData, setEventData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const params: any = useParams()

  const getData = async () => {
try {
  setLoading(true);
  const response = await getEventById(params.id)
  setEventData(response.data)
  console.log(eventData)
  
} catch (error: any) {
  message.error(error.response?.data.message || error.message)
  
} finally {
  setLoading(false);

  
}
    }
  

  useEffect(() => {
    getData()
    
  }, [])

  if (loading) {
    return (
    <div className='flex justify-center items-center h-screen'>
      <Spinner/>

    </div>
    )
  }
  return (
    <div>
      <PageTitle title="Edit Event" />
      <div className='mt-5'>
      <EventForm initialData={eventData} type='edit'/>
      </div>
    </div>
  )
}

export default EditEventPage
