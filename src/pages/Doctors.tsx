import { useState } from "react";
import ComponentCard from "../components/common/ComponentCard";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import { EnvelopeIcon } from "../icons";

const Doctors: React.FC = () => {

  // Email Validation
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  return (
    <>
      <ComponentCard title="Fill Doctors Details">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* <div className="space-y-6"> */}
          <div>
            <Label htmlFor="input">Name</Label>
            <Input type="text" id="input" placeholder="Name" />
          </div>
          <div>
            <Label>Email</Label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                error={error}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                hint={error ? "This is an invalid email address." : ""}
                className="pl-[82px]"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <EnvelopeIcon className="size-6" />
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="input">Qualification</Label>
            <Input type="text" id="input" />
          </div>
          <div>
            <Label htmlFor="input">Experience</Label>
            <Input type="text" id="input" />
          </div>
          <div>
            <Label htmlFor="input">Age</Label>
            <Input type="text" id="input" />
          </div>
          <div>
            <Label htmlFor="input">Mobile No</Label>
            <Input type="text" id="input" />
          </div>
        </div>
        <div className="space-y-6">

        </div>
        {/* </div> */}
      </ComponentCard>
    </>
  );
};

export default Doctors;
