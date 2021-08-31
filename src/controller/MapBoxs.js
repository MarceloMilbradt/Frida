const key = 'pk.eyJ1IjoibWFyY2Vsby1taWxicmFkdCIsImEiOiJja3N6OXJyMXAycmNoMnBwb292M3o2dGZoIn0.vSEi9tB7hy50jfHlhRuCZQ'

const getLocation = async (lat, long) => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=address&access_token=${key}`, {
        headers: { 'Content-type': 'application/json' },
    })
    const place = (await response.json()).features[0]
    return place
}

export {
    getLocation
}