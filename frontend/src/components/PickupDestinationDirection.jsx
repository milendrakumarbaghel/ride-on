import { useState, useEffect } from 'react'
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
import PropTypes from 'prop-types'

const PickupDestinationDirection = (props) => {
    const [directionsResponse, setDirectionsResponse] = useState(null)

    const pickup = props.pickup
    const destination = props.destination

    useEffect(() => {
        if (!pickup || !destination) return
        // Remove window.google usage and rely on DirectionsService below
    }, [pickup, destination])

    if (!pickup || !destination) {
        return <div className='p-4 text-red-600'>Pickup or destination missing</div>
    }

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: 0, lng: 0 }}
            zoom={pickup ? 18 : 2}
        >
            {!directionsResponse && (
                <DirectionsService
                    options={{
                        origin: pickup,
                        destination: destination,
                        travelMode: 'DRIVING'
                    }}
                    callback={(result, status) => {
                        if (status === 'OK') {
                            setDirectionsResponse(result)
                        }
                    }}
                />
            )}
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
    )
}

PickupDestinationDirection.propTypes = {
    pickup: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    destination: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
}

export default PickupDestinationDirection
