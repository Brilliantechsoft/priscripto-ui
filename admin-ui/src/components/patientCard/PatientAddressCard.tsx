
interface PatientProps {
  patient: {
    city: string;
    country: string;
    state : string;
    pincode: number;
    phone: number;
  };
}

const PatientAddressCard: React.FC<PatientProps>  = ({patient}) => {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Patient's Address
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Country
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {patient.country}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                City/State
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {patient.city} , {patient.state}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Postal Code
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {patient.pincode}
              </p>
            </div>
            
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone Number
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {patient.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAddressCard;
