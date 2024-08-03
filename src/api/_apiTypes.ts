import { ResponseType } from "./apiCall";
import { TypeObject, PickRequired } from "@/utilities/_utilityTypes";

export type Api<Type extends TypeObject> = {
    get: (id: Type["id"]) => Promise<Required<Type>>;
    update: (id: Type["id"], object: Partial<Type>) => Promise<Required<Type>>;
    create: (object: Partial<Omit<Type, "id">>) => Promise<Required<Type>>;
    delete: (
        id: Type["id"]
    ) => Promise<{ success: string } | { deleted: string }>;
};

export type Me = PickRequired<
    ResponseType<"/auth/me", "get">,
    "id" | "email" | "name"
>;

export type Paint = PickRequired<
    ResponseType<"/paints/0", "get">,
    "id" | "name" | "paintlines_id" | "color_catagories"
>;

export type PaintLine = PickRequired<
    ResponseType<"/paintlines/0", "get">,
    "id" | "name" | "manufacturers_id"
>;

export type Manufacturer = PickRequired<
    ResponseType<"/manufacturers/0", "get">,
    "id" | "name"
>;

export type ColorCatagory = PickRequired<
    ResponseType<"/colorcategories/0", "get">,
    "id" | "name"
>;

export type Collection = PickRequired<
    ResponseType<"/usercollections/0", "get">,
    "id" | "user_id" | "paints_id"
>;
