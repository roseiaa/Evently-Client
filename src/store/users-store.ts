import {create} from "zustand"
import type { UserInterface } from "../interfaces"

const usersGlobalStore = create((set) => ({
    currentUser: null,
    setCurrentUser: (user: UserInterface) => set({currentUser: user})
}))

export default usersGlobalStore

export interface usersStoreType {
    currentUser: UserInterface | null;
    setCurrentUser: (user: UserInterface) => void
}