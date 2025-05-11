import ContactForm from "@/components/help-center/ContactForm";
import FrequentAskQuetions from "@/components/help-center/FrequentAskQuetions";
import HelpCenterWelcome from "@/components/help-center/HelpCenterWelcome";

export default function HelpCenterPage() {
    return (
        <main className="main main-background">
            <HelpCenterWelcome />
            <FrequentAskQuetions />
            <ContactForm />
        </main>
    )
}
