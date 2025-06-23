import { IUsuario } from "../types/IUsuario";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "../types/enums/Role.enum";

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
    }),
    {
      name: "user-store",
    }
  )
);
