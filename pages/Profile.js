import Footer from "@/components/Footer";
import { signOut, useSession } from "next-auth/react";
import SignIn from "./SignIn";
import { FiEdit } from "react-icons/fi"

const Profile = () => {
    const { data, status } = useSession();

    if (status === "unauthenticated") {
        return <SignIn />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {data && (
                <>
                    <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl mx-auto mt-12">
                        <div className="flex items-center space-x-4">
                            <img
                                src={data.user.image}
                                alt={data.user.name}
                                width={120}
                                className="w-20 h-20 rounded-full"
                            />
                            <div>
                                <h1 className="text-3xl font-semibold">{data.user.name}</h1>
                                <p className="text-gray-600">{data.user.email}</p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between cursor-pointer">
                            <div>
                                <h2 className="text-xl font-semibold">Address</h2>
                                <p className="text-gray-600">30 huila, banagana, Ethiopa </p>
                            </div>
                            <span>
                                    <FiEdit />
                                </span>
                        </div>

                        <div className="mt-8 cursor-pointer">
                            <h2 className="text-xl font-semibold">Order History</h2>
                            <ul className="list-disc list-inside">

                                <li className="text-gray-600">
                                    Order ID: {'445665578'}, Total: ${'100,000'}
                                </li>

                            </ul>
                        </div>

                        <button
                        className="mt-24 text-xl font-semibold text-gray-600"
                        onClick={signOut}>Sign Out
                        </button>
                    </div>
                
                </>
            )}
            <Footer />
        </div>
    );
};

export default Profile;
