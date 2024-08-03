<script setup lang="ts">
    import { pageTitle } from '@/router/index'
    import TheMainMenu from '@/components/TheMainMenu.vue';

</script>
<template>
    <TheMainMenu />
    <h1 class="text-3xl mb-3">{{ pageTitle }}</h1>
    <router-view></router-view>
</template>
