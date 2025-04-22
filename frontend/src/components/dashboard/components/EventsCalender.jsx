import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

/**
 * A calendar component that displays events by day.
 * 
 * @param {Array} events - Array of event objects to display on the calendar
 * @param {Function} onEventClick - Callback function when an event is clicked
 */
const EventsCalendar = ({ events, onEventClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  /**
   * Gets all events for a specific day
   * @param {number} day - The day number (1-31)
   * @returns {Array} Filtered array of events for the specified day
   */
  const getEventsForDay = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <Calendar size={20} className="mr-2" />
          {monthNames[currentMonth]} {currentYear}
        </h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={previousMonth} 
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <button 
            onClick={nextMonth} 
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i} className="text-center text-xs text-gray-500 py-2 font-medium">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {padding.map((_, i) => (
          <div key={`padding-${i}`} className="aspect-square p-1"></div>
        ))}
        
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isToday = day === new Date().getDate() && 
                         currentMonth === new Date().getMonth() && 
                         currentYear === new Date().getFullYear();
          
          return (
            <div 
              key={day} 
              className={`aspect-square p-1 border rounded-md ${isToday ? 'bg-blue-50 border-blue-300' : 'border-gray-100 hover:bg-gray-50'}`}
            >
              <div className="h-full flex flex-col">
                <div className="text-xs text-gray-500 mb-1 text-right">{day}</div>
                
                <div className="flex-1 overflow-y-auto space-y-1">
                  {dayEvents.map((event) => (
                    <div 
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className={`text-xs truncate px-1.5 py-0.5 rounded cursor-pointer ${
                        event.type === 'public' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsCalendar;