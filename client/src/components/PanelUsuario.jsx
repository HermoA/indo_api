import { useEffect } from "react";
import listUsuarios from "../store/UserEstore";
import userIcon from "../assets/user_icon.svg";
import { IoClose } from "react-icons/io5";

function PanelUsuario() {
  const { users, loading, fetchUsers, delUser, updateRol } = listUsuarios();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando usuarios...</p>;

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmDelete) {
      delUser(id);
    }
  };

  return (
    <div className="w-full p-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((usuarios) => (
          <div
            key={usuarios.id_usuario}
            className="p-4 bg-black bg-opacity-30 rounded-xl flex items-start gap-4 relative"
          >
            <button
              onClick={() => handleDelete(usuarios.id_usuario)}
              className="text-xl absolute top-2 right-2 hover:text-red-600 transition-all"
            >
              <IoClose />
            </button>

            <img src={userIcon} className="w-14 h-14 object-contain" alt="Usuario" />

            <div className="flex-1 text-sm">
              <h2 className="font-semibold text-white">{usuarios.nombre_usuario}</h2>
              <p className="text-gray-300 text-xs break-words">{usuarios.email_usuario}</p>

              <select
                className="mt-2 p-1 rounded bg-black bg-opacity-40 text-white text-sm w-full"
                value={usuarios.rol}
                onChange={(e) => updateRol(usuarios.id_usuario, e.target.value)}
              >
                <option value="usuario">Usuario</option>
                <option value="editor">Editor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelUsuario;
