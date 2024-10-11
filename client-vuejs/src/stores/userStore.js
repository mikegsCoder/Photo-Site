import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref(false);
  const profile = ref(null);

  function setProfile(profileData) {
    profile.value = profileData;
    isAuthenticated.value = true;
    sessionStorage.setItem('user-profile', JSON.stringify(profileData));
  }

  function getPersistedProfile() {
    const persisted = sessionStorage.getItem('user-profile');
    if (!persisted)
      return;
    profile.value = JSON.parse(persisted);
    isAuthenticated.value = true;
  }

  return {
    isAuthenticated,
    profile,
    setProfile,
    getPersistedProfile,
  };
});
