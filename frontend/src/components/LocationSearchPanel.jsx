import React from 'react'

const locations = [
  "123 Main Street, New York, NY 10001",
  "456 Park Avenue, Los Angeles, CA 90012",
  "789 Michigan Ave, Chicago, IL 60601",
  "321 Market Street, San Francisco, CA 94105"
];

const LocationSearchPanel = (props) => {
  return (
    <div>
      {
        locations.map(function(elements, index) {
          return <div key={index} onClick={() => {
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className='flex items-center justify-start gap-4 my-2 border-2 p-3 rounded-xl border-gray-100 active:border-black'>
          <h2 className='bg-[#eee] p-2 rounded-full h-10 w-10 flex items-center justify-center'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{elements}</h4>
      </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel
