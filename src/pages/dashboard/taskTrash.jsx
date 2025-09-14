import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { getInactiveTasks, deleteTask } from "../../services/task";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "../../components/ConfirmModal";

export default function TaskTrash() {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const fetchDeletedTasks = async () => {
      try {
        const tasks = await getInactiveTasks();
        const inactiveTasks = tasks.filter(task => !task.activa);
        setDeletedTasks(inactiveTasks);
      } catch (err) {
        setError(err.message || "Error al cargar la papelera");
      } finally {
        setLoading(false);
      }
    };

    fetchDeletedTasks();
  }, []);

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await deleteTask(taskToDelete._id);
      setDeletedTasks(prevTasks => 
        prevTasks.filter(task => task._id !== taskToDelete._id)
      );
    } catch (error) {
      console.error("❌ Error eliminando tarea permanentemente:", error);
    } finally {
      setShowConfirmModal(false);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setTaskToDelete(null);
  };

  if (loading) return <DashboardLayout title="Papelera"><p>Cargando...</p></DashboardLayout>;
  if (error) return <DashboardLayout title="Papelera"><p>Error: {error}</p></DashboardLayout>;

  return (
    <DashboardLayout title="Papelera">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Tareas Eliminadas</h2>

        <div className="space-y-3">
          {deletedTasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-900 font-medium line-through">{task.titulo}</span>
                  <p className="text-sm text-gray-500">
                    Eliminada el {new Date(task.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDeleteClick(task)}
                  className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Eliminar permanentemente"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {deletedTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🗑️</div>
            <p className="text-gray-500 text-lg">La papelera está vacía</p>
            <p className="text-gray-400 text-sm mt-2">
              Las tareas eliminadas aparecerán aquí
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar permanentemente"
        message={`¿Estás seguro de que quieres eliminar permanentemente la tarea "${taskToDelete?.titulo}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </DashboardLayout>
  );
}
