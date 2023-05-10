import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { useAuth } from '../auth';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import './calendarstyle.css';

const CalendarContainer = styled.div`
  font-size: 0.8rem;

`;


const Calendar: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');
      
    // Listen to changes in the collection and update the entries state
    const unsubscribe = entriesRef.onSnapshot(({ docs }) => {
      setEntries(docs.map(toEntry));
      setLoading(false);
    });

    return unsubscribe; // Cleanup the listener when the component unmounts

  }, [userId]);

  const events = entries.map((entry) => ({
    title: entry.title,
    date: new Date(entry.date),
    id: entry.id,
    classNames: entry.completed ? 'completed' : 'not-completed' // add classNames based on completion status
  }));
  
  
  const eventRender = (info: any) => {
    if (info.event.extendedProps.completed) {
      info.el.style.backgroundColor = 'blue'; // set blue background for completed tasks
    } else {
      info.el.style.backgroundColor = 'green'; // set green background for incomplete tasks
    }
  };

  const handleEventClick = ({ event }: { event: any }) => {
    history.push(`/my/entries/view/${event.id}`); // redirect to the corresponding entry page
  };

  return (
    <CalendarContainer>
      {!loading && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick} // attach the click event handler
          lazyFetching={true} // fetch events for the visible range of dates
          height='500px'
        />
      )}
    </CalendarContainer>
  );
};
export default Calendar;
