<script setup lang="ts">
    import PaintCard from '@/components/PaintCard.vue';
    import { usePaintStore } from '@/stores/paintStore';
    import { storeToRefs } from 'pinia';

    const paintStore = usePaintStore()
    const { myPaints } = storeToRefs(paintStore)

</script>
<template>
    <TransitionGroup name="list"
                     tag="ul"
                     class="paint-container">
        <li v-for="paint in myPaints"
            :key="paint.id">
            <PaintCard :paint="paint"></PaintCard>
        </li>
    </TransitionGroup>
</template>

<style scoped lang="scss">
.paint-container {
    display: grid;
    gap: 1rem;
    display: grid;
    grid-template-rows: auto;
    grid-auto-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

}
</style>