import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    isVisible: false,
    title: '',
    message: '',
    color: '',
    router: useRouter(),
  }),
  actions: {
    showDialog(title: string, message: string | '', color: string) {
      this.isVisible = true;
      this.title = title;
      this.message = message;
      this.color = color;
    },
    hideDialog() {
      this.isVisible = false;
      this.router.back();
    },
  },
});
