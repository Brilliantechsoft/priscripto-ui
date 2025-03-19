import React from 'react'
import ComponentCard from '../components/common/ComponentCard'
import PatientListTable from '../components/tables/PatientData/PatientListTable'

const Patients = () => {
  return (
    <>
      <div>
        <ComponentCard title="Patient's Information">
          <PatientListTable />
        </ComponentCard>
      </div>
    </>
  )
}

export default Patients