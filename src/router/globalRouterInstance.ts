import { ref } from "vue";
import { type Router } from "vue-router";
const gRouter = ref<Router>();

export default () => {
    return { gRouter };
};
