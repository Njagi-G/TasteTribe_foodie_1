import { Link } from "react-router-dom"
export default function Error() {
    return (
        <main>
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
                <div className="max-w-lg mx-auto space-y-3 text-center">
                    <h3 className="text-yellow-600 text-2xl font-semibold">
                        404 Error
                    </h3>
                    <p className="text-gray-800 text-3xl font-semibold sm:text-5xl">
                        Page not found
                    </p>
                    <p className="text-gray-600 font-semibold">
                        Oops! Sorry. Its a dead end the page you are looking for could not be found or has been removed.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link to="/" className="block py-2 px-4 text-gray-700 text-md dark:text-gray-50 font-medium bg-customGreen duration-150 hover:bg-gray-700   rounded-lg">
                            Go back
                        </Link>
                        <Link to="/contactUs" className="block py-2 px-4 text-gray-700 hover:bg-gray-50 font-medium duration-150 shadow-md active:bg-gray-100 border rounded-lg">
                            Contact support
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}