<script setup lang="ts">
    import { useAuthStore } from '@/stores/authStore';
    import { usePaintStore } from '@/stores/paintStore';
    import { useRoute, RouterLink } from 'vue-router';
    import { useAwaitLoading } from '@/utilities/index';

    const authStore = useAuthStore();
    const paintStore = usePaintStore();
    const route = useRoute();

    const menu = [
        { name: 'home', label: 'Home' },
        { name: 'paints', label: 'Paints' },
        { name: 'collection', label: 'Collection' },
    ] as const;

    const { isLoading, awaitLoading } = useAwaitLoading();

    function refreshAll() {
        awaitLoading(paintStore.refreshAll());
    }

</script>
<template>
    <ul class="flex gap-2 justify-between py-4 mb-4">
        <div class="flex gap-2">
            <li :class="[route.name === name ? 'font-bold text-primary-600' : '']"
                v-for="{ name, label } in menu"
                :key="name">
                <RouterLink :to="{ name }"><i v-if="name === 'collection'"
                       class="fa-kit fa-paint-dropper"></i>{{ label }}</RouterLink>
            </li>
        </div>
        <div>
            <li class="flex gap-2">
                <button class="text-slate-700"
                        @click="refreshAll"><i class="fas fa-arrows-rotate"
                       :class="{ 'fa-spin': isLoading }"
                       style="--fa-animation-duration:0.5s"></i> Reload</button>
                <span>{{ authStore.me.name }}</span>
                <button @click="authStore.logout">Log uit</button>
            </li>
        </div>
    </ul>
</template>