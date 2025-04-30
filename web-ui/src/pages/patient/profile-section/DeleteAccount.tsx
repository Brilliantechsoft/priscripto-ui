import React from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import { Button } from "../../../components/ui/button";

const DeleteAccount: React.FC = ({}) => {
  return (
    <div className="w-full bg-white">
      <ComponentCard title="Delete account">
        <div></div>
        <div className="flex flex-col gap-4">
          <div> 
            <p className="font-bold">
              Are you aure you want to delete your account?
            </p>
            <p>
              Refers to the action of permanently removing a user's account and
              associated data from a system, service and platform.
            </p>
          </div>
          <div>
            <Button className="text-white">Delete Account</Button>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
};

export default DeleteAccount;
