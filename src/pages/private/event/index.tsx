import { useState, useEffect } from "react";
import type { EventType } from "../../../interfaces";
import { getEventById } from "../../../api/eventsService";
import { useParams } from "react-router-dom";
import { message, Image} from "antd";
import Spinner from "../../../components/spinner";
import { MapPin, Timer } from "lucide-react";
import { getDateFormat, getDateTimeFormat } from "../../../formatting/dateTime";
import TicketSelection from "./common/TicketSelection";

function EventInfoPage() {
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(false);
  const params: any = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventById(params.id);
      setEventData(response.data);
    } catch (error: any) {
      message.error("Failed to fetch event.", error);
    } finally {
      setLoading(false);
    }
  };

  const renderEventInfo = (label: string, value: any) => {
    return (
        <div className="flex flex-col">
            <span className=" text-gray-500">{label}</span>
            <span className="text-gray-800  font-semibold">{value}</span>
        </div>
    )
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    eventData && <div>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-titles">{eventData?.name}</h1>
        <div className="flex gap-10">
          <div className="flex gap-1">
            <MapPin size={16} />{" "}
            <span className="text-gray-500 text-md">
              {" "}
              {eventData?.address}, {eventData?.city}, {eventData?.postcode}
            </span>
          </div>
          <div className="flex gap-1">
            <Timer size={16} />{" "}
            <span className="text-gray-500 text-md">
              {" "}
              {getDateTimeFormat(`${eventData?.date} ${eventData?.time}`)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {eventData?.media.map((media: any, index: number) => (
          <Image key={index} src={media} height={300} className="object-cover rounded"/>
        ))}
      </div>
      <div className="mt-7">
        <p className="text-gray-700 text-lg">{eventData?.description}</p>
      </div>

      <div className="grid grid-cols-1 mt-7 md:grid-cols-2 lg:grid-cols-3 p-3 gap-5 bg-gray-100">
        {renderEventInfo("Organizer", eventData?.organiser)}
        {renderEventInfo("Address", eventData?.address)}
        {renderEventInfo("City", eventData?.city)}
        {renderEventInfo("Postcode", eventData?.postcode)}
        {renderEventInfo("Date", getDateFormat(eventData?.date))}
        {renderEventInfo("Time", eventData?.time)}
        <div className="col-span-3">{renderEventInfo("Guests", eventData?.guests.join(", "))}</div>
      </div>

      <div className="mt-7">
        <TicketSelection eventData={eventData} />
      </div>
    </div>
  );
}

export default EventInfoPage;
