import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks/appDispatchHook";
import {
  fetchSpecializations,
  fetchDegrees,
  updateDoctorProfile,
  fetchDoctorProfile,
} from "../../redux/doctor/doctorProfileSlice";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  specialization: string;
  degree: string;
}

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.signInDoctor);
  const { specializations, degrees, loading, doctor } = useAppSelector(
    (state) => state.doctorProfile
  );

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    specialization: "",
    degree: "",
  });

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchSpecializations());
    dispatch(fetchDegrees());
    if (user?.id) {
      dispatch(fetchDoctorProfile());
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (user && doctor) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: doctor.phone || "",
        bio: doctor.bio || "",
        specialization: doctor.specialization || "",
        degree: doctor.degree || "",
      });
    }
  }, [user, doctor]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(`${field} updated to:`, value);
  };

  // const handleSave = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const updateData = {
  //     // phone: formData.phone,
  //     // bio: formData.bio,
  //     specialization: formData.specialization,
  //     degree: formData.degree,
  //   };
  //   dispatch(updateDoctorProfile(updateData));
  //   closeModal();
  // };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        updateDoctorProfile({
          specialization: formData.specialization,
          degree: formData.degree,
        })
      ).unwrap();
      alert("Profile updated successfully");
      closeModal();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // const handleSave = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(
  //     updateDoctorProfile({
  //       specialization: formData.specialization,
  //       degree: formData.degree,
  //     })
  //   ).then(() => {
  //     // Fetch profile again to ensure sync with backend
  //     dispatch(fetchDoctorProfile()); // You'll need to create this thunk
  //     closeModal();
  //   });
  // };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

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
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {doctor?.phone || "N/A"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Specialization
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {doctor?.specialization || "Not set"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Degree
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {doctor?.degree || "Not set"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          disabled={loading}
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSave}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              {/* <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      value="https://www.facebook.com/PimjoHQ"
                    />
                  </div>

                  <div>
                    <Label>X.com</Label>
                    <Input type="text" value="https://x.com/PimjoHQ" />
                  </div>

                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      value="https://www.linkedin.com/company/pimjo"
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input type="text" value="https://instagram.com/PimjoHQ" />
                  </div>
                </div>
              </div> */}

              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      // required
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      // required
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      // required
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input type="text" value="+09 363 398 46" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Specialization</Label>
                    {loading ? (
                      <div>Loading specializations...</div>
                    ) : (
                      <Select
                        options={(specializations || []).map((spec) => ({
                          value: spec,
                          label: spec,
                        }))}
                        placeholder="Select Specialization"
                        onChange={handleSelectChange("specialization")}
                        defaultValue={formData.specialization}
                        className="w-full"
                      />
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Degree</Label>
                    {loading ? (
                      <div>Loading degrees...</div>
                    ) : (
                      <Select
                        options={(degrees || []).map((deg) => ({
                          value: deg,
                          label: deg,
                        }))}
                        placeholder="Select Degree"
                        onChange={handleSelectChange("degree")}
                        defaultValue={formData.degree}
                        className="w-full"
                      />
                    )}
                  </div>

                  <div className="col-span-2">
                    <Label>Bio</Label>
                    <Input type="text" value="Team Manager" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModal}
                disabled={loading}
              >
                Close
              </Button>
              <Button size="sm" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
