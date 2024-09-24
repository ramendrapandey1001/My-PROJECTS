import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Add from './components/adduser/Add';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NavigationBar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  const route = createBrowserRouter([
    {
      path: "/",
      element:  <Login setUser={setUser} />,
    },
    {
      path: "/add",
      element: <Add user={user} setUser={setUser}/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard user={user} setUser={setUser}/>,
    },
    {
      path: "/employeelist",
      element: <EmployeeList user={user} setUser={setUser}/>,
    },
  ]);

  return (
    <RouterProvider router={route}>
      <div className="App">
        <NavigationBar />
      </div>
    </RouterProvider>
  );
}

export default App;
