import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('settings', () => {
    const maxWidth = ref(100);
    const maxHeight = ref(100);
    const dropzoneVisibility = ref(true);
    const imageVisibility = ref(false);
    const asciiVisibility = ref(true);
    const fontSize = ref(5.0);
    const lineHeight = ref(1.0);
    const openFileSelector = ref(false);

    const toggleDropzoneVisibility = () => {
        dropzoneVisibility.value = !dropzoneVisibility.value;
    }

    const setDropzoneVisibility = (value: boolean) => {
        dropzoneVisibility.value = value;
    }

    const setImageVisibility = (value: boolean) => {
        imageVisibility.value = value;
    }

    const setAsciiVisibility = (value: boolean) => {
        asciiVisibility.value = value;
    }

    const setFontSize = (value: number) => {
        fontSize.value = value;
    }

    const setLineHeight = (value: number) => {
        lineHeight.value = value;
    }

    const setOpenFileSelector = (value: boolean) => {
        openFileSelector.value = value;
    }

    const getStyles = computed(() => {
        return {
            'font-size'     : `${fontSize.value}px`,
            'line-height'   : `${lineHeight.value}`
        }
    });

    return { 
        maxWidth, 
        maxHeight, 
        imageVisibility,
        asciiVisibility,
        dropzoneVisibility,
        fontSize,
        lineHeight,
        openFileSelector,
        setDropzoneVisibility, 
        setImageVisibility,
        setAsciiVisibility,
        setFontSize,
        setLineHeight,
        setOpenFileSelector,
        getStyles
    }
})
