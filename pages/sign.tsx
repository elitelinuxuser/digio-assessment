import {NextPage} from "next";
import {useState} from "react";
import Image from 'next/image'

import ConsentImage from '../public/images/consent.webp';
import clsx from "clsx";
import {Dialog, DialogTitle} from "@mui/material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {number, object, string} from "yup";

enum SignStatus {
    PENDING,
    LOADING,
    COMPLETE,
}

const SignPage: NextPage = () => {
    const [signStatus, setSignStatus] = useState(SignStatus.PENDING);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showOtp, setShowOtp] = useState(false);

    const getTitle = () => {
        switch (signStatus) {
            case SignStatus.PENDING:
                return 'Requires Signing';
            case SignStatus.LOADING:
                return 'Signing...'
            case SignStatus.COMPLETE:
                return 'Document Signed!'
        }
    }

    const header = () => (
        <div className={'p-4'}>
            <div className={'text-2xl mb-2'}>{getTitle()}</div>
            <p className={'text-primary'}>Mutual Non-Disclosure Agreement</p>
        </div>
    );

    const handleSign = () => {
        setIsModalOpen(false);
        setSignStatus(SignStatus.LOADING);
        setTimeout(() => {
            setSignStatus(SignStatus.COMPLETE);
        }, 3000)
    }

    const aadhaarModal = () => {
        return (
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DialogTitle>Register Aadhaar</DialogTitle>
                <Formik initialValues={{
                    id: '',
                    otp: ''
                }}
                        validationSchema={object().shape({
                            id: string().min(12, 'Minimum 12 characters').required('Aadhaar number is required'),
                            otp: string().min(6, 'Need to be 6 digits').required('OTP is required')
                        })}
                        onSubmit={handleSign}>
                    {({handleChange, isValid, values, dirty, errors}) => (
                        <Form className={'m-4'}>
                            <div className={'flex flex-row'}>
                                <Image src={'/images/aadhar_logo.png'} height={24} width={130} />
                                <Field
                                    type="text"
                                    className="
                                    form-control
                                    block
                                    w-full
                                    px-4
                                    py-3
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                    id="adid"
                                    name={'id'}
                                    placeholder="Aadhaar number"
                                />
                                <button onClick={() => {
                                    if (values.id !== '') {
                                        setShowOtp(true)
                                    }
                                }} className={clsx('inline-flex items-center justify-center btn primary lg font-semibold mx-2')} disabled={Boolean(errors.id)}>
                                    Verify
                                </button>
                            </div>
                            <ErrorMessage name="id" render={(error) => <div className={'text-red-600'}>{error}</div>} />
                            {showOtp && (
                                <div className={'flex flex-row mt-4'}>
                                    <Field
                                        type="text"
                                        className="
                                    form-control
                                    block
                                    w-full
                                    px-4
                                    py-3
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                        id="otp"
                                        name={'otp'}
                                        placeholder="Enter your otp"
                                    />
                                    <button className={clsx('inline-flex items-center justify-center btn primary lg font-semibold mx-2')} type={'submit'} disabled={!isValid || !dirty}>
                                        Submit
                                    </button>
                                </div>
                            )}
                            <ErrorMessage name="email" render={(error) => <div className={'text-red-600'}>{error}</div>} />
                        </Form>
                    )}
                </Formik>
            </Dialog>
        );
    }

    return (
        <>
            {header()}
            <hr />
            <div className={'flex flex-1 px-4 my-section mx-auto justify-center'}>
                <Image src={ConsentImage} />
            </div>
            { signStatus !== SignStatus.COMPLETE && (
                <div className={'flex flex-1 justify-center my-section'}>
                    <button onClick={() => setIsModalOpen(true)} className={clsx('inline-flex items-center justify-center btn primary lg font-semibold mx-auto')} disabled={isModalOpen || signStatus === SignStatus.LOADING}>
                        Request OTP to Sign
                    </button>
                </div>
            ) }
            {aadhaarModal()}
        </>
    );
}

export default SignPage;