"use client"

import React, { Fragment } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";

const SignUp = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            country: "PK",
            investmentGoals: "Growth",
            riskTolerance: "Medium",
            preferredIndustry: "Technology"
        },
        mode: "onBlur"
    })

    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data)
        } catch (error: unknown) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <h1 className={'form-title'}>Sign Up & Personalize</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={'space-y-6'}>
                <InputField
                    name={"fullName"}
                    label={"Full Name"}
                    placeholder={"John doe.."}
                    register={register}
                    error={errors.fullName}
                    validation={{ required: "Full name is required", minLength: 2 }}
                />
                <InputField
                    name={"email"}
                    label={"Email"}
                    placeholder={"abc@xyz.com"}
                    register={register}
                    error={errors.email}
                    validation={{ required: "Email name is required", pattern: /^\w+@\w+\.\w+$/, message: "Email is required" }}
                />
                <InputField
                    name={"password"}
                    label={"Password"}
                    placeholder={"Enter your password"}
                    register={register}
                    error={errors.password}
                    type={'password'}
                    validation={{ required: "Password is required", minLength: 8 }}
                />
                <CountrySelectField
                    name="country"
                    label="Country"
                    placeholder="Select your country"
                    control={control}
                    error={errors.country}
                    required
                />
                <SelectField
                    name={"investmentGoals"}
                    label={"Investment Goals"}
                    placeholder={"Select your investment Goals"}
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />
                <SelectField
                    name={"riskTolerance"}
                    label={"Risk Tolerance"}
                    placeholder={"Select your risk level"}
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />
                <SelectField
                    name={"preferredIndustry"}
                    label={"Preferred Industry"}
                    placeholder={"Select your preferred industry"}
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />
                <Button type={"submit"} className={'yellow-btn w-full mt-5'}>
                    {isSubmitting ? "Creating Account..." : "Start Your Investment Journey"}
                </Button>
                <FooterLink text={'Already have an account? '} linkText={"Sign in"} href={'/sign-in'} />
            </form>
        </Fragment>
    )
}
export default SignUp;
