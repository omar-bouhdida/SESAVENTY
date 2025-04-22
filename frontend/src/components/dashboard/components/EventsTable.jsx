import React from 'react';
import { Calendar, MapPin, Clock, Edit, Trash2, Eye, Users } from 'lucide-react';

/**
 * A table component for displaying event information with action buttons.
 * 
 * @param {Object[]} events - Array of event objects to display
 * @param {Function} [onEdit] - Optional callback for edit action
 * @param {Function} [onDelete] - Optional callback for delete action
 * @param {Function} onView - Callback for view action
 */
const EventsTable = ({
  events,
  onEdit,
  onDelete,
  onView,
}) => {
  /**
   * Formats a date string into a more readable format (e.g., "Oct 15, 2023")
   * @param {string} dateStr - The date string to format
   * @returns {string} Formatted date string
   */
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-3">Event Title</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Type</th>
            {events[0]?.participants !== undefined && (
              <th className="px-4 py-3">Participants</th>
            )}
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{event.title}</td>
              <td className="px-4 py-3 flex items-center">
                <Calendar size={14} className="mr-1.5 text-gray-400" />
                {formatDate(event.date)}
              </td>
              <td className="px-4 py-3 flex items-center">
                <Clock size={14} className="mr-1.5 text-gray-400" />
                {event.time}
              </td>
              <td className="px-4 py-3 flex items-center">
                <MapPin size={14} className="mr-1.5 text-gray-400" />
                {event.location}
              </td>
              <td className="px-4 py-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                  event.type === 'public' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {event.type === 'public' ? 'Public' : 'Private'}
                </span>
              </td>
              {event.participants !== undefined && (
                <td className="px-4 py-3 flex items-center">
                  <Users size={14} className="mr-1.5 text-gray-400" />
                  {event.participants}
                </td>
              )}
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end space-x-1">
                  <button 
                    onClick={() => onView(event.id)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(event.id)}
                      className="p-1.5 rounded-full hover:bg-yellow-100 text-yellow-600 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(event.id)}
                      className="p-1.5 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;