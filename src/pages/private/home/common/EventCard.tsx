
import type { EventType } from "../../../../interfaces";
import placeholderImage from "../../../../assets/placeholder-image.jpg";

import { MapPin, Timer } from "lucide-react";
import { getDateTimeFormat } from "../../../../formatting/dateTime";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
function EventCard({ event }: { event: EventType }) {
  const mainImage = event.media[0] || placeholderImage;
  const navigate = useNavigate();

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 border border-solid border-gray-200 items-center gap-5">
      <div className="col-span-1">
        <img
          src={mainImage}
          className="w-full h-80 object-cover rounded-l"
          alt="Media"
        />
      </div>
      <div className="col-span-2 flex-flex-col gap-6 p-3">
        <h1 className="text-primary text-2xl mb-7 font-bold">{event.name}</h1>
        <p className="text-gray-600 text-md line-clamp-3">
          {event.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col bg-gray-200 p-1 rounded">
            <div className="flex gap-2"> <MapPin size={16}/>  <p className="text-gray-600 text-xs">{event.address}, {event.city}, {event.postcode}</p></div>
            <div className="flex gap-2"> <Timer size={16}/>  <p className="text-gray-600 text-xs"> {getDateTimeFormat(`${event.date} ${event.time}`)}</p></div>
      
          </div>

        <Button
            type="primary"
            onClick={() => {navigate(`/events/${event._id}`)}}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
