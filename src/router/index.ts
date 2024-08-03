import { ref } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "@s/authStore";

import LoginView from "@v/LoginView.vue";
import MainLayout from "@l/MainLayout.vue";
import HomeView from "@v/HomeView.vue";
import PaintsView from "@v/PaintsView.vue";
import CollectionView from "@v/CollectionView.vue";

const pageTitle = ref("Default Title");

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: LoginView,
            meta: {
                title: "Login",
                description: "Login",
            },
        },
        {
            path: "/",
            name: "main",
            component: MainLayout,
            children: [
                {
                    path: "home",
                    name: "home",
                    component: HomeView,
                    meta: {
                        title: "Home",
                        description: "Home Page",
                    },
                },
                {
                    path: "paints",
                    name: "paints",
                    component: PaintsView,
                    meta: {
                        title: "Paints",
                        description: "Paints Page",
                    },
                },
                {
                    path: "collection",
                    name: "collection",
                    component: CollectionView,
                    meta: {
                        title: "Collection",
                        description: "Collection Page",
                    },
                },
                {
                    path: "/:pathMatch(.*)*",
                    redirect: { name: "main" },
                },
            ],
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: { name: "main" },
        },
    ],
});

router.beforeEach(async (to, _, next) => {
    const { title, description } = to.meta;
    const defaultTitle = "Default Title";
    const defaultDescription = "Default Description";

    pageTitle.value = title || defaultTitle;
    document.title = title || defaultTitle;

    const descriptionElement = document.querySelector(
        'head meta[name="description"]'
    );

    descriptionElement.setAttribute(
        "content",
        description || defaultDescription
    );

    const authStore = useAuthStore();
    if (!authStore.token && to.name !== "login") {
        next({ name: "login" });
        return;
    } else if (authStore.token && to.name === "login") {
        next({ name: "home" });
        return;
    } else {
        next();
    }
});

export default router;

export { pageTitle };
