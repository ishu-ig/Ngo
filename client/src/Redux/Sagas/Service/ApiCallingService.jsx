export async function createRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/${collection}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token") || ""
            },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (error) {
        console.error(`createRecord error for ${collection}:`, error);
    }
}

export async function createMultipartRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/${collection}`, {
            method: "POST",
            headers: {
                "authorization": localStorage.getItem("token") || ""
            },
            body: payload
        });
        return await response.json();
    } catch (error) {
        console.error(`createMultipartRecord error for ${collection}:`, error);
    }
}

export async function getRecord(collection) {
    try {
        let url = `${process.env.REACT_APP_BACKEND_SERVER}/api/${collection}`;
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token") || ""
            }
        });
        return await response.json();
    } catch (error) {
        console.error(`getRecord error for ${collection}:`, error);
    }
}

export async function updateRecord(collection, payload) {
    try {
        let id = payload._id;
        let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/${collection}/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token") || ""
            },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (error) {
        console.error(`updateRecord error for ${collection}:`, error);
    }
}

export async function updateMultipartRecord(collection, payload) {
    try {
        let id = payload.get('_id');
        let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/${collection}/${id}`, {
            method: "PUT",
            headers: {
                "authorization": localStorage.getItem("token") || ""
            },
            body: payload
        });
        return await response.json();
    } catch (error) {
        console.error(`updateMultipartRecord error for ${collection}:`, error);
    }
}

export async function deleteRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/${collection}/${payload._id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token") || ""
            }
        });
        return await response.json();
    } catch (error) {
        console.error(`deleteRecord error for ${collection}:`, error);
    }
}