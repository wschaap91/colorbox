import { ref } from "vue";
function useAwaitLoading() {
    const loading = ref(false);

    return {
        isLoading: loading,
        awaitLoading: async (promise: Promise<any>) => {
            loading.value = true;
            return await promise.finally(() => {
                loading.value = false;
            });
        },
    };
}

export { useAwaitLoading };
