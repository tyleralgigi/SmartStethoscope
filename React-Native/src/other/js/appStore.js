import create from 'zustand'

export const useStore = create(set => ({
  bears: 0,
  isLoggedIn: false,
  userValues: {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    acc_type: '',
    loading: true
  },
  typeOfRecording: 'Respiratory Examination',
  
  setUserValues:(userValues) => set({ userValues }),
  toogleLogIn: () => set(state => ({isLoggedIn: !state.isLoggedIn})),
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  setType: (type) => set({typeOfRecording: type})
}))