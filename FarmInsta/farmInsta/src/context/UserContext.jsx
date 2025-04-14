import React, { createContext, useContext, useReducer, useEffect } from 'react';
 
import useLocalStorage from '../hooks/useLocalStorage';
import userReducer from '../redux/reducer';

// Initial sample data
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
    imageUrl: "/api/placeholder/150/150"
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
    imageUrl: "/api/placeholder/150/150"
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
    imageUrl: "/api/placeholder/150/150"
  }
];

 

// Create Context
const UserContext = createContext();

// Context Provider Component
export const UserProvider = ({ children }) => {
  const [storedUsers, setStoredUsers] = useLocalStorage('users', initialUsers);
  const [state, dispatch] = useReducer(userReducer, storedUsers);

  // Update localStorage when state changes
  useEffect(() => {
    if (state.length > 0) {
      setStoredUsers(state);
    }
  }, [state, setStoredUsers]);

  // Load from localStorage on initial render
  useEffect(() => {
    dispatch({ type: SET_USERS, payload: storedUsers });
  }, [storedUsers]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the User context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};