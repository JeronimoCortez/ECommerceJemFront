import { UserService } from "../services/userService";
import { userStore } from "../store/userStore";
import { useShallow } from "zustand/shallow";
import { IUsuario } from "../types/IUsuario";
import Swal from "sweetalert2";
import { Role } from "../types/enums/Role.enum";

const userService = new UserService();

const useUser = () => {
  const {
    users,
    userActive,
    setUsers,
    setUserActive,
    addUser,
    editUser,
    deleteUser,
    darAlta,
  } = userStore(
    useShallow((state) => ({
      users: state.users,
      userActive: state.userActive,
      setUsers: state.setUsers,
      setUserActive: state.setUserActive,
      addUser: state.addUser,
      editUser: state.editUser,
      deleteUser: state.deleteUser,
      darAlta: state.darAlta,
    }))
  );

  const getUsers = async (page: number, size: number = 9) => {
    try {
      const data = await userService.getUsers(page, size);
      if (data) {
        setUsers((prev: IUsuario[]) => {
          const newProducts = data.content.filter(
            (np) => !prev.some((pp) => pp.id === np.id)
          );
          return [...prev, ...newProducts];
        });
      }
      return data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      Swal.fire("Error", "No se pudieron obtener los usuarios", "error");
      throw error;
    }
  };

  const getUserById = async (id: number) => {
    try {
      const data = await userService.getById(id);
      if (data) setUserActive(data);
      return data;
    } catch (error) {
      console.error(`Error al obtener usuario ${id}:`, error);
      Swal.fire("Error", `No se pudo obtener el usuario ${id}`, "error");
      throw error;
    }
  };

  const createUser = async (userData: Omit<IUsuario, "id">) => {
    try {
      const createdUser = await userService.create(userData);
      if (createdUser) {
        addUser(createdUser);
        Swal.fire("Éxito", "Usuario creado correctamente", "success");
        return createdUser;
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      Swal.fire("Error", "No se pudo crear el usuario", "error");
      throw error;
    }
  };

  const updateUser = async (id: number, userUpdate: Partial<IUsuario>) => {
    const previousState = users.find((u) => u.id === id);
    try {
      const updatedUser = await userService.update(id, userUpdate);
      if (updatedUser) {
        editUser(updatedUser);
        if (userActive?.id === id) setUserActive(updatedUser);
        Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
        return updatedUser;
      }
    } catch (error) {
      if (previousState) editUser(previousState);
      console.error("Error al actualizar usuario:", error);
      Swal.fire("Error", "No se pudo actualizar el usuario", "error");
      throw error;
    }
  };

  const deleteUserById = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirm.isConfirmed) return false;

    try {
      await userService.delete(id);
      deleteUser(id);
      if (userActive?.id === id) setUserActive(null);
      Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
      return true;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Swal.fire("Error", "No se pudo eliminar el usuario", "error");
      return false;
    }
  };

  const updateUserRole = async (id: number, role: Role) => {
    return updateUser(id, { rol: role });
  };

  const altaUsuario = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, activar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      await userService.darAlta(id);
      darAlta(id);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return {
    users,
    userActive,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
    updateUserRole,
    setUserActive,
    altaUsuario,
  };
};

export default useUser;
