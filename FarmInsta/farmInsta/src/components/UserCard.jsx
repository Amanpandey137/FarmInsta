import React from 'react';
import { Edit } from 'lucide-react';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => onEdit(user)}
          className="text-gray-500 hover:text-indigo-600"
        >
          <Edit size={18} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-gray-700 mb-4">{user.description}</p>

        <div className="text-sm text-gray-600 space-y-2 mb-4">
          <div className="flex">
            <span className="font-medium w-32">Languages:</span>
            <span>{user.languages}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Education:</span>
            <span>{user.education}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-32">Specialization:</span>
            <span>{user.specialization}</span>
          </div>
        </div>

        <div className="flex gap-4 text-sm">
          <a
            href={user.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            Twitter
          </a>
          <a
            href={user.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-700"
          >
            Instagram
          </a>
          <button
            onClick={() => onDelete(user.id)}
            className="text-red-500 hover:text-red-700 ml-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;