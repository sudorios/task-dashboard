import { useAuth } from "../../context/authContext";
import { useState, useEffect } from "react";
import { getTasks } from "../../services/task"; 

export default function Task() {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message || "Error al obtener tareas");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Cargando tareas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <h1 className="text-xl font-semibold text-gray-900">📋 Dashboard de Tareas</h1>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Mis Tareas</h2>

          {/* Lista de tareas */}
          <div className="space-y-2">
            {tasks.filter(task => task.activa).map((task) => (
              <div
                key={task._id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  task.hecha ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={task.hecha}
                      onChange={() => toggleTask(task._id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className={task.hecha ? "line-through text-gray-500" : "text-gray-900"}>
                      {task.titulo}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{task.descripcion}</p>
                  <p className="text-xs text-gray-400">
                    Creado: {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Enviar a papelera
                </button>
              </div>
            ))}
          </div>

          {tasks.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No hay tareas. ¡Agrega una nueva tarea para comenzar!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}