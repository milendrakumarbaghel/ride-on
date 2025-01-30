import React from 'react'

const LocationSearchPanel = (props) => {
  const { suggestions, onSuggestionClick } = props // Destructure props

  return (
    <div>
      {
        suggestions.length > 0 ? (
          suggestions.map((element, index) => (
            <div key={index} onClick={() => {
              onSuggestionClick(element)
              props.setVehiclePanel(true)
              props.setPanelOpen(false)
            }} className='flex items-center justify-start gap-4 my-2 border-2 p-3 rounded-xl border-gray-100 active:border-black'>
              <h2 className='bg-[#eee] p-2 rounded-full h-10 w-10 flex items-center justify-center'><i className="ri-map-pin-fill"></i></h2>
              <h4 className='font-medium'>{element}</h4>
            </div>
          ))
        ) : (
          locations.map(function(elements, index) {
            return <div key={index} onClick={() => {
              props.setVehiclePanel(true)
              props.setPanelOpen(false)
            }} className='flex items-center justify-start gap-4 my-2 border-2 p-3 rounded-xl border-gray-100 active:border-black'>
            <h2 className='bg-[#eee] p-2 rounded-full h-10 w-10 flex items-center justify-center'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elements}</h4>
        </div>
          })
        )
      }
    </div>
  )
}

export default LocationSearchPanel
