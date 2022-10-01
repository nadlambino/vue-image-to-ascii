<script setup lang="ts">
import ImageUploader from "./components/ImageUploader.vue";
import ImagePreview from "./components/ImagePreview.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
    <AppHeader />
    <div class="container">
        <ImageUploader />
        <ImagePreview />
    </div>
</template>
