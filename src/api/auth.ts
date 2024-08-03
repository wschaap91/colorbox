import { type Me } from "@/api/_apiTypes";
import { apiCall } from "@/api/apiCall";

function getMe() {
    return apiCall("/auth/me", "get", null, null) as Promise<Me>;
}

export { getMe };
