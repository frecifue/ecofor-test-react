const BASE_URL = import.meta.env.VITE_AVIATIONSTACK_URL;
const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;

export async function getFlights(){
    const url = `${BASE_URL}/flights?access_key=${API_KEY}`

    try {
        const response = await fetch(url);
        if(!response.ok){
            throw Error(`HHTP ERROR! -> status code: ${response.status}`)
        }

        const data = response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}