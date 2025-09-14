import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Task from "./pages/dashboard/task";
import TaskDone from "./pages/dashboard/taskDone";
import TaskTrash from "./pages/dashboard/taskTrash";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard/task"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/task/done"
          element={
            <ProtectedRoute>
              <TaskDone />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/task/trash"
          element={
            <ProtectedRoute>
              <TaskTrash />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
