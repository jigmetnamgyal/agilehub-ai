"use client"
import Image from "next/image";
import googleIcon from '../../../../public/google.svg'
import Link from "next/link";

const SignUp = () => {
    return(
        <div className="flex w-screen min-h-screen h-screen justify-center items-center">
            <div className="w-full h-full flex flex-col">
                <div className="w-[70%] flex flex-col h-full justify-center mx-auto">
                <div>
                    <p className="text-3xl font-extrabold">Sign Up</p>
                    <p className="mt-3 text-xs text-gray-400">Create your free Jaggle account</p>
                    <div className="mt-10">
                        <button className="btn bg-white w-full text-black hover:bg-transparent hover:text-white">
                            <Image src={googleIcon} width="40" height="40" alt="Google Icon"></Image>
                            <p>Sign up with Google</p>
                        </button>
                    </div>
                </div>
                <div className="divider mt-10">Or continue with</div>
                <div className="w-full">
                    <form action="" className="flex flex-col gap-2 w-full">
                        <label htmlFor="name">Full Name</label>
                        <input required type="text" placeholder="Jaggle" className="input input-bordered w-full" />

                        <label htmlFor="email" className="mt-3">Email</label>
                        <input required type="text" placeholder="jtn@gmail.com" className="input input-bordered w-full" />

                        <label htmlFor="password" className="mt-3">Password</label>
                        <input required type="password" placeholder="Password" className="input input-bordered w-full" />

                        <button className="btn bg-white w-full mt-5 text-black hover:bg-transparent hover:text-white">Sign up</button>

                        <p className="text-sm text-gray-400 mt-3">Already have an account? <Link href={'/auth/login'} className="text-pink-300">Login here</Link></p>
                    </form>
                </div>
                </div>
                
            </div>
            <div className="w-full h-full bg-white">
                
            </div>
        </div>
    );
}

export default SignUp;