import { useEffect, useState } from 'react'
import type { Flight } from '../../types/Flight'
import { addRemoveFavoriteFlight, getFavoritesFlight } from '../../utils/localstorage/Flight/FavoriteFlight'
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'

import StarIcon from '@mui/icons-material/Star';
import moment from 'moment';
import { getFlights } from '../../api/aviationstack/flight';

import VisibilityIcon from '@mui/icons-material/Visibility';
import BasicModal from '../Shared/BasicModal/BasicModal';

export default function FavoriteFlightList() {

    const [favoriteFlights, setFavoriteFlights] = useState<Flight[]>([])
    const [flights, setFlights] = useState<Flight[]>([])
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
        setFavoriteFlights(getFavoritesFlight())
    }, [])

    useEffect(() => {        
        getFlights().then((result) => {
            if(result && result.data){
                setFlights(result.data)
            }
        })
    }, [])


    if(!favoriteFlights.length){
        return <Typography variant='h5'>No hay vuelos favoritos guardados</Typography>
    }

    return (
        <>
            <Box>
                <Typography variant='h5'>Listado de Vuelos Favoritos</Typography>
                <List>
                    {favoriteFlights.map((flight, index)=>{

                        if(flights.some((f=>f.flight.icao===flight.flight.icao))){
                            return (  
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
                                                <StarIcon
                                                    color='warning'
                                                />   
                                                
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
                            )    
                        }else{
                            return(
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <>
                                            <IconButton
                                                onClick={()=>{
                                                    addRemoveFavoriteFlight(flight)
                                                    setFavoriteFlights(getFavoritesFlight)
                                                }}
                                            >    
                                                <StarIcon
                                                    color='warning'
                                                />         
                                            </IconButton>
                                        </>
                                    }
                                    >
                                        <Typography><b>Desconocido</b></Typography>
                                </ListItem>
                            )
                        } 
                    })}
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
