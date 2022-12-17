import { useEffect, useState } from "react";
import Logosvg from "../components/Logosvg";
import "../styles/preloader.css"

function Preloader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            document.body.style.overflowY = 'auto';
            document.documentElement.style.overflowY = 'auto';
        }, 2500);
    }, []);

    return (
        <div className="preloader" style={{ display: loading ? "flex" : "none" }}>
            <Logosvg name="preloader-logo" />
        </div>

    )
}


export default Preloader;