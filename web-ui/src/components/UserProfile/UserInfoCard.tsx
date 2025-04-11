import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/appDispatchHook";
import {
  updateDoctorProfile,
  fetchDoctorProfile,
  fetchCountries,
  fetchStatesByCountryCode,
  fetchCitiesByCountryCodeAndStateCode,
  setStates,
  setCities,
} from "../../redux/slices/doctor/doctorProfileSlice";
import { Doctor } from "../../types/doctor/doctor";

interface Country {
  name: string;
  isoCode: string;
  states: State[];
}

interface State {
  name: string;
  stateCode: string;
  isoCode: string;
  cities: string[];
}
interface FormData {
  phone: number | "";
  age: number | "";
  country: string;
  state: string;
  city: string;
  clinicAddress: string;
  gender: string;
  profilePicture: File | null;
}

export default function UserInfoCard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.signInDoctor) || {};
  const { loading, doctor, error, countries, states, cities } = useAppSelector(
    (state) => state.doctorProfile
  );

  const [formData, setFormData] = useState<FormData>({
    phone: "",
    age: "",
    country: "",
    state: "",
    city: "",
    clinicAddress: "",
    gender: "",
    profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // console.log("FormData country:", formData.country);
  // console.log(formData.state);

  // Fetch initial data
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchDoctorProfile());
      dispatch(fetchCountries());
    }
  }, [dispatch, user?.id]);

  // Syncing form data with doctor profile
  useEffect(() => {
    if (doctor) {
      setFormData({
        phone: doctor.phone || "",
        age: doctor.age || "",
        country: doctor.country || "",
        state: doctor.state || "",
        city: doctor.city || "",
        clinicAddress: doctor.clinicAddress || "",
        gender: doctor.gender || "",
        profilePicture: null,
      });
      if (doctor.profilePicture) {
        setPreviewImage(doctor.profilePicture);
      }
    }
  }, [doctor]);

  // whennn country will change states will update according to ittt
  useEffect(() => {
    if (formData.country && countries.length > 0) {
      const selectedCountry = countries.find(
        (c) => c.name === formData.country
      );
      if (selectedCountry?.isoCode) {
        dispatch(fetchStatesByCountryCode(selectedCountry.isoCode));
        setFormData((prev) => ({ ...prev, state: "", city: "" }));
        dispatch(setCities([]));
      }
    } else {
      dispatch(setStates([]));
      dispatch(setCities([]));
    }
  }, [formData.country, countries, dispatch]);

  // Fetch cities when state changes
  useEffect(() => {
    if (formData.state && states.length > 0) {
      const selectedState = states.find((s) => s.name === formData.state);
      const selectedCountry = countries.find(
        (c) => c.name === formData.country
      );
      // console.log(selectedState?.stCode);

      if (selectedState?.stCode && selectedCountry?.isoCode) {
        // console.log(
        //   `Fetching cities for countryCode: ${selectedCountry.isoCode}, stateCode: ${selectedState.stateCode}`
        // );

        dispatch(
          fetchCitiesByCountryCodeAndStateCode({
            countryCode: selectedCountry?.isoCode,
            stateCode: selectedState?.stCode,
          })
        );

        setFormData((prev) => ({ ...prev, city: "" }));
      } else {
        // console.log(
        //   "No stateCode or isoCode found for state:",
        //   formData.state,
        //   "or country:",
        //   formData.country
        // );
        dispatch(setCities([]));
      }
    } else {
      dispatch(setCities([]));
    }
  }, [formData.state, states, countries, dispatch, formData.country]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      country: value,
      state: "",
      city: "",
    }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: value,
      city: "",
    }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      city: value,
    }));
  };

  // useEffect(() => {
  //   if (formData.country && countries.length > 0) {
  //     const selectedCountry = countries.find(
  //       (c) => c.name === formData.country
  //     );
  //     if (selectedCountry) {
  //       dispatch(setStates(selectedCountry.states));
  //       setFormData((prev) => ({ ...prev, state: "", city: "" }));
  //       dispatch(setCities([]));
  //     }
  //   }
  // }, [formData.country, countries, dispatch]);

  // whennn state will change countries will update according to ittt
  useEffect(() => {
    if (formData.state && states.length > 0) {
      const selectedState = states.find((s) => s.name === formData.state);

      if (selectedState) {
        dispatch(setCities(selectedState.cities));
        setFormData((prev) => ({ ...prev, city: "" }));
      }
    }
  }, [formData.state, states, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phone" || name === "age"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!formData.phone) {
      alert("Please enter a phone number.");
      return;
    }

    const updateData: Partial<Doctor> = {
      phone: formData.phone as number,
      age: formData.age as number,
      country:
        typeof formData.country === "object"
          ? formData.country.name
          : formData.country,
      state: formData.state,
      city: formData.city,
      clinicAddress: formData.clinicAddress,
      gender: formData.gender,
    };

    // Handle profile picture upload if present
    if (formData.profilePicture) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", formData.profilePicture);
      try {
        const uploadResponse = await fetch(
          "https://3a18-203-192-220-137.ngrok-free.app/api/v1/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: formDataUpload,
          }
        );
        const uploadResult = await uploadResponse.json();
        updateData.profilePicture = uploadResult.url;
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload profile picture.");
        return;
      }
    }

    dispatch(updateDoctorProfile(updateData))
      .then(() => {
        dispatch(fetchDoctorProfile());
        alert("Profile updated successfully");
      })
      .catch((err) => {
        console.error("Failed to update Profile:", err);
      });
  };

  const handleReset = () => {
    setFormData({
      phone: doctor?.phone || "",
      age: doctor?.age || "",
      country: doctor?.country || "",
      state: doctor?.state || "",
      city: doctor?.city || "",
      clinicAddress: doctor?.clinicAddress || "",
      gender: doctor?.gender || "",
      profilePicture: null,
    });
    setPreviewImage(doctor?.profilePicture || null);
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold text-gray-800">Basic Details</h4>
      </div>

      {/* Read-only Registration Details */}
      <div className="mb-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              First Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {user?.firstName || "N/A"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Last Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {user?.lastName || "N/A"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Email Address
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {user?.email || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="text"
              name="phone"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter phone number"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.age}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter age"
            />
          </div>

          {/* Country, State, City */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                name="country"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={formData.country}
                onChange={handleCountryChange}
                disabled={loading}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>

              <select
                name="state"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={formData.state}
                onChange={handleStateChange}
                disabled={loading || !formData.country}
              >
                <option value="">Select State</option>
                {states.length > 0 ? (
                  states.map((state) => (
                    <option key={state.name} value={state.name}>
                      {state.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No states available
                  </option>
                )}
              </select>

              <select
                name="city"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={formData.city}
                onChange={handleCityChange}
                disabled={loading || !formData.state || cities.length === 0}
              >
                <option value="">Select City</option>
                {cities.length > 0 ? (
                  cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No cities available
                  </option>
                )}
              </select>
            </div>
          </div>

          {/* Clinic Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Clinic Address
            </label>
            <input
              type="text"
              name="clinicAddress"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.clinicAddress}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="Enter clinic address"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={loading}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Profile Picture */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <button
                    className="text-blue-600 text-sm font-medium hover:underline"
                    onClick={() =>
                      document.getElementById("profilePictureInput")?.click()
                    }
                  >
                    Upload New
                  </button>
                  <button
                    className="text-red-600 text-sm font-medium ml-4 hover:underline"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        profilePicture: null,
                      }));
                      setPreviewImage(null);
                    }}
                    disabled={!previewImage}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Your image should be below 4 MB. Accepted format: jpg, png, svg
              </p>
              {formData.profilePicture && (
                <p className="text-sm text-gray-700 mt-2">
                  Uploaded file: {formData.profilePicture.name}
                </p>
              )}
            </div>
            <input
              type="file"
              id="profilePictureInput"
              accept="image/jpeg,image/png,image/svg+xml"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="mt-4 h-24 w-24 object-cover rounded-full"
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

{
  /* // import { useModal } from "../../hooks/useModal";
// import { Modal } from "../ui/modal";
// import Button from "../ui/button/Button";
// import Input from "../form/input/InputField";
// import Label from "../form/Label";

// export default function UserInfoCard() { */
}
{
  /* //   const { isOpen, openModal, closeModal } = useModal();
//   const handleSave = () => { */
}
{
  /* //     // Handle save logic here
//     console.log("Saving changes...");
//     closeModal();
//   };
//   return (
//     <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
//       <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
//         <div>
//           <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
//             Personal Information
//           </h4>

//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
//             <div>
//               <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                 First Name
//               </p>
//               <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                 Musharof
//               </p>
//             </div>

//             <div>
//               <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                 Last Name
//               </p>
//               <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                 Chowdhury
//               </p>
//             </div>

//             <div>
//               <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                 Email address
//               </p>
//               <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                 randomuser@pimjo.com
//               </p>
//             </div>

//             <div>
//               <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                 Phone
//               </p>
//               <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                 +09 363 398 46
//               </p>
//             </div>

//             <div>
//               <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                 Bio
//               </p>
//               <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                 Team Manager
//               </p>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={openModal}
//           className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
//         >
//           <svg
//             className="fill-current"
//             width="18"
//             height="18"
//             viewBox="0 0 18 18"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
//               fill=""
//             />
//           </svg>
//           Edit
//         </button>
//       </div>

//       <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
//         <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
//           <div className="px-2 pr-14">
//             <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
//               Edit Personal Information
//             </h4>
//             <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
//               Update your details to keep your profile up-to-date.
//             </p>
//           </div>
//           <form className="flex flex-col">
//             <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
//               <div>
//                 <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
//                   Social Links
//                 </h5>

//                 <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
//                   <div>
//                     <Label>Facebook</Label>
//                     <Input
//                       type="text"
//                       value="https://www.facebook.com/PimjoHQ"
//                     />
//                   </div>

//                   <div>
//                     <Label>X.com</Label>
//                     <Input type="text" value="https://x.com/PimjoHQ" />
//                   </div>

//                   <div>
//                     <Label>Linkedin</Label>
//                     <Input
//                       type="text"
//                       value="https://www.linkedin.com/company/pimjo"
//                     />
//                   </div>

//                   <div>
//                     <Label>Instagram</Label>
//                     <Input type="text" value="https://instagram.com/PimjoHQ" />
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-7">
//                 <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
//                   Personal Information
//                 </h5>

//                 <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
//                   <div className="col-span-2 lg:col-span-1">
//                     <Label>First Name</Label>
//                     <Input type="text" value="Musharof" />
//                   </div>

//                   <div className="col-span-2 lg:col-span-1">
//                     <Label>Last Name</Label>
//                     <Input type="text" value="Chowdhury" />
//                   </div>

//                   <div className="col-span-2 lg:col-span-1">
//                     <Label>Email Address</Label>
//                     <Input type="text" value="randomuser@pimjo.com" />
//                   </div>

//                   <div className="col-span-2 lg:col-span-1">
//                     <Label>Phone</Label>
//                     <Input type="text" value="+09 363 398 46" />
//                   </div>

//                   <div className="col-span-2">
//                     <Label>Bio</Label>
//                     <Input type="text" value="Team Manager" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
//               <Button size="sm" variant="outline" onClick={closeModal}>
//                 Close
//               </Button>
//               <Button size="sm" onClick={handleSave}>
//                 Save Changes
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </div>
//   );
// } */
}
