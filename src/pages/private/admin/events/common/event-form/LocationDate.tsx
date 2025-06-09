import type { EventFormStepProps } from ".";
import { Button, Form } from "antd";
import { Input } from "antd";

function LocationDate({
  eventData,
  setEventData,
  setCurrentStep,
  currentStep,
}: EventFormStepProps) {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
      <Form.Item label="Address">
        <Input
          placeholder="Address"
          value={eventData.address}
          onChange={(e) =>
            setEventData({ ...eventData, address: e.target.value })
          }
        ></Input>
      </Form.Item>
      <Form.Item label="City">
        <Input
          placeholder="City"
          value={eventData.city}
          onChange={(e) => setEventData({ ...eventData, city: e.target.value })}
        ></Input>
      </Form.Item>
      <Form.Item label="Postcode">
        <Input
          placeholder="Postcode"
          value={eventData.postcode}
          onChange={(e) =>
            setEventData({ ...eventData, postcode: e.target.value })
          }
        ></Input>
      </Form.Item>

      <Form.Item label="Date">
        <Input
          placeholder="Date"
          value={eventData.date}
          type="date"
          onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
          min={new Date().toISOString().split("T")[0]}
        ></Input>
      </Form.Item>

      <Form.Item label="Time">
        <Input
          placeholder="Time"
          value={eventData.time}
          type="time"
          onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
        ></Input>
      </Form.Item>

      <div className="flex justify-between lg:col-span-3">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button disabled={!eventData.address || !eventData.city || !eventData.postcode || !eventData.date || !eventData.time} type="primary" onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
      </div>
    </div>
  );
}

export default LocationDate;
