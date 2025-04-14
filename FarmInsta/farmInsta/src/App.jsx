import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, Edit, UserPlus, Filter } from "lucide-react";
import useLocalStorage from "./hooks/useLocalStorage";
import { setUsers, addUser, updateUser, deleteUser } from "./redux/Action";

import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";
import FiltersPanel from "./components/FilterPanel";

// Initial sample data (can be kept here or in a separate config file)
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    description: "Content Creator specializing in tech reviews.",
    languages: "English, Hindi",
    education: "B.Sc. in Computer Science",
    specialization: "Tech Reviews, Gadgets",
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    imageUrl: "https://th.bing.com/th/id/OIP.leRaZskYpTKA55a0St0tZgHaJa?w=132&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    description: "UX Designer with 5 years of experience.",
    languages: "English, French",
    education: "M.A. in Design",
    specialization: "UI/UX, Product Design",
    twitter: "https://twitter.com/janesmith",
    instagram: "https://instagram.com/janesmith",
    imageUrl: "https://th.bing.com/th/id/OIP.leRaZskYpTKA55a0St0tZgHaJa?w=132&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    description: "Full-stack developer passionate about React and Node.js.",
    languages: "English, Spanish, JavaScript",
    education: "B.Tech in Information Technology",
    specialization: "Web Development, Mobile Apps",
    twitter: "https://twitter.com/alexj",
    instagram: "https://instagram.com/alexj",
    imageUrl: "https://th.bing.com/th/id/OIP.leRaZskYpTKA55a0St0tZgHaJa?w=132&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
];

const App = () => {
  // Redux state and dispatch
  const users = useSelector((state) => state);
  const dispatch = useDispatch();
  

  // Local storage hook
  const [storedUsers, setStoredUsers] = useLocalStorage("users", initialUsers);

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    languages: [],
    education: [],
    specialization: [],
  });
  const [showFilters,  setShowFilters] = useState(false);
console.log(showFilters)
  // Load users from localStorage on mount
  useEffect(() => {
    dispatch(setUsers(storedUsers));
  }, [dispatch, storedUsers]);

  // Update localStorage when users change
  useEffect(() => {
    if (users.length > 0) {
      setStoredUsers(users);
    }
  }, [users, setStoredUsers]);

  // Handle form submission
  const handleSubmit = (formData) => {
    if (editUser) {
      dispatch(updateUser({ ...formData, id: editUser.id }));
    } else {
      dispatch(addUser(formData));
    }

    setShowForm(false);
    setEditUser(null);
  };

  // Handle form cancel
  const handleCancel = () => {
    setShowForm(false);
    setEditUser(null);
  };

  // Handle edit user
  const handleEdit = (user) => {
    setEditUser(user);
    setShowForm(true);
  };

  // Handle delete user
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  // Toggle filter selection
  const toggleFilter = (category, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[category] = [...updatedFilters[category], value];
      }
      return updatedFilters;
    });
  };
console.log(users)
  // Apply filters and search
  const filteredUsers = users.filter((user) => {
    // Search filter
    const searchMatch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filters
    const languageMatch =
      filters.languages.length === 0 ||
      filters.languages.some((lang) =>
        user.languages.toLowerCase().includes(lang.toLowerCase())
      );

    const educationMatch =
      filters.education.length === 0 ||
      filters.education.some((edu) =>
        user.education.toLowerCase().includes(edu.toLowerCase())
      );

    const specializationMatch =
      filters.specialization.length === 0 ||
      filters.specialization.some((spec) =>
        user.specialization.toLowerCase().includes(spec.toLowerCase())
      );

    return (
      searchMatch && languageMatch && educationMatch && specializationMatch
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Advanced Profile Manager</h1>
          <button
            className="bg-white text-indigo-600 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-100 transition-colors"
            onClick={() => {
              setEditUser(null);
              setShowForm(true);
            }}
          >
            <UserPlus size={18} />
            Add User
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, description, or specialization"
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <FiltersPanel
              showFilters={showFilters}
              allUsers={users}
              filters={filters}
              toggleFilter={toggleFilter}
            />
          )}
        </div>

        {/* User Form Modal */}
        {showForm && (
          <UserForm
            user={editUser}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p className="text-xl font-medium">No profiles found</p>
              <p className="mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
