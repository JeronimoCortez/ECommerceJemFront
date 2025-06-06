import { IUsuario } from "../types/IUsuario";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserStore {
  users: IUsuario[];
  userActive: IUsuario | null;
  setUserActive: (userActive: IUsuario | null) => void;
  setUsers: (users: IUsuario[]) => void;
  addUser: (user: IUsuario) => void;
  editUser: (userUpdate: IUsuario) => void;
  deleteUser: (id: number) => void;
}

export const userStore = create<IUserStore>()(
  persist(
    (set) => ({
      users: [],
      userActive: null,
      setUserActive: (userIn) => set(() => ({ userActive: userIn })),
      setUsers: (usersArray) => set(() => ({ users: usersArray })),
      addUser: (newUser) =>
        set((state) => ({ users: [...state.users, newUser] })),
      editUser: (userUpdate) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userUpdate.id ? { ...user, ...userUpdate } : user
          ),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),
    }),
    {
      name: "user-store",
    }
  )
);
