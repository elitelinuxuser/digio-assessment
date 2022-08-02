import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {object, string} from "yup";
import {GoogleLoginButton} from "react-social-login-buttons";
import {useState} from "react";
import {useRouter} from "next/router";
import clsx from "clsx";

const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const router = useRouter();

    const handleGoogleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.push('/sign');
        }, 1000);
    }

  return (
    <div className={'flex flex-col h-screen justify-between'}>
        <header className={'flex flex-row bg-primary p-4 justify-between'}>
            <Head>
                <title>Digio</title>
                <meta name="description" content="Powered by Digio" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={'text-white'}>
                <span className={'text-2xl font-semibold'}>Sign document using</span> <br /> <span className={'text-lg'}>{email === '' ? 'your email': email}</span>
            </div>
            <div className={'bg-white p-1 hidden sm:block'}>
                <Image src='/images/generic_logo.png' alt={'Generic Logo'} width={172} height={42} />
            </div>
        </header>

        <main className={'mb-auto max-w-lg w-full m-auto container'}>
            <section className={'my-section text-center w-full max-w-md mx-auto'}>
                <div className={'font-semibold text-lg my-2'}>
                    <div>{email === '' ? 'Your email' : email} uses Gmail?</div>
                    <div>Login using Google</div>
                </div>
                <div>
                    <GoogleLoginButton onClick={handleGoogleLogin} />
                </div>
            </section>
            <div className="relative flex items-center w-full">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-xl font-semibold">OR</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <section className={'my-section max-w-md mx-auto'}>
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={object().shape({
                        email: string().email('Must be a valid email')
                    })}
                    onSubmit={handleSubmit}
                >
                    {({handleChange, isValid, dirty}) => (
                        <Form>
                            <section className={'my-section'}>
                                <label htmlFor="authEmail" className="form-label inline-block mb-2 font-medium text-base">
                                    Proceed with your email address
                                </label>
                                <Field
                                    type="email"
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
                                    onChange={(event: any) => {
                                        setEmail(event.target.value);
                                        handleChange(event);
                                    }}
                                    id="authEmail"
                                    name={'email'}
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage name="email" render={(error) => <div className={'text-red-600'}>{error}</div>} />
                            </section>
                            <p className={'mb-4'}>By continuing, I confirm to the <span className={'font-semibold'}>Terms and Service</span> and <span className={'font-semibold'}>Privacy Policy</span> of <a className={'text-primary'} href={'https://digio.in'}>Digio.in</a></p>
                            <button className={clsx('inline-flex items-center justify-center btn primary lg font-semibold w-full')} type={'submit'} disabled={!isValid || !dirty}>
                                {isLoading && (
                                    <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                )}
                                CONTINUE
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>
        </main>

        <footer className={styles.footer}>
            <div className={'flex flex-row items-center flex-1 justify-center'}>
                <div className={'flex'}>
                    <Image src="/images/digio_logo.jpg" alt="Digio Logo" width={48} height={48} />
                </div>
                <div className={'ml-2 items-center'}>
                    Powered by <br />
                    <a
                        className={'text-primary'}
                        href="https://digio.in"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        www.digio.in
                    </a>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Home
