import  { useState } from 'react'
import type { EventFormStepProps } from '.'
import { useNavigate } from 'react-router-dom'

import { Input, Form, Button, Tag } from 'antd'


function General({currentStep, setCurrentStep, eventData, setEventData} : EventFormStepProps) {
  const [guestInputs, setGuestInputs] = useState("")

  const navigate = useNavigate()

  const addGuest = () => {
    const currentGuests = eventData.guests || [];
    const newGuests = guestInputs.split(",").map((guest) => guest.trim());
    setEventData({
      ...eventData,
      guests: [...currentGuests, ...newGuests],
    });
    setGuestInputs("");
  } 

  const removeGuest = (guest: string) => {
    const currentGuests = eventData.guests || [];
    const updatedGuests = currentGuests.filter((g: string) => g !== guest);
    setEventData({
      ...eventData,
      guests: updatedGuests,
    });
  }

  return (
    <div className='flex flex-col gap-5'>
      <Form.Item label='Event Name' required>
        <Input placeholder='Event Name' name='name' value={eventData.name} onChange={(e) => setEventData({...eventData, name: e.target.value})} />
      </Form.Item>

      <Form.Item label='Event Description' required>
        <Input.TextArea placeholder='Event Description' name='description' value={eventData.description} onChange={(e) => setEventData({...eventData, description: e.target.value})} />
      </Form.Item>

      <Form.Item label='Event Organiser' required>
        <Input placeholder='Event Organiser' name='organiser' value={eventData.organiser } onChange={(e) => setEventData({...eventData, organiser: e.target.value})} />
      </Form.Item>

      <Form.Item label='Guest List' className='flex flex-col gap-2'>
        <div className="flex gap-5">

        <Input placeholder='Guest List (Comma separated)' name='guests' value={guestInputs} onChange={(e) => setGuestInputs(e.target.value)}></Input>
        <Button disabled={!guestInputs} onClick={addGuest}>Add</Button>
        </div>
      </Form.Item>
      <div className="flex flex-wrap gap-5">
        {eventData.guests?.map((guest: string) => (
          <Tag closable onClose={() => removeGuest(guest)} key={guest}>{guest}</Tag>
        ))}
      </div>

      <div className="flex gap-10 justify-between">
        <Button   onClick={() => navigate("/admin/events")}>Cancel</Button>
        <Button disabled={!eventData.name || !eventData.description || !eventData.organiser} type="primary" onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
      </div>
    </div>
  )
}

export default General
