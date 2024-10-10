import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref(false);
  const profile = ref(null);

  return {
    isAuthenticated,
    profile,
  };
});
