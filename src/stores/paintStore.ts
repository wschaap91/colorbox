import { defineStore } from "pinia";
import { ref, computed, ComputedRef } from "vue";
import { useLocalStorage } from "@vueuse/core";
import {
    type Collection,
    type Paint,
    type Manufacturer,
    type PaintLine,
    type ColorCatagory,
} from "@/api/_apiTypes";

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
        refreshStore("manufacturers");
        refreshStore("paintlines");
        refreshStore("colorcatagories");
        refreshStore("paints");
        refreshStore("collection");
    }

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

    const myPaints = computed(() => {
        return collection.value.map(
            (ci) => mappedPaints.value.find((p) => p.id === ci.paints_id)!
        );
    });

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
    };
});
