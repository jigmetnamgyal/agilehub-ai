"use client";

import Link from "next/link";
import { useState } from "react";
import { useSignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const user = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerifying(true);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
        //TODO: throw error
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push(`/editor/${completeSignUp.createdUserId}`);
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  if (verifying) {
    return (
      <div className="flex w-screen min-h-screen h-screen justify-center items-center">
        <div className="w-full h-full flex flex-col">
          <div className="w-[70%] flex flex-col h-full justify-center mx-auto">
            <div>
              <p className="text-3xl font-extrabold">Email Verification</p>
              <p className="mt-3 text-xs text-gray-400">
                Please verify with the OTP sent to your email address
              </p>
            </div>
            <div className="w-full mt-10">
              <form action="" className="flex flex-col gap-2 w-full">
                <label htmlFor="name">OTP</label>
                <input
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  id="name"
                  type="text"
                  placeholder="****"
                  className="input input-bordered w-full"
                />

                <div className="divider mt-10">***</div>

                <button
                  onClick={handleVerify}
                  className="btn bg-white w-full mt-5 text-black hover:bg-transparent hover:text-white"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full flex-col h-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-black flex justify-center items-center">
          <p className="text-5xl text-center font-extrabold">
            <span className="">Jaggle</span> your coworker, supercharged by AI.
          </p>
          <p className="mt-10 text-gray-500">jenniai.com</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-screen min-h-screen h-screen justify-center items-center">
      <div className="w-full h-full flex flex-col">
        <div className="w-[70%] flex flex-col h-full justify-center mx-auto">
          <div>
            <p className="text-3xl font-extrabold">Sign Up</p>
            <p className="mt-3 text-xs text-gray-400">
              Create your free Jaggle account
            </p>
            {/* <div className="mt-10">
                        <Link href={`https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&state=GXWjhHhppJCNFcq8Y6HRl4HGx2xmEeC3`}>
                            <button className="btn bg-white w-full text-black hover:bg-transparent hover:text-white">
                                <Image src={googleIcon} width="40" height="40" alt="Google Icon"></Image>
                                <p>Sign up with Google</p>
                            </button>
                        </Link>
                    </div> */}
          </div>
          {/* <div className="divider mt-10">Or continue with</div> */}
          <div className="w-full mt-10">
            <form action="" className="flex flex-col gap-2 w-full">
              <div className="w-full flex">
                <div className="w-full mr-4">
                  <label htmlFor="fname">First Name</label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    id="fname"
                    type="text"
                    placeholder="Jaggle"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    id="lname"
                    type="text"
                    placeholder="Ai"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <label htmlFor="email" className="mt-3">
                Email
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                type="text"
                placeholder="jtn@gmail.com"
                className="input input-bordered w-full"
              />

              <label htmlFor="password" className="mt-3">
                Password
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
              />

              <button
                onClick={handleSignUp}
                className="btn bg-white w-full mt-5 text-black hover:bg-transparent hover:text-white"
              >
                Sign up
              </button>

              <p className="text-sm text-gray-400 mt-3">
                Already have an account?{" "}
                <Link href={"/auth/login"} className="text-pink-300">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full flex-col h-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-black flex justify-center items-center">
        <p className="text-5xl text-center font-extrabold">
          <span className="">Jaggle</span> your coworker, supercharged by AI.
        </p>
        <p className="mt-10 text-gray-500">jenniai.com</p>
      </div>
    </div>
  );
};

export default SignUp;
