import { paths } from "./schema-get";
import { paths as pathspost } from "./schema-post";

export type Path = keyof paths;
export type PathMethod<T extends Path> = Extract<keyof paths[T], string>;

//Define difference between request body and response type. Needed for diffent behavior of default values
export type PathPostMethod<T extends Path> = Extract<
    keyof pathspost[T],
    string
>;

export type ErrorType = {
    message: string;
    code: number;
    payload: any;
};

export type RequestParams<
    P extends Path,
    M extends PathMethod<P>
> = paths[P][M] extends { parameters: { query: any } }
    ? paths[P][M]["parameters"]["query"]
    : undefined | null;

export type RequestBody<
    P extends Path,
    M extends PathPostMethod<P>
> = pathspost[P][M] extends {
    requestBody: { content: { "application/json": any } };
}
    ? pathspost[P][M]["requestBody"]["content"]["application/json"]
    : pathspost[P][M] extends {
          requestBody: { content: { "multipart/form-data": any } };
      }
    ? pathspost[P][M]["requestBody"]["content"]["multipart/form-data"] & {
          excludeContentType: true;
      }
    : undefined | null;

export type ResponseType<
    P extends Path,
    M extends PathMethod<P>
> = paths[P][M] extends {
    responses: {
        200: { content: { "application/json": { [x: string]: any } } };
    };
}
    ? paths[P][M]["responses"][200]["content"]["application/json"]
    : undefined;

/*NOTE - The apiCall function is used to interact with the API.
 * The function takes a url, method, params, and body as arguments.
 */
export const apiCall = async <P extends Path, M extends PathPostMethod<P>>(
    url: P,
    method: M,
    params: RequestParams<P, M>,
    body: RequestBody<P, M>
): Promise<Required<ResponseType<P, M>>> => {
    try {
        if (typeof method !== "string")
            throw new Error("Method must be a string");

        let requestUrl: string = import.meta.env.VITE_DATABASE_URL + url;
        let xBranch: string = import.meta.env.VITE_X_BRANCH;
        let xDatasource: string = import.meta.env.VITE_X_DATASOURCE;
        let build: string = import.meta.env.VITE_BUILD;
        const token = sessionStorage.getItem("cb-auth-token");
        const headers = new Headers();

        if (!body?.excludeContentType) {
            headers.append("Content-Type", "application/json");
        }
        if (token) headers.append("Authorization", `Bearer ${token}`);
        if (xBranch) headers.append("X-Branch", `${xBranch}`);
        if (xDatasource) headers.append("X-Data-Source", `${xDatasource}`);
        if (build) headers.append("X-App-build", `${build}`);

        if (params && params !== null && Object.keys(params).length) {
            const query = new URLSearchParams(params);
            requestUrl += `?${query}`;
        }

        let requestInit: RequestInit = {
            headers,
            method: method.toUpperCase(),
        };

        if (body && body !== null && Object.keys(body).length) {
            if (!body.excludeContentType) {
                requestInit.body = JSON.stringify(body);
            } else {
                const { excludeContentType, ...rest } = body;
                const formBody = new FormData();
                Object.entries(rest).forEach(([key, value]) => {
                    if (value instanceof File) {
                        formBody.append(key, value, value.name);
                    } else {
                        formBody.append(key, value);
                    }
                });
                requestInit.body = formBody;
            }
        }

        const response = await fetch(requestUrl, requestInit);
        const responseBody = await response.json();

        //NOTE - If the response status is 400, 403, 404, or 500, the response body should be thrown as an error.
        if ([400, 403, 404, 500].includes(response.status)) {
            throw responseBody;
        }
        if (response.status === 401) {
            if (responseBody && responseBody.code) {
                if (responseBody.code === "ERROR_CODE_UNAUTHORIZED") {
                    if (responseBody.message === "This token is expired.") {
                        throw new Error("api.session.ErrorInvalidSession");
                    } else {
                        throw new Error("api." + responseBody.message);
                    }
                } else {
                    throw responseBody;
                }
            }
        }

        if (!response.ok) throw new Error(response.statusText);

        return responseBody;
    } catch (error) {
        throw error as ErrorType;
    }
};

export default apiCall;
