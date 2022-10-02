<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useFileStore } from './../stores/file';
    import { useSettingStore } from './../stores/settings';

    const fileSelector : any = ref(null);
    const file : any = ref(null);
    const fileStore = useFileStore();
    const settingStore = useSettingStore();

    const openFileSelector = () => {
        fileSelector.value.click();
    }

    const handleFileSelect = (e : any) => {
        file.value = e.target.files[0];
    }

    const handleDrop = (e : any) => {
        if (e.dataTransfer.items) {
            const item = e.dataTransfer.items[0];
            if (item.kind === 'file') {
                file.value = item.getAsFile();
            }
        } else {
            file.value = e.dataTransfer.files[0];
        }
    }

    watch(file, () => {
        if (!file) {
            return;
        }

        fileStore.setFile(file.value);
        settingStore.setDropzoneVisibility(false);
        settingStore.setOpenFileSelector(false);
    });

    watch(settingStore, () => {
        if (settingStore.openFileSelector === true) {
            openFileSelector();
        }
    })
</script>

<template>
    <div class="dropzone" id="dropzone" @click="openFileSelector" @dragover.prevent.stop @drop.prevent.stop="handleDrop" v-show="settingStore.dropzoneVisibility">
        <input 
            @change="handleFileSelect"
            ref="fileSelector"
            type="file" 
            accept="image/png,image/gif,image/jpeg,image/jpg,image/webp" 
            hidden
        />
        <p class="drag-and-drop-text">Drag and drop image here</p>
        <small class="file-selector-text">or click to open file selector</small>
    </div>
</template>

<style scoped>
.dropzone {
    padding: 100px 50px;
    border-radius: 5px;
    border: 1px dashed rgb(167, 167, 167);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.dropzone:hover, .active-dropzone {
    cursor: pointer;
    border-color: #1d80d1;
}
.dropzone:hover .drag-and-drop-text, .dropzone:hover .file-selector-text, .active-dropzone .drag-and-drop-text, .active-dropzone .file-selector-text {
    color: #1d80d1;
}
.dropzone p {
    font-size: 24px !important;
    color: rgb(82, 81, 81);
}
.dropzone small {
    font-size: 14px !important;
    color: rgb(82, 81, 81);
    margin-top: 8px;
}
</style>
