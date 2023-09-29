import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
const SignIn = () => {
    const { data, status } = useSession()

    async function handleSignIn() {
        const result = await signIn("google");

    }
    return (
        <>
<div className="bg-gray-100">
            {
                data
                    ?
                    <div className="flex flex-col space-y-28 justify-center items-center min-h-screen">
                        <div className="flex text-gray-700 flex-col space-y-6">
                            <img src={data.user.image} alt="" />
                            <h1>You are Currently signed In as {data.user.name}</h1>
                            <h3>Email :{data.user.email}</h3>
                        </div>
                        <button
                            className="border-2 px-2 py-2 text-xl text-white bg-emerald-500"
                            onClick={signOut}>Sign Out</button>
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center min-h-screen" >
                        {/* <SignInForm /> */}
                        <button
                            className="border-2 mt-6 px-2 py-2 text-xl text-white bg-emerald-500"
                            onClick={handleSignIn}>Sign In With Google
                        </button>
                    </div>
            }
</div>
        </>
    );
}

export default SignIn;
function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <form className="flex flex-col space-y-4" >
            <input type="text"
                value={email}
                name='email'
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className='border-2 focus:outline-emerald-500 py-2 px-2'
                placeholder='input your email'
            />

            <input type="password" value={password}
                name='password'
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className='border-2 focus:outline-emerald-500 py-2 px-2'
                placeholder='input your password'
            />
            <button type="submit"
                className="hover:text-white hover:bg-emerald-400 border-2 font-sans font-semibold text-gray-600 border-emerald-500"
            >Submit</button>
            <h6 className="text-center"> OR</h6>
        </form>
    )
}