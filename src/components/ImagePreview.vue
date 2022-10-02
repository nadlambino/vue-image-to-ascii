<script setup lang="ts">
    import { ref, watch, onMounted } from 'vue';
    import html2canvas from 'html2canvas';
    import { useFileStore } from './../stores/file';
    import { useSettingStore } from './../stores/settings';

    const fileStore = useFileStore();
    const settingStore = useSettingStore();
    const canvas : any = ref(null);
    const context : any = ref(null);
    const preview : any = ref(null);
    const grayRamp = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
    const rampLength = grayRamp.length;
    const canvasStyle = ref({});

    onMounted(() => {
        context.value = canvas.value.getContext("2d");
    });

    watch(fileStore, () => readSelectedFile());

    watch(settingStore, () => {
        canvasStyle.value = {
            width: `${preview.value.offsetWidth}px`,
            height: `${preview.value.offsetHeight}px`,
        }

        saveImage();
    });

    const saveImage = () => {
        if (settingStore.saveImage === false || fileStore.file === null) {
            return;
        }

        html2canvas(preview.value).then(function(previewCanvas) {
            const link = document.createElement("a");
            link.download = fileStore.file ? `ASCII-${fileStore.file['name']}` : `ASCII-${(new Date()).toISOString()}.png`;
            link.href = previewCanvas.toDataURL();
            link.click();
        });

        settingStore.setSaveImage(false);
    }

    const readSelectedFile = () => {
        const file = fileStore.file;
        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            const image = new Image();
            image.onload = () => {
                const [width, height] = clampDimensions(image.width, image.height);

                canvas.value.width = width;
                canvas.value.height = height;

                context.value.drawImage(image, 0, 0, width, height);
                const grayScales = convertToGrayScales(width, height);

                drawAscii(grayScales, width);
            }

            if (event && event.target && event.target.result) {
                image.src = event.target.result as string;
            }
        };

        reader.readAsDataURL(file);
    }

    const clampDimensions = (width : number, height : number) => {
        const rectifiedWidth = Math.floor(getFontRatio() * width);

        if (height > settingStore.maxHeight) {
            const reducedWidth = Math.floor(rectifiedWidth * settingStore.maxWidth / height);
            return [reducedWidth, settingStore.maxHeight];
        }

        if (width > settingStore.maxWidth) {
            const reducedHeight = Math.floor(height * settingStore.maxWidth / rectifiedWidth);
            return [settingStore.maxWidth, reducedHeight];
        }

        return [rectifiedWidth, height];
    };

    const getFontRatio = () => {
        const pre = document.createElement('pre');
        pre.style.display = 'inline';
        pre.textContent = ' ';

        document.body.appendChild(pre);
        const { width, height } = pre.getBoundingClientRect();
        document.body.removeChild(pre);

        return height / width;
    };

    const convertToGrayScales = (width : number, height : number) => {
        const imageData = context.value.getImageData(0, 0, width, height);
        const grayScales = [];

        for (let i = 0 ; i < imageData.data.length ; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];

            const grayScale = toGrayScale(r, g, b);
            imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;

            grayScales.push(grayScale);
        }

        context.value.putImageData(imageData, 0, 0);

        return grayScales;
    };

    const toGrayScale = (r : any, g : any, b : any) => {
        return 0.21 * r + 0.72 * g + 0.07 * b
    };

    const drawAscii = (grayScales : any, width : number) => {
        const ascii = grayScales.reduce((asciiImage : any, grayScale : any, index : any) => {
            let nextChars = getCharacterForGrayScale(grayScale);
            if ((index + 1) % width === 0) {
                nextChars += '\n';
            }

            return asciiImage + nextChars;
        }, '');

        preview.value.textContent = ascii;

        canvas.value.style.width = `${preview.value.offsetWidth}px`;
        canvas.value.style.height = `${preview.value.offsetHeight}px`;
    };
    
    const getCharacterForGrayScale = (grayScale : any) => {
        return grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];
    };
</script>

<template>
    <div class="preview-container">
        <pre ref="preview" id="preview" v-show="settingStore.asciiVisibility" :style="settingStore.getStyles"></pre>
        <canvas ref="canvas" v-show="settingStore.imageVisibility" :style="canvasStyle"></canvas>
    </div>
</template>

<style scoped>
pre {
    font-size: 5px;
    line-height: 0.9;
    z-index: 10;
}

canvas {
    position: absolute;
    z-index: 1;
}

.preview-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    width: 100%;
    overflow: scroll;
}
</style>
