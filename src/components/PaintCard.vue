<script setup lang="ts">
    import { PaintWithPaintLineManufacturer } from "@/stores/paintStore";
    defineProps<{
        paint: PaintWithPaintLineManufacturer;
    }>();
</script>

<template>
    <div>
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
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cb-c-card {
    --card-bg: #fff; //
    --shadow-color: rgba(0, 0, 0, 0.1);
    background-color: white;
    overflow: hidden;
    filter: drop-shadow(0 0 0.75rem var(--shadow-color));
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

dt {
    font-weight: bold;
    font-size: 0.875rem;
}

.cb-c-card__swatch {
    height: 10rem;
    background-color: var(--card-bg);
    border-bottom: 1px solid var(--shadow-color);
}
</style>