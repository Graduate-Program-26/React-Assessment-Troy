import { GiMagnifyingGlass } from "react-icons/gi";
const Page = () => {
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <GiMagnifyingGlass className="h-48 w-48" />
            <ul className="text-center">
                <li className="text-gray-400">Search for Users</li>
                <li className="text-gray-400">Navigate using Sidebar</li>
            </ul>
        </div>
    );
};

export default Page;
