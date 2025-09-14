import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginService } from "../services/auth";

export default function Login() {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await loginService(email, password);
      login(data);

      navigate("/dashboard/task");

    } catch (err) {
      setError(err.message || "Error en el login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#003DA5]">Bienvenido</h1>
          <p className="mt-2 text-sm text-gray-500">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@correo.com"
              className="w-full mt-1 px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003DA5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full mt-1 px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003DA5]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full px-4 py-2 text-white font-semibold rounded-lg bg-[#003DA5] hover:bg-[#002b73] shadow transition-all disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          ¿No tienes cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-medium text-[#FF6C00] hover:text-[#e55f00] underline"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
