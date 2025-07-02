import { UserService } from "../services/userService";
import { userStore } from "../store/userStore";
import { useShallow } from "zustand/shallow";
import { IUsuario } from "../types/IUsuario";
import Swal from "sweetalert2";
import { ICreateUsuario } from "../types/ICreateUsuario";
import { IEditProfileUser } from "../types/IEditProfileUser";
import { IDireccion } from "../types/IDireccion";
import { DireccionService } from "../services/direccionService";

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
    modificarRol,
    editProfileUser,
    añadirDireccion,
    editarDireccionUsuario,
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
      modificarRol: state.modificarRol,
      editProfileUser: state.editProfileUser,
      añadirDireccion: state.añadirDireccion,
      editarDireccionUsuario: state.editarDireccionUsuario,
    }))
  );
  const getUsers = async (page: number, size: number = 9) => {
    try {
      const data = await userService.getUsers(page, size);

      if (data && Array.isArray(data.content)) {
        setUsers((prev: IUsuario[]) => {
          const newUsers = data.content.filter(
            (np) => !prev.some((pp) => pp.id === np.id)
          );
          return [...prev, ...newUsers];
        });
      } else {
        console.warn("La respuesta no contiene 'content' como array:", data);
      }

      return data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
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

  const createUser = async (userData: Omit<ICreateUsuario, "id">) => {
    try {
      const createdUser = await userService.create(userData);
      if (createdUser) {
        addUser(createdUser);
        Swal.fire("Éxito", "Usuario creado correctamente", "success");
        return createdUser;
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  };

  const updateUser = async (id: number, userUpdate: Partial<IUsuario>) => {
    const previousState = users.find((u) => u.id === id);
    try {
      const updatedUser = await userService.update(id, userUpdate);
      if (updatedUser) {
        editUser(updatedUser);
        Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
        return updatedUser;
      }
    } catch (error) {
      if (previousState) editUser(previousState);
      console.error("Error al actualizar usuario:", error);
      Swal.fire(
        "Error",
        "No se pudo actualizar el usuario, verifique los datos ingresados",
        "error"
      );
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

  const modificarRolHook = async (idUsuario: number) => {
    const confirm = await Swal.fire({
      title: "¿Estas seguro que desea modificar el rol?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, modificar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      await userService.modificarRol(idUsuario);
      modificarRol(idUsuario);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const changePassword = async (
    idUser: number,
    contrasenia: string,
    nuevaContrasenia: string
  ) => {
    try {
      await userService.changePassword(idUser, contrasenia, nuevaContrasenia);
    } catch (error) {
      Swal.fire("Error", "Verifique los datos ingresados", "error");
      console.error("Error: ", error);
    }
  };

  const editProfileHook = async (idUser: number, data: IEditProfileUser) => {
    try {
      await userService.editProfile(idUser, data);
      editProfileUser(idUser, data);
      Swal.fire("Editado", "El usuario ha sido editado con exito", "success");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const añadirDireccionHook = async (idUser: number, direccion: IDireccion) => {
    try {
      await userService.añadirDireccion(idUser, direccion);
      añadirDireccion(idUser, direccion);
      Swal.fire("Editado", "La direccion ha sido creada con exito", "success");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const editarDireccionUsuarioHook = async (
    idUser: number,
    direccion: IDireccion
  ) => {
    const direccionService = new DireccionService();
    try {
      await direccionService.updateDireccion(direccion);
      editarDireccionUsuario(idUser, direccion);
      Swal.fire("Editado", "La direccion ha sido editada con exito", "success");
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
    setUserActive,
    altaUsuario,
    modificarRolHook,
    changePassword,
    editProfileHook,
    añadirDireccionHook,
    editarDireccionUsuarioHook,
  };
};

export default useUser;
