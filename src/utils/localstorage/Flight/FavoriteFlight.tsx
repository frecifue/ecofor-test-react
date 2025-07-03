import type { Flight } from "../../../types/Flight";

const STORAGE_FAVORITES_KEY = 'favoriteFlights';

export function getFavoritesFlight(): Flight[]{
    const data = localStorage.getItem(STORAGE_FAVORITES_KEY)
    return data ? JSON.parse(data) : [];
}

export function addRemoveFavoriteFlight(flight: Flight){
    const saved = getFavoritesFlight();
    const index = saved.findIndex(f=> f.flight.icao === flight.flight.icao)

    if(index > -1){
        saved?.splice(index, 1) // removemos
    }else{
        saved?.push(flight) // agregamos
    }

    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(saved))

}