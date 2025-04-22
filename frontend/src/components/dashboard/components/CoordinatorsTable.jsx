import React from 'react';
import { Edit, Trash2, Mail } from 'lucide-react';

const CoordinatorsTable = ({
  coordinators,
  onEdit,
  onDelete,
  onContact,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Club</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coordinators.map((coordinator) => (
            <tr key={coordinator.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{coordinator.name}</td>
              <td className="px-4 py-3">{coordinator.email}</td>
              <td className="px-4 py-3">{coordinator.club}</td>
              <td className="px-4 py-3">{coordinator.role}</td>
              <td className="px-4 py-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                  coordinator.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {coordinator.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end space-x-1">
                  <button 
                    onClick={() => onContact(coordinator.email)}
                    className="p-1.5 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                  >
                    <Mail size={16} />
                  </button>
                  <button 
                    onClick={() => onEdit(coordinator.id)}
                    className="p-1.5 rounded-full hover:bg-yellow-100 text-yellow-600 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(coordinator.id)}
                    className="p-1.5 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoordinatorsTable;