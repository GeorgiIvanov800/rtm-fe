import { defineStore } from 'pinia';

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    isVisible: false,
    title: '',
    message: '',
    color: '',
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
    },
  },
});
