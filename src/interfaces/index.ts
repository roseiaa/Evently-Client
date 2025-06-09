export interface UserInterface {
    _id: string;
    name: string,
    email: string,
    isStaff: boolean,
    createdAt: string
}

export interface EventType {
    _id: string,
    name: string,
    description: string,
    organiser: string,
    guests: string[],
    address: string,
    city: string,
    postcode: string,
    date: string,
    time: string,
    media: string[],
    tickets: {
        available: number;
        name: string,
        price: number,
        limit: number,}[]
    }

    export interface BookingType {
        _id: string,
        event: EventType,
        user: UserInterface,
        ticketType: string,
        ticketCount: number,
        totalAmount: number,
        paymentId: string,
        status: string,
        createdAt: string
    }

    export interface CalendarEvent {
  name: string;
  date: string; 
  durationMinutes?: number;
  description?: string;
  location?: string;
  guests?: string[];
}
