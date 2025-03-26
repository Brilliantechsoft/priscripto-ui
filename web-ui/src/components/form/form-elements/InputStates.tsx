import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";
import { validateEmail } from "../../../utils/validation";

export default function InputStates() {
  const [email, setEmail] = useState("");
  const [emailTwo, setEmailTwo] = useState("");
  const [error, setError] = useState(false);

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
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className={error ? "border-error-500" : ""}
          />
          {error && (
            <p className="mt-1 text-sm text-error-500">
              Please enter a valid email address
            </p>
          )}
        </div>

        {/* Success Input */}
        <div>
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
