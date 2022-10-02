<script setup lang="ts">
import ImageUploader from "./components/ImageUploader.vue";
import ImagePreview from "./components/ImagePreview.vue";
import AppMenu from "./components/AppMenu.vue";
</script>

<template>
    <AppMenu />
    <div class="container">
        <ImageUploader />
        <ImagePreview />
    </div>
</template>
