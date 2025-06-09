import axios from "axios";


export const createEvent = async (data: any) => {
    const response = await axios.post("/api/events/create-event", data);
    return response.data;
}

export const getEvents = async (filters: any) => {
    const response: any = await axios.get(`/api/events/get-events?search=${filters.search}&date=${filters.date}`);
    console.log(response)
    return response.data;
}

export const getEventById = async (id: string) => {
    const response = await axios.get(`/api/events/event/${id}`);
    return response.data;
}

export const updateEvent = async (id: string, data: any) => {
    const response = await axios.put(`/api/events/edit-event/${id}`, data);
    return response.data;
}

export const deleteEvent = async (id: string) => {
    const response = await axios.delete(`/api/events/delete-event/${id}`)
    return response.data;
    
}