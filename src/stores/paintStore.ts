import { defineStore } from "pinia";
import { ref, computed, ComputedRef } from "vue";
import { set, useLocalStorage } from "@vueuse/core";
import {
    type Collection,
    type Paint,
    type Manufacturer,
    type PaintLine,
    type ColorCatagory,
} from "@/api/_apiTypes";

import {
    addPaintToCollection as apiAddPaintToCollection,
    deletePaintFromCollection as apiDeletePaintFromCollection,
} from "@/api/paint";

import { refreshStore } from "@/utilities/mapApiStore";

export type PaintWithPaintLineManufacturer = Paint & {
    paintline: PaintLine;
    manufacturer: Manufacturer;
};

export const usePaintStore = defineStore("paint", () => {
    const manufacturers = useLocalStorage(
        "cb-manufacturers",
        ref<Manufacturer[]>([])
    );
    const paintlines = useLocalStorage("cb-paintlines", ref<PaintLine[]>([]));
    const colorcatagories = useLocalStorage(
        "cb-colorcatagories",
        ref<ColorCatagory[]>([])
    );
    const paints = useLocalStorage("cb-paints", ref<Paint[]>([]));
    const collection = useLocalStorage("cb-collection", ref<Collection[]>([]));

    function refreshAll() {
        return Promise.all([
            refreshStore("manufacturers"),
            refreshStore("paintlines"),
            refreshStore("colorcatagories"),
            refreshStore("paints"),
            refreshStore("collection"),
        ]);
    }

    // Paintlines with manufacturer
    const mappedPaintLines = computed(() => {
        return paintlines.value.map((pl) => {
            return {
                ...pl,
                manufacturer: manufacturers.value.find(
                    (m) => m.id === pl.manufacturers_id
                )!,
            };
        });
    });

    const fkColorCatagoryOptions = computed(() => {
        return colorcatagories.value.map((cc) => {
            return {
                value: cc.id,
                label: cc.name,
            };
        });
    });

    // Filter options for paintlines for use in FormKit
    const fkPaintLineFilterOptions = computed(() => {
        return manufacturers.value.map((man) => {
            return {
                group: man.name,
                options: paintlines.value
                    .filter((pl) => pl.manufacturers_id === man.id)
                    .map((pl) => {
                        return {
                            value: pl.id,
                            label: pl.name,
                        };
                    }),
            };
        });
    });

    // Paints with paintline and manufacturer
    const mappedPaints: ComputedRef<PaintWithPaintLineManufacturer[]> =
        computed(() => {
            return paints.value.map((paint) => {
                return {
                    ...paint,
                    manufacturer: mappedPaintLines.value.find(
                        (mpl) => mpl.id === paint.paintlines_id
                    )!.manufacturer,
                    paintline: paintlines.value.find(
                        (pl) => pl.id === paint.paintlines_id
                    )!,
                };
            });
        });

    // Paints user has in collection
    const myPaints = computed(() => {
        return collection.value.map(
            (ci) => mappedPaints.value.find((p) => p.id === ci.paints_id)!
        );
    });

    // Check if paint is in collection by paintId
    function paintIdInCollection(paintId: number) {
        return collection.value.some((ci) => ci.paints_id === paintId);
    }

    async function deletePaintFromCollection(
        paints_id: Parameters<
            typeof apiDeletePaintFromCollection
        >[0]["paints_id"]
    ) {
        try {
            const res = await apiDeletePaintFromCollection({ paints_id });
            if (res) {
                collection.value = collection.value.filter(
                    (ci) => ci.paints_id !== paints_id
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function addPaintToCollection(
        paints_id: Parameters<typeof apiAddPaintToCollection>[0]["paints_id"]
    ) {
        try {
            const res = await apiAddPaintToCollection({ paints_id });
            if (res) {
                collection.value.push(res);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        manufacturers,
        paints,
        myPaints,
        paintlines,
        colorcatagories,
        collection,
        refreshAll,
        mappedPaintLines,
        mappedPaints,
        paintIdInCollection,
        addPaintToCollection,
        deletePaintFromCollection,
        fkPaintLineFilterOptions,
        fkColorCatagoryOptions,
    };
});
