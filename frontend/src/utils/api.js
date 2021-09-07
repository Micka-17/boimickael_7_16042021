export class ApiErrors {
    constructor(errors) {
        this.errors = errors
    }
}

export async function apiFetch (endpoint, options = {}) {
    const response = await fetch("localhost:3000" + endpoint, {
        credentials: "include",
        headers: {
            Accept: "application/json"
        },
        ...options
    } )
    if(response.status === 204)  {
        return null;
    }
    const responseData = await response.json()
    if (response.ok) {
        return responseData;
    } else {
        if (responseData.errors) {
            throw new ApiErrors(responseData.errors)
        }
    }
}