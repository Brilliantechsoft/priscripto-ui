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
import { ChevronDownIcon, FilterIcon } from "lucide-react";
import { FaCalendarAlt, FaMapMarkerAlt, FaPaperclip } from "react-icons/fa";

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
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | "";
  age: number | "";
  country: string;
  state: string;
  city: string;
  pincode: number | "";
  clinicAddress: string;
  gender: string;
  image: File | null;
}

export default function UserInfoCard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.signInDoctor) || {};
  const { loading, doctor, error, countries, states, cities } = useAppSelector(
    (state) => state.doctorProfile
  );

  const [formData, setFormData] = useState<FormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: "",
    age: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    clinicAddress: "",
    gender: "",
    image: null,
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
      setFormData((prev) => ({
        firstName: prev.firstName || doctor.firstName || "",
        lastName: prev.lastName || doctor.lastName || "",
        email: prev.email || doctor.email || "",
        phoneNumber: doctor.phoneNumber || "",
        age: doctor.age || "",
        country: doctor.country || "",
        state: doctor.state || "",
        city: doctor.city || "",
        pincode: doctor.pincode || "",
        clinicAddress: doctor.clinicAddress || "",
        gender: doctor.gender || "",
        image: null,
      }));
      if (doctor.image) {
        setPreviewImage(doctor.image);
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
        name === "phone" || name === "age" || name === "pincode"
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
    if (
      !formData.phoneNumber ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      // Create update payload with only the fields that have values
      const updateData: Partial<Doctor> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber as number,
        ...(formData.age && { age: formData.age as number }),
        ...(formData.country && { country: formData.country }),
        ...(formData.state && { state: formData.state }),
        ...(formData.city && { city: formData.city }),
        ...(formData.pincode && { pincode: formData.pincode as number }),
        ...(formData.clinicAddress && {
          clinicAddress: formData.clinicAddress,
        }),
        ...(formData.gender && { gender: formData.gender.toUpperCase() }),
      };

      // Handle image upload if present
      if (formData.image) {
        const formDataUpload = new FormData();
        formDataUpload.append("image", formData.image);

        const uploadResponse = await fetch(
          "http://192.168.1.49:8080/api/v1/doctors/upload-image",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: formDataUpload,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error(`Image upload failed: ${uploadResponse.statusText}`);
        }

        const uploadResult = await uploadResponse.json();
        updateData.image = uploadResult.profileImage;
      }

      // Dispatch the update action
      await dispatch(updateDoctorProfile(updateData)).unwrap();

      // Refresh the profile data
      await dispatch(fetchDoctorProfile()).unwrap();

      alert("Basic details updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(`Failed to update profile: ${error.message || "Please try again"}`);
    }
  };

  const handleReset = () => {
    if (doctor) {
      setFormData({
        firstName: doctor.firstName || "",
        lastName: doctor.lastName || "",
        email: doctor.email || "",
        phoneNumber: doctor?.phoneNumber || "",
        age: doctor?.age || "",
        country: doctor?.country || "",
        state: doctor?.state || "",
        city: doctor?.city || "",
        pincode: doctor?.pincode || "",
        clinicAddress: doctor?.clinicAddress || "",
        gender: doctor?.gender || "",
        image: null,
      });
      setPreviewImage(doctor?.image || null);
    }
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold text-gray-800">Basic Details</h4>
      </div>

      {/* Read-only Registration Details */}
      {/* <div className="mb-6">
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
      </div> */}

      {/* Editable Fields */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
          {/* First Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:col-span-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter email"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter phone number"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age *
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
            </div>
          </div>

          {/* Country, State, City */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <select
                name="country"
                className="w-full p-2 border border-gray-300 rounded-md"
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
                className="w-full p-2 border border-gray-300 rounded-md"
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
                className="w-full p-2 border border-gray-300 rounded-md"
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

          {/* Clinic Address, Pincode, Gender */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Enter pincode"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Clinic Address *
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender *
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
            </div>
          </div>

          {/* Profile Picture */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image *
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
                        image: null,
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
              {formData.image && (
                <p className="text-sm text-gray-700 mt-2">
                  Uploaded file: {formData.image.name}
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
