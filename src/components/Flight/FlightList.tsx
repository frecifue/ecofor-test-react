import { useEffect, useState } from 'react'
import type { Flight } from '../../types/Flight'
import { getFlights } from '../../api/aviationstack/flight'
import { Box, CircularProgress, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import { addRemoveFavoriteFlight, getFavoritesFlight } from '../../utils/localstorage/Flight/FavoriteFlight';
import moment from "moment";

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BasicModal from '../Shared/BasicModal/BasicModal';


export default function FlightList() {

    const [flights, setFlights] = useState<Flight[]>([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('')
    const [favoriteFlights, setFavoriteFlights] = useState<Flight[]>([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)

    const openModal = (flight: Flight) => {
        setSelectedFlight(flight)
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setSelectedFlight(null)
        setIsOpenModal(false)
    }

    useEffect(() => {
        setLoading(true);
        getFlights().then((result) => {
            if(result && result.data){
                setFlights(result.data)
            }
            setLoading(false);
        })
        
    }, [])

    useEffect(() => {
        setFavoriteFlights(getFavoritesFlight())
    }, [])
    

    if(loading){
        return <CircularProgress/>
    }

    if(!flights.length){
        return <Typography variant='h5'>No se han encontrado vuelos</Typography>
    }

    const filteredFlights = flights.filter((flight)=>{
        const search = filter.toLowerCase()
        return (
            flight.flight.number?.toLowerCase().includes(search) ||
            flight.flight.icao?.toLowerCase().includes(search)
        )
    })

    return (
        <>
            <Box>
                <Typography variant='h5'>Listado de Vuelos Actuales</Typography>
                <TextField
                    label="Buscar por numero vuelo o icao"
                    value={filter}
                    fullWidth
                    onChange={e=>setFilter(e.target.value)}
                />
                <List>
                    {filteredFlights.slice(0,10).map((flight, index)=>(
                        <ListItem
                            key={index}
                            secondaryAction={
                                <>
                                    <IconButton
                                        onClick={()=>openModal(flight)}
                                    >
                                        <VisibilityIcon/>
                                    </IconButton>

                                    <IconButton
                                        onClick={()=>{
                                            addRemoveFavoriteFlight(flight)
                                            setFavoriteFlights(getFavoritesFlight)
                                        }}
                                    >
                                        {favoriteFlights.some((f=>f.flight.icao === flight.flight.icao)) ? (
                                            <StarIcon
                                                color='warning'
                                            />
                                        ) : <StarBorderIcon/>  }
                                        
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText
                                primary={`${flight.flight.icao} - ${flight.airline.name} - Vuelo # ${flight.flight.number}`}
                                secondary={
                                    <>
                                        {`Salida: ${flight.departure.airport} - a las: ${moment(flight.departure.estimated).format('DD/MM/YYYY, h:mm:ss a')}`}<br/>
                                        {`Llegada: ${flight.arrival.airport} - a las: ${moment(flight.arrival.estimated).format('DD/MM/YYYY, h:mm:ss a')}`}<br/>
                                        {`Estado: ${flight.flight_status}`}
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <BasicModal
                open={isOpenModal}
                onClose={closeModal}
                title='Detalle del Vuelo'
            >
                {selectedFlight && 
                    <Typography>
                        <>
                            <b>ICAO: </b>{`${selectedFlight.flight.icao}`}<br/>
                            <b>Aerolinea: </b>{`${selectedFlight.airline.name}`}<br/>
                            <b>Estado: </b>{`${selectedFlight.flight_status}`}<br/>
                            <b>Salida: </b>{`${moment(selectedFlight.departure.scheduled).format('DD/MM/YYYY, h:mm:ss a')}`}<br/>
                            <b>Llegada: </b>{`${moment(selectedFlight.arrival.scheduled).format('DD/MM/YYYY, h:mm:ss a')}`}<br/>
                            <b>Hora Estimada Salida: </b>{`${moment(selectedFlight.departure.estimated).format('DD/MM/YYYY, h:mm:ss a')}`}<br/>
                            <b>Hora Estimada Llegada: </b>{`${moment(selectedFlight.arrival.estimated).format('DD/MM/YYYY, h:mm:ss a')}`}<br/>
                        </>
                    </Typography>
                }
            </BasicModal>
        </>
    )
}
