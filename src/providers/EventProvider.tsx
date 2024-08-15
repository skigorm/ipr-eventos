import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Event {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    items: Item[];
}

interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface EventContextType {
    events: Event[];
    addEvent: (event: Event) => void;
    updateEvent: (updatedEvent: Event) => void;
    deleteEvent: (id: number) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>([]);

    const addEvent = (event: Event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    const updateEvent = (updatedEvent: Event) => {
        setEvents((prevEvents) =>
            prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
        );
    };

    const deleteEvent = (id: number) => {
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
    };

    return (
        <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvent = (): EventContextType => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvent must be used within an EventProvider');
    }
    return context;
};
