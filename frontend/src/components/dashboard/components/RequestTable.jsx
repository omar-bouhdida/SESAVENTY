import React from 'react';
import { Check, X, Eye } from 'lucide-react';

/**
 * A table component for displaying club requests with approval actions.
 * 
 * @param {Object[]} requests - Array of request objects to display
 * @param {Function} onApprove - Callback for approving a request
 * @param {Function} onReject - Callback for rejecting a request
 * @param {Function} onView - Callback for viewing request details
 */
const RequestTable = ({ 
  requests, 
  onApprove, 
  onReject, 
  onView 
}) => {
  /**
   * Returns a styled badge based on request status
   * @param {string} status - The request status ('pending', 'approved', or 'rejected')
   * @returns {JSX.Element} Styled status badge component
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>;
      case 'approved':
        return <span className="px-2.5 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">Approved</span>;
      case 'rejected':
        return <span className="px-2.5 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-3">Club Name</th>
            <th className="px-4 py-3">Coordinator</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Submitted</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{request.name}</td>
              <td className="px-4 py-3">{request.coordinator}</td>
              <td className="px-4 py-3">{request.category}</td>
              <td className="px-4 py-3">{request.submittedAt}</td>
              <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end space-x-1">
                  <button 
                    onClick={() => onView(request.id)}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                  {request.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => onApprove(request.id)}
                        className="p-1.5 rounded-full hover:bg-green-100 text-green-600 transition-colors"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => onReject(request.id)}
                        className="p-1.5 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </>
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

export default RequestTable;