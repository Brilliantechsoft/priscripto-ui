

const PatientPrescription = () => {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
          Patient's Prescription 
        </h4>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Doctor Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Dr Joe Doe
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Medications
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Benadryl, Paracetamol
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Notes
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Take 1 tablet daily, 30 minutes before bedtime
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PatientPrescription;