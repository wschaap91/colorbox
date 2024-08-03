import { RemovableRef } from "@vueuse/core";
import { useAuthStore } from "@/stores/authStore";
import { usePaintStore } from "@/stores/paintStore";
import { storeToRefs } from "pinia";

import { getMe } from "@/api/auth";
import {
    getCollection,
    getColorCatagories,
    getManufacturers,
    getPaintLines,
    getPaints,
} from "@/api/paint";

type ApiStoreMap = {
    me: {
        store: RemovableRef<ReturnType<typeof useAuthStore>["me"]>;
        api: typeof getMe;
    };
    paints: {
        store: RemovableRef<ReturnType<typeof usePaintStore>["paints"]>;
        api: typeof getPaints;
    };
    paintlines: {
        store: RemovableRef<ReturnType<typeof usePaintStore>["paintlines"]>;
        api: typeof getPaintLines;
    };
    manufacturers: {
        store: RemovableRef<ReturnType<typeof usePaintStore>["manufacturers"]>;
        api: typeof getManufacturers;
    };
    colorcatagories: {
        store: RemovableRef<
            ReturnType<typeof usePaintStore>["colorcatagories"]
        >;
        api: typeof getColorCatagories;
    };
    collection: {
        store: RemovableRef<ReturnType<typeof usePaintStore>["collection"]>;
        api: typeof getCollection;
    };
};
type ApiStoreMapKey = keyof ApiStoreMap;

export async function refreshStore<T extends ApiStoreMapKey>(key: T) {
    const authStore = useAuthStore();
    const paintStore = usePaintStore();

    const { me } = storeToRefs(authStore);
    const { paints, paintlines, manufacturers, colorcatagories, collection } =
        storeToRefs(paintStore);

    const apiStoreMap: ApiStoreMap = {
        me: {
            store: me,
            api: getMe,
        },
        paints: {
            store: paints,
            api: getPaints,
        },
        paintlines: {
            store: paintlines,
            api: getPaintLines,
        },
        manufacturers: {
            store: manufacturers,
            api: getManufacturers,
        },
        colorcatagories: {
            store: colorcatagories,
            api: getColorCatagories,
        },
        collection: {
            store: collection,
            api: getCollection,
        },
    };

    const { store, api } = apiStoreMap[key as ApiStoreMapKey];
    try {
        const res = await api();
        store.value = res;
    } catch (e) {
        throw e;
    }
}
