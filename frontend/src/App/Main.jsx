import { Footer } from './Footer';
import { SignupForm } from "./SignupForm";
import Banner from './Banner';
import { LoginForm } from "./LoginForm";
import "../styles/Styles.css"

export default function Main() {
    return (
        <div>
                <Banner />
                <div className="Forms"> 
                    <SignupForm />
                    <LoginForm />
                </div>
                <Footer />
        </div>
    )
}