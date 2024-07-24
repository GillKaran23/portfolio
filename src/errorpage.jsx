import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex items-center p-5 justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
                <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
                <p className="text-2xl font-semibold text-gray-700 mb-2">Oops! Page Not Found</p>
                <p className="text-lg text-gray-600 mb-6">
                    Sorry, the page you are looking for does not exist. 
                    Please navigate back to the homepage or explore more of my portfolio.
                </p>
                <Link to="/" className="inline-block px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition duration-300">
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
