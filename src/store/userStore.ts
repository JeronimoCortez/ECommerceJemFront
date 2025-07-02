import { IUsuario } from "../types/IUsuario";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "../types/enums/Role.enum";
import { IEditProfileUser } from "../types/IEditProfileUser";
import { IDireccion } from "../types/IDireccion";

interface IUserStore {
  users: IUsuario[];
  userActive: IUsuario | null;
  setUserActive: (userActive: IUsuario | null) => void;
  setUsers: (updater: IUsuario[] | ((prev: IUsuario[]) => IUsuario[])) => void;
  addUser: (user: IUsuario) => void;
  editUser: (userUpdate: IUsuario) => void;
  deleteUser: (id: number) => void;
  darAlta: (id: number) => void;
  appendUsers: (newUsers: IUsuario[]) => void;
  modificarRol: (idUsuario: number) => void;
  editProfileUser: (idUsuario: number, data: IEditProfileUser) => void;
  añadirDireccion: (idUsuario: number, direccion: IDireccion) => void;
  editarDireccionUsuario: (idUsuario: number, direccion: IDireccion) => void;
}

export const userStore = create<IUserStore>()(
  persist(
    (set) => ({
      users: [],
      userActive: null,

      setUserActive: (userIn) => set(() => ({ userActive: userIn })),

      setUsers: (updater) =>
        set((state) => ({
          users: typeof updater === "function" ? updater(state.users) : updater,
        })),

      appendUsers: (newUsers) =>
        set((state) => {
          const existingIds = new Set(state.users.map((u) => u.id));
          const filteredNewUsers = newUsers.filter(
            (u) => !existingIds.has(u.id)
          );
          return {
            users: [...state.users, ...filteredNewUsers],
          };
        }),
      addUser: (newUser) =>
        set((state) => ({
          users: [...state.users, newUser],
        })),

      editUser: (userUpdate) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userUpdate.id ? { ...user, ...userUpdate } : user
          ),
        })),

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, activo: false } : user
          ),
        })),

      darAlta: (id) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, activo: true } : u
          ),
        })),
      modificarRol: (idUsuario) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === idUsuario
              ? u.rol === Role.ADMIN
                ? { ...u, rol: Role.USER }
                : { ...u, rol: Role.ADMIN }
              : u
          ),
        })),
      editProfileUser: (idUsuario, data) =>
        set((state) => {
          const updatedUsers = state.users.map((user) =>
            user.id === idUsuario ? { ...user, ...data, id: user.id } : user
          );

          const updatedActiveUser =
            state.userActive?.id === idUsuario
              ? { ...state.userActive, ...data }
              : state.userActive;

          return {
            users: updatedUsers,
            userActive: updatedActiveUser,
          };
        }),
      añadirDireccion: (idUsuario, direccion) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === idUsuario
              ? { ...u, direcciones: [...u.direcciones, direccion] }
              : u
          ),
          userActive:
            state.userActive?.id === idUsuario
              ? {
                  ...state.userActive,
                  direcciones: [...state.userActive.direcciones, direccion],
                }
              : state.userActive,
        }));
      },
      editarDireccionUsuario: (idUsuario, direccionActualizada) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === idUsuario
              ? {
                  ...u,
                  direcciones: u.direcciones.map((d) =>
                    d.id === direccionActualizada.id ? direccionActualizada : d
                  ),
                }
              : u
          ),
          userActive:
            state.userActive?.id === idUsuario
              ? {
                  ...state.userActive,
                  direcciones: state.userActive.direcciones.map((d) =>
                    d.id === direccionActualizada.id ? direccionActualizada : d
                  ),
                }
              : state.userActive,
        }));
      },
    }),
    {
      name: "user-store",
    }
  )
);
