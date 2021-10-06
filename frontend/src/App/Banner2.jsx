import banner1 from "../Groupomania_Logos/icon-above-font.png"
import '../styles/Banner2.css'

const Banner = (e) => {
	return ( 
        <div className="lmj-banner">
            <img src={banner1} height={250} width={250} alt="logoGroupomania"/>
        </div>
    );
}

export default Banner