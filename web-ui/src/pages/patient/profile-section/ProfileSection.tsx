import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/appDispatchHook";

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
  pincode: number | "";
  gender: string;
  profilePicture: File | null;
}

export default function ProfileSection() {
    
  const { loading, doctor, error, countries, states, cities } = useAppSelector(
    (state) => state.doctorProfile
  );

    const { user } = useAppSelector((state) => state.signInPatient) || {};

    console.log(user);
    

  const [formData, setFormData] = useState<FormData>({
    phone: "",
    age: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    gender: "",
    profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handleReset = () => {
    setFormData({
      phone: doctor?.phone || "",
      age: doctor?.age || "",
      country: doctor?.country || "",
      state: doctor?.state || "",
      city: doctor?.city || "",
      pincode: doctor?.pincode || "",
      gender: doctor?.gender || "",
      profilePicture: null,
    });
    setPreviewImage(doctor?.profilePicture || null);
  };

  const handleSave = async () => {
    if (!formData.phone) {
      alert("Please enter a phone number.");
      return;
    }
}

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFormData((prev) => ({ ...prev, profilePicture: file }));
        setPreviewImage(URL.createObjectURL(file));
      }
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
                  Your image should be below 4 MB. Accepted format: jpg, png,
                  svg
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
  };
