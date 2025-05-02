import { create } from 'zustand';

const useRefreshStore = create((set) => {
  const savedRefresh = JSON.parse(localStorage.getItem('refreshCart')) || false;

  return {
    refresh: savedRefresh,
    toggleRefresh: () =>
      set((state) => {
        const newValue = !state.refresh;
        localStorage.setItem('refreshCart', JSON.stringify(newValue));
        return { refresh: newValue };
      }),
  };
});

export default useRefreshStore;
