import {API_URL} from './variables';

class API {
    _token: string = "";

    setToken (newtoken: string) {
        this._token = newtoken;
    }

    getToken (): string {
        return this._token;
    }   

    login ({username, password}: doLoginParameters) {
        return this.request('POST', '/auth/login', {username, password})
    }
    refreshToken (oldToken: string) {
        return this.request('POST', '/auth/refresh-token', {}, {Authorization: `Bearer ${oldToken}`})
    }
    
    sendNote (callId: string, note: string) {
        return this.authenticatedRequest('POST', `/calls/${callId}/note`, {content: note})
    }
    
    fetchCalls (offset: number, limit: number) {
        return this.authenticatedRequest('GET', `/calls?offset=${offset}&limit=${limit}`)
    }

    archiveCall (callId: string) {
        return this.authenticatedRequest('PUT', `/calls/${callId}/archive`)
    }

    async request (method: 'POST' | 'GET' | 'PUT', endpoint: string, body: KeyValueObject = {}, _headers: KeyValueObject = {})
    : Promise<[any, Error | null]> {
        try {
            const headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
                ..._headers,
            }
            const result = await fetch(`${API_URL}${endpoint}`, {
                headers,
                body: method === 'GET' ? undefined : JSON.stringify(body),
                method
            })
            const data = await result.json();
            return [data, null];
        } catch (error) {
            return [null, error]
        }
    }

    async authenticatedRequest (method: 'POST' | 'GET' | 'PUT', endpoint: string, body: KeyValueObject = {}, headers: KeyValueObject = {})
    : Promise<any> {
        const token = this.getToken();
        return this.request(method, endpoint, body, {Authorization: `Bearer ${token}`, ...headers});
    }
}


export type doLoginParameters = {
    username: string;
    password: string;
}

interface KeyValueObject {
  [key: string]: unknown;
}

export default new API();