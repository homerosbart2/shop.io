// env variable
const API_URL : (string | undefined) = process.env.REACT_APP_API_SERVER_URL;

export interface HttpResponse<T> {
    successful: boolean;
    data?: T;
    error?: {
        message: string;
    };
}

interface HttpResponseWithStatus<T> extends HttpResponse<T> {
    status: Response['status'];
}

enum CONTENT_TYPE {
    JSON = 'application/json',
}

enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

const httpFetch = <T extends unknown>(
    method: METHOD,
    path: string,
    data?: Partial<T>,
): Promise<HttpResponseWithStatus<T>> => {
    return new Promise(resolve => {
        fetch(
            `${API_URL}/${path}`,
            {
                method,
                headers: {
                    'Content-Type': CONTENT_TYPE.JSON,
                },
                body: data ? JSON.stringify(data) : null,
            },
        ).then(
            response => {
                response.json().then((httpResponse: HttpResponse<T>) => {
                    resolve({
                        ...httpResponse,
                        status: response.status,
                    });
                });
            },
        ).catch(
            error => {
                console.error(error);
            },
        );
    });
};

export const getApi = <T extends unknown>(path: string): Promise<HttpResponseWithStatus<T>> => {
    return httpFetch<T>(METHOD.GET, path);
};

export const deleteApi = <T extends unknown>(path: string): Promise<HttpResponseWithStatus<T>> => {
    return httpFetch<T>(METHOD.DELETE, path);
};

export const postApi = <T extends unknown>(path: string, data: Partial<T>): Promise<HttpResponseWithStatus<T>> => {
    return httpFetch<T>(METHOD.POST, path, data);
};

export const putApi = <T extends unknown>(path: string, data: Partial<T>): Promise<HttpResponseWithStatus<T>> => {
    return httpFetch<T>(METHOD.PUT, path, data);
};