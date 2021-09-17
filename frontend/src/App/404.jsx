import '../styles/Banner.css'
import '../styles/404.css'
import banner1 from "../Groupomania_Logos/icon-above-font.png"

export function NotFound(){

    return (
        <div>
            <div className="lmj-banner">
                <img src={banner1} height={250} width={250} alt="logoGroupomania" />
            </div>
            <div>
            <h1 className="h1_404"> 404 Erreur la page est introuvable ! </h1>
            </div>           
        </div>
    );
};