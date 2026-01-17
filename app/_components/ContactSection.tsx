import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo"

export default function ContactSection() {
    return (
        <div id="contact" className="contactSection">
            <ContactInfo />
            <ContactForm />
        </div>
    );
}