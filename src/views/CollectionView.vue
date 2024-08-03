<script setup lang="ts">
    import PaintCard from '@/components/PaintCard.vue';
    import { usePaintStore } from '@/stores/paintStore';
    import { storeToRefs } from 'pinia';

    const paintStore = usePaintStore()
    const { myPaints } = storeToRefs(paintStore)

</script>
<template>
    <div class="flex gap-2">
        <PaintCard v-for="paint in myPaints"
                   :paint="paint"
                   :key="paint.id"></PaintCard>
    </div>
</template>