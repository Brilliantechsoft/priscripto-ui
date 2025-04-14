
import AppSidebar from '../../../layout/AppSidebar'
import AppointmentRequestCard from './AppointmentRequestCard ';

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setAppointmentRequest } from '../../../redux/slices/appointment/drAppointmentRequestSlice';

const DoctorAppointmentRequest = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state : RootState) => state.doctorAppointmentRequest);

  const fetchAppointmentRequests = async () => {
    try {
      const response = await axios.get(
        'https://97d36fe8-7a36-4ec8-bb05-d4a47f537ebb.mock.pstmn.io//api/doctor/1/appointmentRequest'
      );
      console.log(response?.data);
      dispatch(setAppointmentRequest(response?.data));
    } catch (error) {
      console.error('Error fetching appointment requests:', error);
    }
  }
  

  useEffect(() => {
    fetchAppointmentRequests();
  } , [])
  return (
    <div className="flex min-h-screen">
      <div className="w-1/5">
        <AppSidebar />
      </div>
      <div className="flex-1 bg-gray-50 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Requests</h2>
        <div className="space-y-4">
          {requests.map((appointment) => (
            <AppointmentRequestCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>
    </div>
  );
};



export default DoctorAppointmentRequest;