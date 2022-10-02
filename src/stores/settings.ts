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
    const saveImage = ref(false);
    const fontColor = ref('#000000');
    const backgroundColor = ref('#ffffff');
    const colors = ref([
        '#000000', 
        '#FFFFFF', 
        '#FF1900', 
        '#F47365', 
        '#FFB243', 
        '#FFE623', 
        '#6EFF2A', 
        '#1BC7B1', 
        '#00BEFF', 
        '#2E81FF', 
        '#5D61FF', 
        '#FF89CF', 
        '#FC3CAD', 
        '#BF3DCE', 
        '#8E00A7', 
        'rgba(0,0,0,0)'
    ])

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

    const setSaveImage = (value: boolean) => {
        saveImage.value = value;
    }

    const setFontColor = (value: string) => {
        fontColor.value = value;
    }

    const setBackgroundColor = (value: string) => {
        backgroundColor.value = value;
    }

    const getStyles = computed(() => {
        return {
            'font-size'         : `${fontSize.value}px`,
            'line-height'       : `${lineHeight.value}`,
            'color'             : fontColor.value,
            'background-color'  : imageVisibility.value === true ? 'transparent' : backgroundColor.value
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
        saveImage,
        fontColor,
        backgroundColor,
        colors,
        setDropzoneVisibility, 
        setImageVisibility,
        setAsciiVisibility,
        setFontSize,
        setLineHeight,
        setOpenFileSelector,
        setSaveImage,
        setFontColor,
        setBackgroundColor,
        getStyles
    }
})
