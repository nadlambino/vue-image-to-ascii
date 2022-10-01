import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('settings', () => {
    const maxWidth = ref(100);
    const maxHeight = ref(100);
    const dropzoneVisibility = ref(true);

    const toggleDropzoneVisibility = () => {
        dropzoneVisibility.value = !dropzoneVisibility.value;
    }

    return { maxWidth, maxHeight, dropzoneVisibility, toggleDropzoneVisibility }
})
