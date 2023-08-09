const axios = require("axios")

async function getCityAndUf(params) {
    const url = 'https://nominatim.openstreetmap.org'
    const { data: result } = await axios.get(url, {
        params
    })

    if (result.length > 0) {
        const { city, town, state } = result[0].address
        const cityInfo = city || town
        return { cityInfo, state }   
    }

    return { cityInfo: "", state: "" }
}

export default async (req, res) => {
    const query = req.query;
    const data = await getCityAndUf(query)

    return res.json(data)
}