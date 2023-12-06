"use client"

// import Image from "next/image";
// import googleIcon from '../../../../public/google.svg'
import Link from "next/link";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isLoaded, signIn, setActive } = useSignIn();

    if (!isLoaded) {
        return null;
    }

    async function submit(e: any) {
        e.preventDefault();
    
    }

    return(
        <div className="flex w-screen min-h-screen h-screen justify-center items-center">
            <div className="w-full h-full flex flex-col">
            <div className="w-[70%] flex flex-col h-full justify-center mx-auto">
            <div>
                <p className="text-3xl font-extrabold">Welcome Back</p>
                <p className="mt-3 text-xs text-gray-400">Login to continue writing</p>
                {/* <div className="mt-10">
                    <button className="btn bg-white w-full text-black hover:bg-transparent hover:text-white">
                        <Image src={googleIcon} width="40" height="40" alt="Google Icon"></Image>
                        <p>Login With Google</p>
                    </button>
                </div> */}
            </div>
                {/* <div className="divider mt-10">Or continue with</div> */}
                <div className="w-full mt-10">
                    <form action="" className="flex flex-col gap-4 w-full">
                        <label htmlFor="email">Email</label>
                        <input required type="text" placeholder="jtn@gmail.com" className="input input-bordered w-full" />

                        <label htmlFor="password" className="mt-3">Password</label>
                        <input required type="password" placeholder="Password" className="input input-bordered w-full" />

                        <button className="btn bg-white w-full mt-3 text-black hover:bg-transparent hover:text-white">Login</button>

                        <Link href={'/auth/forgot-password'} className="text-sm text-pink-300">Forgot Password?</Link>

                        <p className="text-sm text-gray-400">Don't have an account? <Link href={'/auth/sign-up'} className="text-pink-300">Sign up here</Link></p>
                    </form>
                </div>
            </div>
                
            </div>
            <div className="w-full h-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex-col text-black flex justify-center items-center">
                <p className="text-5xl text-center font-extrabold"><span className="">Jaggle</span> your coworker, supercharged by AI.</p>
                <p className="mt-10 text-gray-500">jenniai.com</p>
            </div>
        </div>
    );
}

export default Login;