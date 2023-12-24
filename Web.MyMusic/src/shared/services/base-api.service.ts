export abstract class BaseApiService {
    protected async get<TResponse>(url: string): Promise<[TResponse, Error]> {
        return this.handleHTTPRequest(url, { method: "GET" });
    }

    protected async post<TRequest, TResponse>(
        url: string,
        request: TRequest
    ): Promise<[TResponse, Error]> {
        return this.handleHTTPRequest(url, {
            method: "POST",
            body: JSON.stringify(request),
            headers: { "Content-Type": "application/json" },
        });
    }

    protected async put<TRequest, TResponse>(
        url: string,
        request: TRequest
    ): Promise<[TResponse, Error]> {
        return this.handleHTTPRequest(url, {
            method: "PUT",
            body: JSON.stringify(request),
            headers: { "Content-Type": "application/json" },
        });
    }

    protected async patch<TRequest, TResponse>(
        url: string,
        request: TRequest
    ): Promise<[TResponse, Error]> {
        return this.handleHTTPRequest(url, {
            method: "PATCH",
            body: JSON.stringify(request),
            headers: { "Content-Type": "application/json" },
        });
    }

    protected async delete(url: string): Promise<[void, Error]> {
        return this.handleHTTPRequest(url, { method: "DELETE" });
    }

    private async handleHTTPRequest<TResponse>(
        url: string,
        options: RequestInit
    ): Promise<[TResponse, Error]> {
        try {
            const response: Response = await fetch(url, options);

            if (!response.ok) {
                return [
                    null,
                    new Error(`Request failed: ${response.statusText}`),
                ];
            }

            return [await response.json(), null];
        } catch (error) {
            return [null, new Error(`Request error: ${error.message}`)];
        }
    }
}
