import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  records: [
    {
      id: 'MR1236',
      name: 'Electro cardiography',
      date: '24 Mar 2024',
      patient: 'Hendrita Clark',
      comments: 'Take Good Rest',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 'MR3656',
      name: 'Complete Blood Count',
      date: '27 Mar 2024',
      patient: 'Laura Stewart',
      comments: 'Stable, no change',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },

  ],
};

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {},
});

export default recordsSlice.reducer;
