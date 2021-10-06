import '../styles/404.css'
import Banner from './Banner';

export function NotFound(){

    return (
        <div>
            <Banner />
            <div>
            <h1 className="h1_404"> 404 Erreur la page est introuvable ! </h1>
            </div>           
        </div>
    );
};