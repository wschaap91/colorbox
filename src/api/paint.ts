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

function getColorCatagories() {
    return apiCall("/colorcategories", "get", null, null) as Promise<
        ColorCatagory[]
    >;
}

export {
    getCollection,
    getPaints,
    getPaintLines,
    getManufacturers,
    getColorCatagories,
};
