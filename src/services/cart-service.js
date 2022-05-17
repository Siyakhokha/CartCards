const axios = require('axios');
const baseUrl = `${window.location.origin}/_hcms/api`

export const getCart = async (payload) => {
    const response = await axios({
        method: 'post',
        url: `${baseUrl}/getcart`,
        data: payload
      })
    return response.data;
}

export const updateQuantity = async (payload) => {
    const response = await axios({
        method: 'post',
        url: `${baseUrl}/updatelinequantity`,
        data: payload
      })
    return response.data;
}