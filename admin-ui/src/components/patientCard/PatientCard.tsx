import React from 'react'
import { useParams } from 'react-router'
const PatientCard = () => {
    const {id} = useParams();
    console.log(id);
    
  return (
   <>
     <div>PatientCard</div>
     <h1 className='text-bold text-3xl text-lime-600'>{id}</h1>
    </>
  )
}

export default PatientCard;