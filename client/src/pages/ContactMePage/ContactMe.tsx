import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
// eslint-disable-next-line import/no-named-as-default
import ContactMeForm from './shared/ContactMeForm';

function ContactMe() {
    return (
        <div>
            <Navbar />
            <div className="text-2xl mt-24 mb-16 w-1/3 mx-auto text-center text-union-gold">
                Please feel free to ask me any questions and I will do my best
                to get back to you!
            </div>
            <ContactMeForm />
            <Footer />
        </div>
    );
}

export default ContactMe;
