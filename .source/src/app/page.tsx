"use client";

import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const query = `{
      "settings": *[_type == "siteSettings"][0],
      "home": *[_type == "homePage"][0],
      "founder": *[_type == "founder"][0],
      "services": *[_type == "service"] | order(_createdAt asc),
      "packages": *[_type == "mentoriaPackage"] | order(_createdAt asc),
      "testimonials": *[_type == "testimonial"] | order(_createdAt asc)
    }`;
    
    client.fetch(query).then((res) => {
      setData(res);
    }).catch(console.error);
  }, []);

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading Career Compass Global...</div>;

  const defaultServices = [
    { name: "Career Guidance", description: "Expert advice to find your direction." },
    { name: "Workshops & Seminars", description: "Interactive sessions to build your skills." },
    { name: "Admission Guidance", description: "Step-by-step help for college admissions." }
  ];

  const defaultPackages = [1, 2, 3, 4, 5, 6].map(num => ({
    name: `Mentoria Package ${num}`,
    price: "Contact for price",
    description: "Comprehensive guidance for your career.",
    fallbackImg: `/Mentoria${num}.png`
  }));

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold text-primary flex items-center gap-2 mb-4 md:mb-0">
            {data.settings?.logo ? (
              <img src={urlFor(data.settings.logo).width(200).url()} alt="Logo" className="h-12 w-auto" />
            ) : (
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 font-semibold">
            <a href="#home" className="hover:text-secondary">Home</a>
            <a href="#about" className="hover:text-secondary">About Founder</a>
            <a href="#services" className="hover:text-secondary">Services</a>
            <a href="#packages" className="hover:text-secondary">Mentoria Packages</a>
            <a href="#testimonials" className="hover:text-secondary">Testimonials</a>
            <a href="#contact" className="hover:text-secondary">Contact Us</a>
          </div>
        </div>
      </nav>

      <section id="home" className="bg-primary text-white py-24 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{data.home?.heroHeading || "Find your direction. Build your future."}</h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">{data.home?.heroDescription || "Career Guidance, Workshops & Seminars, Admission Guidance"}</p>
        <a href="#contact" className="bg-secondary hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full text-lg transition">
          {data.home?.ctaText || "Get Started"}
        </a>
      </section>

      <section id="about" className="py-20 px-4 container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center">
             {data.founder?.photo ? (
               <img src={urlFor(data.founder.photo).width(600).url()} alt={data.founder.name} className="rounded-xl shadow-xl max-w-full h-auto" />
             ) : (
               <img src="/founder.jpeg" alt="Founder" className="rounded-xl shadow-xl max-w-full h-auto" />
             )}
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-primary">About {data.founder?.name || "Bertin Kenfack Voufo"}</h2>
            <h3 className="text-xl text-secondary mb-6">{data.founder?.title || "Founder"}</h3>
            <div className="text-lg leading-relaxed space-y-4">
              {data.founder?.biography ? (
                <p>{data.founder.biography}</p>
              ) : (
                <>
                  <p>I believe every person is born with unique talents that, when discovered and developed, can lead to a fulfilling and impactful career.</p>
                  <p>My mission is to help students, graduates, and professionals gain clarity about their strengths and guide them toward career paths where they can thrive and contribute meaningfully to society.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-gray-50 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(data.services?.length > 0 ? data.services : defaultServices).map((service: any, idx: number) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg text-center hover:-translate-y-2 transition duration-300">
                {service.image && <img src={urlFor(service.image).width(400).url()} alt={service.name} className="w-full h-48 object-cover rounded-lg mb-6" />}
                <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="py-20 px-4 container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">Mentoria Packages</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {(data.packages?.length > 0 ? data.packages : defaultPackages).map((pkg: any, idx: number) => (
            <div key={idx} className="border rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex flex-col">
              {pkg.image ? (
                <img src={urlFor(pkg.image).width(600).url()} alt={pkg.name} className="w-full h-64 object-cover" />
              ) : (
                <img src={pkg.fallbackImg || "/Mentoria1.png"} alt={pkg.name} className="w-full h-64 object-cover" />
              )}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-xl text-secondary font-semibold mb-4">{pkg.price}</p>
                <p className="text-gray-600 mb-6 flex-grow">{pkg.description}</p>
                <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition mt-auto">Choose Package</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-primary text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          <p className="text-xl mb-8">Ready to build your future? Let's connect.</p>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-lg">
            <a href={`mailto:${data.settings?.contactEmail || 'bertinkenfack@gmail.com'}`} className="bg-white text-primary px-8 py-4 rounded-xl shadow font-bold hover:bg-gray-100 transition">Email Us</a>
            <a href={`tel:${data.settings?.contactPhone || '9740403705'}`} className="bg-secondary text-white px-8 py-4 rounded-xl shadow font-bold hover:bg-yellow-600 transition">Call Now</a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Career Compass Global. All rights reserved.</p>
      </footer>
    </div>
  );
}
