import { useSession } from "next-auth/react";
import SignIn from "./SignIn";
const Profile = () => {
    const { data, status } = useSession()
    if (status === 'unauthenticated') {
        return <SignIn />
    }
    console.log(data)
    return (
        <div>
            {data && (
                <>
                    <div className="flex flex-col pt-24 ">
                        <img src={data.user.image} alt={data.user.name}
                            width={120}
                            className='mx-auto'
                        />
                        <div className="ml-3 mt-12 space-y-3">
                            <h1>Name: {data.user.name}</h1>
                            <h1>Email: {data.user.email}</h1>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

export default Profile;