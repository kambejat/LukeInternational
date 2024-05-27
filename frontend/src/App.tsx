import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import axios from "axios";
import LoginPage from './components/pages/Login';
import PrivateRoute from './components/context/PrivateRoute';
import useAuth from './components/context/useAuth';
import Sidebar from './components/ui/Sidebar';
import MenuContent from './components/pages/Home/MenuContent';

axios.defaults.baseURL = "http://127.0.0.1:8000/";

const App: React.FC = () => {
  const [user, token] = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<number>(1);
  const navigate = useNavigate();

  const handleTabChange = (tabNumber: number) => {
    if (activeTab !== tabNumber) {
      setActiveTab(tabNumber);
      navigate(`/dashboard/${tabNumber}/1`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/dashboard/:activeTab/:subMenuTab" 
          element={
            <PrivateRoute>
              {user ? (
                <div className={`flex ${isSidebarOpen ? '' : ''}`}>
                  
                    <Sidebar 
                      handleTabChange={handleTabChange}
                      activeTab={activeTab}
                      isSidebarOpen={isSidebarOpen}
                    />
                 
                  <main className="p-4 bg-gray-100 w-full sm:ml-64">
                    <MenuContent activeTab={activeTab} handleTabChange={handleTabChange} />
                  </main>
                </div>
              ) : null}
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
