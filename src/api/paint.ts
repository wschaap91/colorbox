import { apiCall } from "@/api/apiCall";
import {
    type Paint,
    type PaintLine,
    type Manufacturer,
    type Collection,
    type ColorCatagory,
} from "@/api/_apiTypes";

function getCollection() {
    return apiCall("/usercollections", "get", null, null) as Promise<
        Collection[]
    >;
}

function getPaints() {
    return apiCall("/paints", "get", null, null) as Promise<Paint[]>;
}

function getPaintLines() {
    return apiCall("/paintlines", "get", null, null) as Promise<PaintLine[]>;
}

function getManufacturers() {
    return apiCall("/manufacturers", "get", null, null) as Promise<
        Manufacturer[]
    >;
}

function addPaintToCollection(
    collectionObj: Omit<Collection, "id" | "user_id">
) {
    return apiCall(
        "/usercollections",
        "post",
        null,
        collectionObj
    ) as Promise<Collection>;
}

function deletePaintFromCollection({
    paints_id,
}: Omit<Collection, "id" | "user_id">) {
    return apiCall(`/usercollections/paint/${paints_id}`, "delete", null, null);
}

function getColorCatagories() {
    return apiCall("/colorcategories", "get", null, null) as Promise<
        ColorCatagory[]
    >;
}

export {
    addPaintToCollection,
    deletePaintFromCollection,
    getCollection,
    getPaints,
    getPaintLines,
    getManufacturers,
    getColorCatagories,
};
