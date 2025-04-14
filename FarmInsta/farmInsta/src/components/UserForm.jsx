import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const defaultFormValues = {
    name: '',
    email: '',
    description: '',
    languages: '',
    education: '',
    specialization: '',
    twitter: '',
    instagram: '',
    imageUrl: '/api/placeholder/150/150'
  };

  const [formValues, setFormValues] = useState(user || defaultFormValues);

  useEffect(() => {
    if (user) {
      setFormValues(user);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{user ? 'Edit Profile' : 'Add New Profile'}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onCancel}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formValues.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Languages (comma-separated)</label>
              <input
                type="text"
                name="languages"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formValues.languages}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Education</label>
              <input
                type="text"
                name="education"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formValues.education}
                onChange={handleInputChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Specialization (comma-separated)</label>
              <input
                type="text"
                name="specialization"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formValues.specialization}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Twitter URL</label>
              <input
                type="url"
                name="twitter"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formValues.twitter}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formValues.instagram}
                onChange={handleInputChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formValues.imageUrl}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {user ? 'Update Profile' : 'Add Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;