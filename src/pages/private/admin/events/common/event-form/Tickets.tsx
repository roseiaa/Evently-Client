
import type { EventFormStepProps } from '.'
import { Button } from 'antd';
import { Input } from 'antd';

function Tickets({currentStep, setCurrentStep, eventData, setEventData, loading, onFinish} : EventFormStepProps) {
const createTicket = () => {
  const currentTickets = eventData.tickets || [];
  currentTickets.push({
    name: "",
    price: 1,
    limit: 0
  })
  setEventData({
    ...eventData,
    tickets: currentTickets
  })
}

const onTicketChange = (index: number, property: string, value: string | number) => {
  const currentTickets = eventData.tickets || [];
  currentTickets[index][property] = value;
  setEventData({
    ...eventData,
    tickets: currentTickets
  })
}

const deleteTicket = (index: number) => {
  const newTickets = eventData.tickets || [];
 newTickets.splice(index, 1);
  setEventData({
    ...eventData,
    tickets: newTickets
  })
  
}

const ticketsValid = (eventData.tickets || []).every(
  (ticket: { price: any; limit: any; }) => Number(ticket.price) > 0 && Number(ticket.limit) > 0
);


  return (
    <div className='flex flex-col gap-5'>
      <Button onClick={createTicket} className=''>Create Tickets</Button>
    
    {eventData?.tickets?.length > 0 && (
      <div>
        <div className="grid grid-cols-4 gap-5">
          <span>Ticket Name</span>
          <span>Price</span>
          <span>Limit</span>
          <span></span>
        </div>
        <div className='flex flex-col gap-5'>
        {eventData?.tickets?.map((ticket: any, index: number) => (
          <div className='grid grid-cols-4 gap-5'>
            <Input placeholder='Ticket Name' name='name' value={ticket.name} onChange={(e: any) => onTicketChange(index, "name", e.target.value)} className='
            '></Input>
            <Input placeholder='Price' type='number' name='price'  min={1} value={ticket.price} onChange={ (e: any) => onTicketChange(index, "price", e.target.value)} className='
            '></Input>
            <Input placeholder='Limit' type='number' name='limit' value={ticket.limit} onChange={(e: any) => onTicketChange(index, "limit", e.target.value)} className='
            '></Input>
            <Button type='link'  danger onClick={() => deleteTicket(index)} className=''>Delete</Button>
          </div>
        ))}
        </div>
        
      </div>
    )}
     
       <div className="flex justify-between lg:col-span-3">
        <Button  disabled={loading} onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button  type="primary" loading={loading} disabled={loading || !ticketsValid} onClick={onFinish}>Save</Button>
      </div>
    </div>
  )
}

export default Tickets
