import Typewriter from 'typewriter-effect';
import BlogsList from '../components/BlogsList';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar"
import "../styles/home.css"
import Preloader from './Preloader';



function Home() {
    return (
        <div className="page">
            <Preloader />
            <Navbar />
            <div className="home">
                <div className="hero">
                    <h1 className="hero-text">
                        <Typewriter
                            onInit={(typewriter) => {
                                setTimeout(() => {
                                    typewriter.typeString('Welcome to my blog!')
                                        .start();
                                }, 2500)
                            }
                            }
                        />
                    </h1>
                    <p className="hero-subtext">
                        This is a blog about web development, programming, and other things.
                    </p>
                </div>
                <BlogsList />
            </div>
            <Footer />
        </div>
    )
}

export default Home