<template>
    <div>
        <header v-if="dead_snake">
            <img onclick="window.location.reload()" src="img/TBC.png">
        </header>
        <main v-for="m in arena_width" :id="m">
            <div v-for="n in arena_width" :id="m + '.' + n"></div>
        </main>
    </div>
</template>

<script type="text/javascript" src="./snake-ai.js"></script>
<style src="./snake-ai.scss" lang="scss" type="scoped"></style>

