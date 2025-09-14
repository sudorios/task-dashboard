import { useState, useEffect } from "react";
import { getTasks, postTask, softDeleteTask, markDone } from "../../services/task";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import DashboardLayout from "../../components/DashboardLayout";
import TaskModal from "../../components/TaskModal";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "media"
  });

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

  const openModalNewTask = () => {
    setFormData({ titulo: "", descripcion: "", prioridad: "media" });
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const openModalEditTask = (task) => {
    setFormData({
      titulo: task.titulo,
      descripcion: task.descripcion,
      prioridad: task.prioridad
    });
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSaveTask = async (data) => {
    try {
      if (taskToEdit) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === taskToEdit._id
              ? { ...task, ...data }
              : task
          )
        );
      } else {
        const newTask = await postTask(data);
        setTasks(prevTasks => [...prevTasks, newTask]);
      }
    } catch (err) {
      console.error("❌ Error guardando tarea:", err);
    } finally {
      closeModal();
    }
  };

  const deleteTask = async (id) => {
    try {
      await softDeleteTask(id);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === id ? { ...task, activa: false } : task
        )
      );
    } catch (err) {
      console.error("❌ Error al enviar tarea a papelera:", err);
    }
  };

  const handleMarkDone = async (id) => {
    try {
      const updatedTask = await markDone(id);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === id
            ? { ...task, ...updatedTask }
            : task
        )
      );
    } catch (error) {
      console.error("❌ Error al marcar tarea como hecha:", error);
    }
  };

  if (loading) return <DashboardLayout title="Mis Tareas"><p>Cargando tareas...</p></DashboardLayout>;
  if (error) return <DashboardLayout title="Mis Tareas"><p className="text-red-600">{error}</p></DashboardLayout>;

  return (
    <DashboardLayout title="Mis Tareas">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Mis Tareas</h2>
          <button onClick={openModalNewTask} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FaPlus className="mr-2" /> Nueva Tarea
          </button>
        </div>

        <div className="space-y-2">
          {tasks.filter(task => task.activa).map(task => (
            <div key={task._id} className={`flex items-center justify-between p-3 rounded-lg border ${task.hecha ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
              <div className="flex flex-col">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.hecha}
                    onChange={() => handleMarkDone(task._id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={task.hecha ? "line-through text-gray-500" : "text-gray-900"}>{task.titulo}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${task.prioridad === 'alta' ? 'bg-red-100 text-red-800' : task.prioridad === 'media' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {task.prioridad}
                      </span>
                    </div>
                    {task.descripcion && <p className="text-sm text-gray-600 mt-1">{task.descripcion}</p>}
                    <p className="text-xs text-gray-400 mt-1">Creado: {new Date(task.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => openModalEditTask(task)} className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors" title="Editar tarea"><FaEdit size={16} /></button>
                <button onClick={() => deleteTask(task._id)} className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors" title="Enviar a papelera"><FaTrash size={16} /></button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && <p className="text-gray-500 text-center py-8">No hay tareas. ¡Agrega una nueva tarea para comenzar!</p>}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        formData={formData}
        setFormData={setFormData}
      />
    </DashboardLayout>
  );
}
