import ContactForm from '../components/property/ContactForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-gray-500 text-center mb-10">
            We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
          </p>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}