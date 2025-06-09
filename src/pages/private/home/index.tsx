/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import usersGlobalStore, {
  type usersStoreType,
} from "../../../store/users-store";
import { message } from "antd";
import { getEvents } from "../../../api/eventsService";
import EventCard from "./common/EventCard";
import type { EventType } from "../../../interfaces";
import Filters from "./common/Filters";
import Spinner from "../../../components/spinner";

function HomePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filters, setFilters] = useState({
    searchText: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const { currentUser } = usersGlobalStore() as usersStoreType;

  const getData = async (filtersObj: any) => {
    try {
      setLoading(true);
      console.log("filtersObj", filtersObj);
      const response = await getEvents(filtersObj);
      setEvents(response.data);
    } catch (error: any) {
      message.error("failed to get events:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData({ search: "", date: "" });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-primary text-2xl font-bold">
        Welcome, {currentUser?.name}!
      </h2>
      <Filters filters={filters} setFilters={setFilters} onFilter={getData} />
      <div className="flex flex-col gap-7">
        {events.map((event: any) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
