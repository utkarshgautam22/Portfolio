// app/page.tsx
import ClientLayout from './components/ClientLayout';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
            <ClientLayout>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
            </ClientLayout>
        </main>
    );
}