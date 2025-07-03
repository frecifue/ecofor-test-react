

export type AirportInfo = {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string;
    gate: string;
    delay: string;
    scheduled: string;
    estimated: string;
    actual: string;
    estimated_runway: string;
    actual_runway: string;
}

export type Airline = {
    name: string;
    iata: string;
    icao: string;
}

export type FlighNumber = {
    number: string;
    iata: string;
    icao: string;
    codeshared: string;
}

export type Flight = {
    flight_date: string;
    flight_status: string;
    aircraft: string;
    live: string;
    departure: AirportInfo;
    arrival: AirportInfo;
    airline: Airline;
    flight: FlighNumber;
}