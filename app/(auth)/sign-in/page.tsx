"use client"

import React, {Fragment} from 'react'
import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {useForm} from "react-hook-form";

const SignIn = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            email: "",
            password: "",
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
            <h1 className={'form-title'}>Log In Your Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={'space-y-6'}>
                <InputField
                    name={"email"}
                    label={"Email"}
                    placeholder={"abc@xyz.com"}
                    register={register}
                    type="email"
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
                <Button type={"submit"} className={'yellow-btn w-full mt-5'}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <FooterLink text={'Dont have an account? '} linkText={"Sign up"} href={'/sign-up'} />
            </form>
        </Fragment>
    )
}
export default SignIn