import "../styles/footer.css";
import { SiDiscord, SiGithub, SiGmail, SiInstagram, SiLinkedin, SiTwitter } from "react-icons/si";

function Footer() {
    const socials = [
        {
            logo: <SiGmail />,
            link: "mailto:dhruvshahrds@gmail.com"
        },
        {
            logo: <SiGithub />,
            link: "https://github.com/Dhruv9449"
        },
        {
            logo: <SiInstagram />,
            link: "https://www.instagram.com/dhruv9449/"
        },
        {
            logo: <SiLinkedin />,
            link: "https://www.linkedin.com/in/dhruv9449/"
        },
        {
            logo: <SiTwitter />,
            link: "https://twitter.com/dhruv9449"
        },
        {
            logo: <SiDiscord />,
            link: "http://www.discord.com/users/430318015804866560"
        }
    ]

    return (
        <div className="footer" id="footer" >
            <p> Made with 🧡 by <a href="https://dhruvshah.ml">Dhruv Shah </a><br></br> Copyright©2022 </p>
            <div className="socials">
                {socials.map((social) => {
                    return (
                        <a href={social.link} target="_blank" rel="noreferrer">
                            {social.logo}
                        </a>
                    )
                })}
            </div>
        </div >
    );
}

export default Footer;
