import { useAuthStore } from "./authStore";
import { usePaintStore } from "./paintStore";

export default () => {
    return {
        auth: useAuthStore(),
        paint: usePaintStore(),
    };
};
