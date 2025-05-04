import { Link, useLocation } from "react-router-dom";

export default function BreadCrumbs() {
    const location = useLocation();
    let currLink = "";

    const loc = location.pathname
        .split("/")
        .filter((crumb) => crumb !== "")
        .map((crumb, index, array) => {
            currLink += `/${crumb}`;

            return (
                <div key={crumb} className="flex items-center font-serif">
                    <Link 
                        to={currLink}
                        className={`text-gray-800 hover:underline capitalize ${
                            index === array.length - 1 ? "text-gray-500 cursor-default" : ""
                        }`}
                        aria-current={index === array.length - 1 ? "page" : undefined}
                    >
                        {crumb}
                    </Link>
                    {index < array.length - 1 && (
                        <span className="mx-2 text-gray-400">/</span>
                    )}
                </div>
            );
        });

    return (
        <nav aria-label="Breadcrumb" className="bg-gray-100 p-4 rounded-lg shadow-sm mb-2 font-serif">
            <div className="flex flex-wrap items-center text-sm font-medium text-gray-600">
                <Link to="/" className="text-gray-800 hover:underline">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
                {loc}
            </div>
        </nav>
    );
}
