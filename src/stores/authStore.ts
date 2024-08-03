import { ref } from "vue";
import { defineStore } from "pinia";
import { useSessionStorage } from "@vueuse/core";
import { apiCall, RequestBody } from "@api/apiCall";
import { type Me } from "@/api/_apiTypes";
import useGlobalRouter from "@/router/globalRouterInstance";
import { refreshStore } from "@/utilities/mapApiStore";

const { gRouter } = useGlobalRouter();

export const useAuthStore = defineStore("auth", () => {
    const token = useSessionStorage("cb-auth-token", ref(""));
    const me = useSessionStorage("cb-auth-me", ref<Me>({} as Me), {
        mergeDefaults: true,
    });

    const login = async (loginData: RequestBody<"/auth/login", "post">) => {
        if (!gRouter.value) return;
        const res = await apiCall("/auth/login", "post", null, loginData);
        const { authToken } = res;
        token.value = authToken;
        await new Promise((resolve) => setTimeout(resolve, 100));
        await refreshStore("me");
        gRouter.value.push({ name: "home" });
    };

    const logout = () => {
        token.value = "";
        if (!gRouter.value) return;
        gRouter.value.push({ name: "login" });
    };

    const validateLogin = async () => {
        let res: boolean;
        try {
            res = !!(await apiCall("/auth/me", "get", null, null));
        } catch (e) {
            res = false;
        }
        return res;
    };

    return {
        login,
        logout,
        validateLogin,
        token,
        me,
    };
});
