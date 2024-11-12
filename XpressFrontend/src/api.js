import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})

const getMenuStates = async () => {
    return await apiClient.post('/getMenuStates');
}

const addMenuState = async (name) => {
    return await apiClient.post('/addState', {name: name});
}

const deleteMenuState = async (id) => {
    return await apiClient.post('/deleteState', {id: id});
}

const updateMenuState = async (item) => {
    return await apiClient.post('/updateState', {id: item.id, name: item.name});
}

const getOrderStates = async () => {
    return await apiClient.post('/orderStates', {});
}

const addOrderState = async (name) => {
    return await apiClient.post('/addOrderState', {name: name});
}

const updateOrderState = async (item) => {
    return await apiClient.post('/updateOrderState', {id: item.id, name: item.name});
}

const deleteOrderState = async (id) => {
    return await apiClient.post('/deleteOrderState', {id: id});
}

const getMenuItems = async () => {
    return await apiClient.post('/getMenuItems', {});
}

const addMenuItem = async (formValues) => {

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("description", formValues.description);
    formData.append("price", formValues.price);
    formData.append("state", formValues.state);

    if (formValues.image) {
        formData.append("image", formValues.image);
    }

    return await apiClient.post('/addMenuItem', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

const updateMenuItem = async (formValues) => {

    const formData = new FormData();
    formData.append("id", formValues.id);
    formData.append("name", formValues.name);
    formData.append("description", formValues.description);
    formData.append("price", formValues.price);
    formData.append("state", formValues.state);

    if (formValues.image) {
        formData.append("image", formValues.image);
    }

    console.log(formData);

    return await apiClient.post('/updateMenuItem', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

const deleteMenuItem = async (id) => {
    return await apiClient.post('/deleteMenu', {id: id});
}

const register = async (formValues) => {
    return await apiClient.post('/register', formValues);
}

const userLogin = async (formValues) => {
    return await apiClient.post('/login', formValues);
}

const adminLogin = async (formValues) => {
    return await apiClient.post('/adminLogin', formValues);
}

export default {
    apiClient,
    getMenuStates,
    addMenuState,
    deleteMenuState,
    updateMenuState,
    getOrderStates,
    addOrderState,
    updateOrderState,
    deleteOrderState,
    getMenuItems,
    addMenuItem,
    deleteMenuItem,
    updateMenuItem,
    register,
    userLogin,
    adminLogin

}
