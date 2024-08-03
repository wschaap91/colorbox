<script setup lang="ts">
    import { useAuthStore } from '@/stores/authStore';
    import { usePaintStore } from '@/stores/paintStore';
    import { useRoute, RouterLink } from 'vue-router';

    const authStore = useAuthStore();
    const paintStore = usePaintStore();
    const route = useRoute();

    const menu = [
        { name: 'home', label: 'Home' },
        { name: 'paints', label: 'Paints' },
        { name: 'collection', label: 'Collection' },
    ];

</script>
<template>
    <ul class="flex gap-2 justify-between py-4 mb-4">
        <div class="flex gap-2">
            <li :class="[route.name === name ? 'font-bold text-primary-600' : '']"
                v-for="{ name, label } in menu"
                :key="name">
                <RouterLink :to="{ name }">{{ label }}</RouterLink>
            </li>
        </div>
        <div>
            <li class="flex gap-2">
                <button class="text-slate-300"
                        @click="paintStore.refreshAll"><i class="fas fa-arrows-rotate fa-spin"></i> Reload</button>
                <span>{{ authStore.me.name }}</span>
                <button @click="authStore.logout">Log uit</button>
            </li>
        </div>
    </ul>
</template>