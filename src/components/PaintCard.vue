<script setup lang="ts">
    import { PaintWithPaintLineManufacturer, usePaintStore } from "@/stores/paintStore";
    import { useAwaitLoading } from "@/utilities";

    const paintStore = usePaintStore();
    const { isLoading, awaitLoading } = useAwaitLoading();

    defineProps<{
        paint: PaintWithPaintLineManufacturer;
    }>();
</script>

<template>
    <div class="cb-c-card">
        <div class="cb-c-card__swatch"
             :style="`--card-bg: ${paint.color_code}`">

        </div>
        <div class="p-4">
            <h2 class="text-xl font-medium">{{ paint.name }}</h2>
            <dl>
                <dt>Manufacturer:</dt>
                <dd>{{ paint.manufacturer.name }}</dd>
                <dt>Paint line:</dt>
                <dd>{{ paint.paintline.name }}</dd>
                <dt v-if="paint.reference_code">Ref code:</dt>
                <dd v-if="paint.reference_code">{{ paint.reference_code }}</dd>
            </dl>
            <button class="p-2 rounded-sm bg-lime-500"
                    @click="awaitLoading(paintStore.addPaintToCollection(paint.id))"
                    v-if="!paintStore.paintIdInCollection(paint.id)">
                <i class="fas fa-plus"></i>
                <i v-if="isLoading"
                   class="fa-spin fas fa-arrows-rotate"
                   style="--fa-animation-duration:0.5s"></i>
                <i v-else
                   class="fa-kit fa-paint-dropper"></i>
            </button>
            <button v-else
                    @click="awaitLoading(paintStore.deletePaintFromCollection(paint.id))"
                    class="p-2 rounded-sm bg-rose-500">
                <i class="fas fa-xmark"></i>
                <i v-if="isLoading"
                   class="fa-spin fas fa-arrows-rotate"
                   style="--fa-animation-duration:0.5s"></i>
                <i v-else
                   class="fa-kit fa-paint-dropper"></i>
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cb-c-card {
    --card-bg: #fff; //
    --shadow-color: rgba(0, 0, 0, 0.2);
    background-color: white;
    overflow: hidden;
    filter: drop-shadow(0 0 0.25rem var(--shadow-color));
    border: 1px solid var(--shadow-color);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    height: 100%;
}

dt {
    font-weight: bold;
    font-size: 0.875rem;
}

button {
    position: absolute;
    top: 0;
    right: 0;
}

.cb-c-card__swatch {
    height: 10rem;
    background-color: var(--card-bg);
    border-bottom: 1px solid var(--shadow-color);
}
</style>