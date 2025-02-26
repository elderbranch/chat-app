import create from "zustand";

const useUserStore = create((set) => ({
  chosenUser: null,
  
  setChosenuser: (userId) => set({ chosenUser: userId }),
}));