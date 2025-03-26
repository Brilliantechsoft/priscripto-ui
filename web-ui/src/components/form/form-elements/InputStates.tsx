import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";
<<<<<<< HEAD
import { validateEmail } from "../../../utils/validation";

=======
>>>>>>> dd3918da7b52a53b4efc0026bb7e9b4544c3767d
export default function InputStates() {
  const [email, setEmail] = useState("");
  const [emailTwo, setEmailTwo] = useState("");
  const [error, setError] = useState(false);

<<<<<<< HEAD
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError(!validateEmail(value));
  };

  const handleEmailTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailTwo(value);
    setError(!validateEmail(value));
  };

=======
  // Simulate a validation check
  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };
  const handleEmailTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailTwo(value);
    validateEmail(value);
  };
>>>>>>> dd3918da7b52a53b4efc0026bb7e9b4544c3767d
  return (
    <ComponentCard
      title="Input States"
      desc="Validation styles for error, success and disabled states on form controls."
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Error Input */}
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
<<<<<<< HEAD
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className={error ? "border-error-500" : ""}
          />
          {error && (
            <p className="mt-1 text-sm text-error-500">
              Please enter a valid email address
            </p>
          )}
=======
            error={error}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            hint={error ? "This is an invalid email address." : ""}
          />
>>>>>>> dd3918da7b52a53b4efc0026bb7e9b4544c3767d
        </div>

        {/* Success Input */}
        <div>
<<<<<<< HEAD
          <Label>Email (with validation)</Label>
          <Input
            type="email"
            value={emailTwo}
            onChange={handleEmailTwoChange}
            placeholder="Enter your email"
            className={error ? "border-error-500" : ""}
          />
          {error && (
            <p className="mt-1 text-sm text-error-500">
              Please enter a valid email address
            </p>
          )}
=======
          <Label>Email</Label>
          <Input
            type="email"
            value={emailTwo}
            success={!error}
            onChange={handleEmailTwoChange}
            placeholder="Enter your email"
            hint={!error ? "This is an success message." : ""}
          />
>>>>>>> dd3918da7b52a53b4efc0026bb7e9b4544c3767d
        </div>

        {/* Disabled Input */}
        <div>
          <Label>Email</Label>
          <Input
            type="text"
            value="disabled@example.com"
            disabled={true}
            placeholder="Disabled email"
          />
        </div>
      </div>
    </ComponentCard>
  );
}
