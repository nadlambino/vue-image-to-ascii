<script lang="ts" setup>
    import { useSettingStore } from '@/stores/settings';
    import { ref, watch } from 'vue';

    const settingStore = useSettingStore();
    const showImageToggle = ref(settingStore.imageVisibility);
    const showAsciiToggle = ref(settingStore.asciiVisibility);
    const fontSize = ref(settingStore.fontSize);
    const lineHeight = ref(settingStore.lineHeight);

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
</script>

<template>
    <header>
        <div class="menu-item">
            <small>Choose Image</small>
            <button type="button" class="button" @click="settingStore.setOpenFileSelector(true)">Select File</button>
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
    </header>    
</template>

<style scoped>
header {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    height: 70px;
    padding: 10px;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 10px;
    width: 100%;
    z-index: 100;
    position: fixed;
    background-color: #fff;
}
.menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #5e5e5e;
    position: relative;
}
small {
    text-transform: uppercase;
    font-size: 10px;
}
.input {
    height: 20px;
    border: 1px solid #929292;
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
    background-color: #a7a7a7;
    -webkit-transition: .4s;
    transition: .4s;
    border: 1px solid #929292;
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
}
</style>