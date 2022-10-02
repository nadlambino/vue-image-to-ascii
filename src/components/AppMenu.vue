<script lang="ts" setup>
    import { useSettingStore } from '@/stores/settings';
    import { onMounted, ref, watch } from 'vue';
    import { ColorPicker } from 'vue-color-kit'
    import 'vue-color-kit/dist/vue-color-kit.css'

    const settingStore = useSettingStore();
    const showImageToggle = ref(settingStore.imageVisibility);
    const showAsciiToggle = ref(settingStore.asciiVisibility);
    const fontSize = ref(settingStore.fontSize);
    const lineHeight = ref(settingStore.lineHeight);
    const isFontColorSwatchVisible = ref(false);
    const isBackgroundColorSwatchVisible = ref(false);

    watch(showImageToggle, () => {
        settingStore.setImageVisibility(showImageToggle.value)
    });

    watch(showAsciiToggle, () => {
        settingStore.setAsciiVisibility(showAsciiToggle.value);
    });

    watch(fontSize, () => {
        settingStore.setFontSize(fontSize.value);
    });

    watch(lineHeight, () => {
        settingStore.setLineHeight(lineHeight.value);
    });

    onMounted(() => {
        document.addEventListener('click', (e : any) => {
            e.stopPropagation();
            const box : any = document.getElementById('menu');
            if (!box.contains(e.target)) {
                isBackgroundColorSwatchVisible.value = false;
                isFontColorSwatchVisible.value = false;
            }
        })
    });

    const openFileSelector = () => {
        settingStore.setOpenFileSelector(true);
    }

    const saveImage = () => {
        settingStore.setSaveImage(true);
    }

    const toggleFontColorSwatch = () => {
        isBackgroundColorSwatchVisible.value = false;
        isFontColorSwatchVisible.value = !isFontColorSwatchVisible.value;
    }

    const toggleBackgroundColorSwatch = () => {
        isFontColorSwatchVisible.value = false;
        isBackgroundColorSwatchVisible.value = !isBackgroundColorSwatchVisible.value;
    }

    const changeFontColor = (color : any) => {
        const { r, g, b, a } = color.rgba;
        settingStore.setFontColor(`rgba(${r}, ${g}, ${b}, ${a})`);
    }

    const changeBackgroundColor = (color : any) => {
        const { r, g, b, a } = color.rgba;
        settingStore.setBackgroundColor(`rgba(${r}, ${g}, ${b}, ${a})`);
    }
</script>

<template>
    <div id="menu">
        <div class="menu-item">
            <button type="button" class="button" @click="openFileSelector">Select</button>
        </div>
        <div class="menu-item">
            <button type="button" class="button" @click="saveImage">Save</button>
        </div>
        <div class="menu-item">
            <small>Font</small>
            <button type="button" class="swatch-button" @click="toggleFontColorSwatch" 
                :style="{backgroundColor: settingStore.fontColor}">
            </button>
            <ColorPicker
                class="color-picker"
                v-show="isFontColorSwatchVisible"
                theme="light"
                :color="settingStore.fontColor"
                :colors-default="settingStore.colors"
                @changeColor="changeFontColor"
            />
        </div>
        <div class="menu-item">
            <small>Background</small>
            <button type="button" class="swatch-button" @click="toggleBackgroundColorSwatch" 
                :style="{backgroundColor: settingStore.backgroundColor}">
            </button>
            <ColorPicker
                class="color-picker"
                v-show="isBackgroundColorSwatchVisible"
                theme="light"
                :color="settingStore.backgroundColor"
                :colors-default="settingStore.colors"
                @changeColor="changeBackgroundColor"
            />
        </div>
        <div class="menu-item">
            <small>Image</small>
            <label class="switch">
                <input type="checkbox" class="toggle" v-model="showImageToggle">
                <span class="slider"></span>
            </label>
        </div>
        <div class="menu-item">
            <small>Ascii</small>
            <label class="switch">
                <input type="checkbox" class="toggle" v-model="showAsciiToggle">
                <span class="slider"></span>
            </label>
        </div>
        <div class="menu-item">
            <small>Font Size</small>
            <input type="number" class="input" v-model="fontSize" />
        </div>
        <div class="menu-item">
            <small>Line Height</small>
            <input type="number" class="input" v-model="lineHeight" />
        </div>
    </div>    
</template>

<style scoped>
.swatch-button {
    width: 21px;
    height: 21px;
    border: 1px solid #dddddd;
    border-radius: 3px;
}
.menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 8px;
    color: #5e5e5e;
    width: 50px;
}
small {
    text-transform: uppercase;
    font-size: 10px;
}
.input {
    height: 21px;
    border: 1px solid #dddddd;
    border-radius: 3px;
    width: 50px;
    padding: 5px;
    outline: none;
}
.switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 21px;
}
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 3px;
    background-color: #dddddd;
    -webkit-transition: .4s;
    transition: .4s;
    border: 1px solid #dddddd;
}
.slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    border-radius: 2px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}
input.toggle:checked + .slider {
    background-color: #2196F3;
    border: 1px solid #1d80d1;
}
input.toggle:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
}
input.toggle:checked + .slider:before {
    -webkit-transform: translateX(14px);
    -ms-transform: translateX(14px);
    transform: translateX(14px);
}
.button {
    background-color: #2196F3;
    border: 1px solid #1d80d1;
    color: #fff;
    padding: 2px 6px;
    border-radius: 3px;
    width: 55px;
    height: 21px;
}
input, button {
    cursor: pointer;
}
</style>