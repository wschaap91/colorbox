// formkit.config.ts
import { defaultConfig } from "@formkit/vue";
import { rootClasses } from "./formkit.theme.ts";

export default defaultConfig({
    config: {
        rootClasses,
    },
});
