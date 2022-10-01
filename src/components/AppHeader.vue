<script lang="ts" setup>

</script>

<template>
    <header>
        <div class="menu-item">
            <label>Show Image</label>
            <label class="switch">
                <input type="checkbox" id="show-image-toggle">
                <span class="slider"></span>
            </label>
        </div>
    </header>    
</template>

<style scoped>
header {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    height: 70px;
    padding: 10px;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 10px;
}
.menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: #5e5e5e;
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
input#show-image-toggle:checked + .slider {
    background-color: #2196F3;
    border: 1px solid #1d80d1;
}
input#show-image-toggle:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
}
input#show-image-toggle:checked + .slider:before {
    -webkit-transform: translateX(14px);
    -ms-transform: translateX(14px);
    transform: translateX(14px);
}

</style>