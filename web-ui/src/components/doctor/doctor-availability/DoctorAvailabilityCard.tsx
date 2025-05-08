import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/appDispatchHook";
import {
  addTimeSlot,
  clearTimeSlots,
  setAppointmentFee,
  saveAvailableSlots,
} from "../../../redux/slices/doctor/doctorAvailableSlotsSlice";

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export default function DoctorAvailabilityCard() {
  const dispatch = useAppDispatch();
  const { availability, appointmentFee, loading, error } = useAppSelector(
    (state) => state.doctorAvailableSlots
  );

  // const { isExpanded, isHovered, isMobileOpen, toggleSidebar } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState("04:00 AM");
  const [endTime, setEndTime] = useState("05:00 AM");
  const [activeDay, setActiveDay] = useState<Day>("Monday");

  const parseTime = (time: string) => {
    const [timePart, period] = time.split(" ");
    const [hours, minutes] = timePart.split(":");
    return { hours, minutes, period };
  };

  const formatTime = (hours: string, minutes: string, period: string) => {
    return `${hours}:${minutes} ${period}`;
  };

  const handleTimeChange = (
    currentTime: string,
    setTime: React.Dispatch<React.SetStateAction<string>>,
    field: "hours" | "minutes" | "period",
    value: string | number
  ) => {
    const { hours, minutes, period } = parseTime(currentTime);
    let newHours = hours;
    let newMinutes = minutes;
    let newPeriod = period;

    if (field === "hours") {
      newHours = String(value).padStart(2, "0");
    } else if (field === "minutes") {
      newMinutes = String(value).padStart(2, "0");
    } else if (field === "period") {
      newPeriod = value as string;
    }

    setTime(formatTime(newHours, newMinutes, newPeriod));
  };

  const increment = (
    currentTime: string,
    setTime: React.Dispatch<React.SetStateAction<string>>,
    field: "hours" | "minutes"
  ) => {
    const { hours, minutes, period } = parseTime(currentTime);
    let value = field === "hours" ? parseInt(hours) : parseInt(minutes);
    const max = field === "hours" ? 12 : 59;

    value = value + 1 > max ? 1 : value + 1;
    handleTimeChange(currentTime, setTime, field, value);
  };

  const decrement = (
    currentTime: string,
    setTime: React.Dispatch<React.SetStateAction<string>>,
    field: "hours" | "minutes"
  ) => {
    const { hours, minutes, period } = parseTime(currentTime);
    let value = field === "hours" ? parseInt(hours) : parseInt(minutes);
    const max = field === "hours" ? 12 : 59;

    value = value - 1 < 1 ? max : value - 1;
    handleTimeChange(currentTime, setTime, field, value);
  };

  const handleAddSlots = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!startTime || !endTime) {
      alert("Please select both start and end times");
      return;
    }

    // const start = new Date(`2000-01-01 ${startTime}`);
    // const end = new Date(`2000-01-01 ${endTime}`);
    dispatch(
      addTimeSlot({
        day: activeDay,
        timeSlot: {
          startTime,
          endTime,
        },
      })
    );
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAll = () => {
    dispatch(clearTimeSlots(activeDay));
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAppointmentFee(Number(e.target.value)));
  };

  const handleSaveChanges = () => {
    dispatch(saveAvailableSlots())
      .unwrap()
      .then(() => {
        alert("Doctor's available slots saved successfully!");
      })
      .catch((error) => {
        alert(`Failed to save slots: ${error}`);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Available Timings
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Select Available Slots</h3>

        {/* Day Selection */}
        <div className="mb-6">
          <ul className="flex flex-wrap border-b border-gray-200 gap-2 overflow-x-auto">
            {(
              [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ] as Day[]
            ).map((day) => (
              <li key={day} className="mr-2">
                <button
                  className={`px-4 py-2 text-sm font-medium focus:outline-none rounded-t-md ${
                    activeDay === day
                      ? "border-b-2 border-blue-600 text-white bg-blue-600"
                      : "border border-gray-300 bg-white text-gray-600 hover:text-white hover:bg-blue-600"
                  }`}
                  onClick={() => setActiveDay(day)}
                >
                  {day}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Time Slots */}
        <div className="mb-6 border border-gray-100 p-5 rounded bg-gray-100">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <span className="text-lg font-medium">{activeDay}</span>
            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleAddSlots}
              >
                Add Slots
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={handleDeleteAll}
              >
                Delete All
              </button>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {availability[activeDay].length > 0 ? (
              availability[activeDay].map((slot, index) => (
                <button
                  key={index}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No slots added for {activeDay}</p>
            )}
          </div>
        </div>

        {/* Appointment Fees */}
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <label className="mr-2">Appointment Fees ($)</label>
          <input
            type="number"
            value={appointmentFee}
            onChange={handleFeeChange}
            className="w-24 px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          <button className="px-4 py-2 border border-gray-300 rounded-md">
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Time Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Slot</h3>
            <div className="space-y-4">
              {/* Start Time */}
              <div>
                <label className="block mb-1">Start Time</label>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() =>
                        increment(startTime, setStartTime, "hours")
                      }
                      className="px-3 py-1 rounded-t-md bg-gray-200 hover:bg-gray-300"
                    >
                      ↑
                    </button>
                    <input
                      type="text"
                      value={parseTime(startTime).hours}
                      onChange={(e) =>
                        handleTimeChange(
                          startTime,
                          setStartTime,
                          "hours",
                          e.target.value
                        )
                      }
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                    <button
                      onClick={() =>
                        decrement(startTime, setStartTime, "hours")
                      }
                      className="px-3 py-1 rounded-b-md bg-gray-200 hover:bg-gray-300"
                    >
                      ↓
                    </button>
                  </div>
                  <span className="text-xl">:</span>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() =>
                        increment(startTime, setStartTime, "minutes")
                      }
                      className="px-3 py-1 rounded-t-md bg-gray-200 hover:bg-gray-300"
                    >
                      ↑
                    </button>
                    <input
                      type="text"
                      value={parseTime(startTime).minutes}
                      onChange={(e) =>
                        handleTimeChange(
                          startTime,
                          setStartTime,
                          "minutes",
                          e.target.value
                        )
                      }
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                    <button
                      onClick={() =>
                        decrement(startTime, setStartTime, "minutes")
                      }
                      className="px-3 py-1 rounded-b-md bg-gray-200 hover:bg-gray-300"
                    >
                      ↓
                    </button>
                  </div>
                  <select
                    value={parseTime(startTime).period}
                    onChange={(e) =>
                      handleTimeChange(
                        startTime,
                        setStartTime,
                        "period",
                        e.target.value
                      )
                    }
                    className="px-2 py-1 border border-gray-300 rounded-md bg-blue-600 text-white"
                  >
                    {["AM", "PM"].map((period) => (
                      <option key={period} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* End Time */}
              <div>
                <label className="block mb-1">End Time</label>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => increment(endTime, setEndTime, "hours")}
                      className="px-3 py-1 rounded-t-md bg-gray-200 hover:bg-gray-300"
                    >
                      ↑
                    </button>
                    <input
                      type="text"
                      value={parseTime(endTime).hours}
                      onChange={(e) =>
                        handleTimeChange(
                          endTime,
                          setEndTime,
                          "hours",
                          e.target.value
                        )
                      }
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                    <button
                      onClick={() => decrement(endTime, setEndTime, "hours")}
                      className="px-3 py-1 rounded-b-md bg-gray-200 hover:bg-gray-300"
                    >
                      ↓
                    </button>
                  </div>
                  <span className="text-xl">:</span>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => increment(endTime, setEndTime, "minutes")}
                      className="px-3 py-1 rounded-t-md bg-gray-200 hover:bg-gray-300"
                    >
                      ↑
                    </button>
                    <input
                      type="text"
                      value={parseTime(endTime).minutes}
                      onChange={(e) =>
                        handleTimeChange(
                          endTime,
                          setEndTime,
                          "minutes",
                          e.target.value
                        )
                      }
                      className="w-12 px-2 py-1 border border-gray-300 text-center"
                    />
                    <button
                      onClick={() => decrement(endTime, setEndTime, "minutes")}
                      className="px-3 py-1 rounded-b-md bg-gray-200 hover:bg-gray-300"
                    >
                      ↓
                    </button>
                  </div>
                  <select
                    value={parseTime(endTime).period}
                    onChange={(e) =>
                      handleTimeChange(
                        endTime,
                        setEndTime,
                        "period",
                        e.target.value
                      )
                    }
                    className="px-2 py-1 border border-gray-300 rounded-md bg-blue-600 text-white"
                  >
                    {["AM", "PM"].map((period) => (
                      <option key={period} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
