<script setup lang="ts">
    import { ref, computed } from 'vue';
    import PaintCard from '@/components/PaintCard.vue';
    import { usePaintStore } from '@/stores/paintStore';
    import { storeToRefs } from 'pinia';

    const paintStore = usePaintStore()
    const { mappedPaints } = storeToRefs(paintStore)

    const searchRes = ref('');
    const paintLine = ref<number[]>([]);
    const colorCatagory = ref<number[]>([]);

    const filteredPaints = computed(() => {
        return mappedPaints.value.filter(paint => {
            if (!searchRes.value) {
                return true;
            }
            return paint.name.toLowerCase().includes(searchRes.value.toLowerCase()) ||
                paint.manufacturer.name.toLowerCase().includes(searchRes.value.toLowerCase()) ||
                paint.paintline.name.toLowerCase().includes(searchRes.value.toLowerCase())
        }).filter(paint => {
            if (!paintLine.value?.length) {
                return true;
            }
            return paintLine.value.includes(paint.paintlines_id)
        }).filter(paint => {
            if (!colorCatagory.value?.length) {
                return true;
            }

            return paint.color_catagories.some((cc) => {
                return colorCatagory.value.includes(cc)
            })

        })
    })


</script>
<template>
    <div class="flex gap-3">
        <FormKit label="Search paints"
                 placeholder="Search"
                 v-model="searchRes"
                 type="search"></FormKit>
        <FormKit type="select"
                 label="Paint line"
                 multiple
                 v-model="paintLine"
                 :options="paintStore.fkPaintLineFilterOptions"></FormKit>
        <FormKit type="select"
                 label="Color catagory"
                 multiple
                 v-model="colorCatagory"
                 :options="paintStore.fkColorCatagoryOptions"></FormKit>
    </div>
    <TransitionGroup name="list"
                     tag="ul"
                     class="paint-container">
        <li v-for="paint in filteredPaints"
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