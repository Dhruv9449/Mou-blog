import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/pagenotfound.css"

interface Prop {
    error: string;
    status: number;
}

function PageNotFound({ error, status }: Prop) {
    return (
        <div className="page">
            <Navbar />
            <div className="page-not-found">
                <h1 className="status-code"> 404 </h1>
                <h2 className="message"> Oops! Look's like the page you are looking for does not exist.</h2>
                <Link to="/">
                    <IoMdArrowRoundBack />
                    Go back to Home
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default PageNotFound;