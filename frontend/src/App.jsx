import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authUser";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { user, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck(); 
  }, [authCheck]);

  return (<div>
    
    <Routes>
    <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
    <Route path="/dashboard/*" element={user ? <Dashboard /> : <Navigate to="/login" />} />
    <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
    <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
    <Route path="/*" element={<Error />} />
    
    </Routes>
    <Toaster/>
  </div>
  );
};

export default App;
