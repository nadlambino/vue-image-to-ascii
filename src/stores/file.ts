import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFileStore = defineStore('file', () => {
    const file = ref(null);

    function setFile(selectedFile: any) {
        file.value = selectedFile;
    }

    return { file, setFile }
})
