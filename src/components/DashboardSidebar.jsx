import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  FaTasks,
  FaTrash,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-lg font-semibold text-gray-900 flex items-center">
            <FaTasks className="mr-2" />
            Dashboard
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>


        <nav className="mt-4">
          <Link
            to="/dashboard/task"
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 ${isActive('/dashboard/task') ? 'bg-blue-50 border-r-4 border-blue-500' : ''
              }`}
          >
            <FaTasks className="mr-3" />
            Mis Tareas
          </Link>
          <Link
            to="/dashboard/task/trash"
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 ${isActive('/dashboard/task/trash') ? 'bg-blue-50 border-r-4 border-blue-500' : ''
              }`}
          >
            <FaTrash className="mr-3" />
            Papelera
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t flex flex-col items-center">
          {user && (
            <div className="w-full mb-3 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg text-center truncate">
              {user.email}
            </div>
          )}
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            Cerrar sesión
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
