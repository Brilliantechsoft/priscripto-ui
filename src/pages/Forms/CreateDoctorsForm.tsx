import React from 'react'
import { useState } from "react";
import ComponentCard from '../../components/common/ComponentCard';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
import PhoneInput from '../../components/form/group-input/PhoneInput';
import Button from '../../components/ui/button/Button';
import Form from '../../components/form/Form';

const CreateDoctorsForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        qualification: "",
        experience: "",
        age: "",
        phone: "",
    });
    const [error, setError] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate email separately
        if (name === "email") validateEmail(value);
    };

    const handlePhoneNumberChange = (phoneNumber: string) => {
        setFormData((prev) => ({ ...prev, phone: phoneNumber }));
    };

    const validateEmail = (value: string) => {
        const isValidEmail =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        setError(!isValidEmail);
        return isValidEmail;
    };

    const countries = [
        { code: "IN", label: "+91" },
        { code: "US", label: "+1" },
        { code: "GB", label: "+44" },
        { code: "CA", label: "+1" },
        { code: "AU", label: "+61" },
    ];


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <div>
            <ComponentCard title="Fill Doctors Details">
                <Form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        {/* <div className="space-y-6"> */}
                        <div>
                            <Label htmlFor="input">Name</Label>
                            <Input type="text" id="name" name='name' value={formData.name} onChange={handleInputChange} placeholder="Enter Your Name" />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={formData.email}
                                error={error}
                                name='email'
                                id='email'
                                onChange={handleInputChange}
                                placeholder="Enter Your Email"
                                hint={error ? "This is an invalid email address." : ""}
                            />
                        </div>
                        <div>
                            <Label htmlFor="input">Qualification</Label>
                            <Input type="text" id="qualification" name='qualification' onChange={handleInputChange} value={formData.qualification} placeholder="Enter Your Qualification" />
                        </div>
                        <div>
                            <Label htmlFor="input">Experience</Label>
                            <Input type="text" value={formData.experience} onChange={handleInputChange} id="experience" name="experience" placeholder="Enter Your Experience" />
                        </div>
                        <div>
                            <Label htmlFor="input">Age</Label>
                            <Input type="text" value={formData.age} onChange={handleInputChange} name='age' id="age" placeholder="Enter Your Age" />
                        </div>
                        <div>
                            <div>
                                <Label>Phone</Label>
                                <PhoneInput
                                    selectPosition="start"
                                    countries={countries}
                                    placeholder="+1 (555) 000-0000"
                                    onChange={handlePhoneNumberChange}
                                />
                            </div>{" "}
                        </div>
                        <Button size="sm" variant="primary">
                            Create Doctor
                        </Button>
                    </div>
                    <div className="space-y-6">
                    </div>
                    {/* </div> */}
                </Form>
            </ComponentCard>
        </div>
    )
}

export default CreateDoctorsForm