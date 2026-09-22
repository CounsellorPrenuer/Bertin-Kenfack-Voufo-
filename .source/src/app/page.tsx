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
    }`
    
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

  const defaultPackages = [
    { name: "Discover", price: "?5,500", features: ["Psychometric Assessment", "Career counseling session", "Stream selection", "Detailed report"] },
    { name: "Discover Plus", price: "?15,000", features: ["Everything in Discover", "Multiple counseling sessions", "Long term planning", "Parent involvement"], featured: true },
    { name: "Achieve Online", price: "?5,999", features: ["Online Assessment", "Virtual counseling", "Career roadmap"] },
    { name: "Achieve Plus", price: "?10,500", features: ["Everything in Achieve", "In-person counseling", "Action plan execution"], featured: true },
    { name: "Ascend Online", price: "?6,499", features: ["Skill gap analysis", "Virtual mentoring", "Industry insights"] },
    { name: "Ascend Plus", price: "?10,599", features: ["Everything in Ascend", "Resume building", "Interview preparation"], featured: true }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold text-primary flex items-center gap-2 mb-4 md:mb-0">
            {data.settings?.logo ? (
              <img src={urlFor(data.settings.logo).width(200).url()} alt="Logo" className="h-12 w-auto" />
            ) : (
              <img src="/Bertin-Kenfack-Voufo-/logo.png" alt="Logo" className="h-12 w-auto" />
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 font-semibold text-sm md:text-base">
            <a href="#home" className="hover:text-secondary transition">Home</a>
            <a href="#about" className="hover:text-secondary transition">About Founder</a>
            <a href="#services" className="hover:text-secondary transition">Services</a>
            <a href="#packages" className="hover:text-secondary transition">Mentoria Packages</a>
            <a href="#testimonials" className="hover:text-secondary transition">Testimonials</a>
            <a href="#contact" className="hover:text-secondary transition">Contact Us</a>
          </div>
        </div>
      </nav>

      <section id="home" className="bg-primary text-white py-24 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{data.home?.heroHeading || "Find your direction. Build your future."}</h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100">{data.home?.heroDescription || "Career Guidance, Workshops & Seminars, Admission Guidance"}</p>
        <a href="#contact" className="bg-secondary hover:bg-yellow-600 text-white font-bold py-4 px-10 rounded-full text-lg transition shadow-lg inline-block">
          {data.home?.ctaText || "Get Started"}
        </a>
      </section>

      <section id="about" className="py-20 px-4 container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center">
             {data.founder?.photo ? (
               <img src={urlFor(data.founder.photo).width(600).url()} alt={data.founder.name} className="rounded-xl shadow-2xl max-w-full h-auto border-4 border-white" />
             ) : (
               <img src="/Bertin-Kenfack-Voufo-/founder.jpeg" alt="Founder" className="rounded-xl shadow-2xl max-w-full h-auto border-4 border-white" />
             )}
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-primary">About {data.founder?.name || "Bertin Kenfack Voufo"}</h2>
            <h3 className="text-xl text-secondary mb-6 font-semibold">{data.founder?.title || "Founder & Career Counselor"}</h3>
            <div className="text-lg leading-relaxed text-gray-700 space-y-4">
              {data.founder?.biography ? (
                <p>{data.founder.biography}</p>
              ) : (
                <>
                  <p>I believe every person is born with unique talents that, when discovered and developed, can lead to a fulfilling and impactful career.</p>
                  <p>My mission is to help students, graduates, and professionals gain clarity about their strengths and guide them toward career paths where they can thrive and contribute meaningfully to society.</p>
                  <p>Through thoughtful guidance, proven assessment tools, and meaningful conversations, I aim to empower individuals to make informed career decisions that lead to fulfillment, productivity, and long-term success.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-gray-50 py-20 px-4 border-t border-gray-200">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-primary">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">Comprehensive guidance for students, professionals, and institutions.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {(data.services?.length > 0 ? data.services : defaultServices).map((service: any, idx: number) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition duration-300 border border-gray-100">
                {service.image ? (
                  <img src={urlFor(service.image).width(400).url()} alt={service.name} className="w-full h-48 object-cover rounded-xl mb-6" />
                ) : (
                  <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                    ?
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="py-20 px-4 container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-primary">Mentoria Packages</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto text-lg">Choose the right plan to accelerate your career journey.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data.packages?.length > 0 ? data.packages : defaultPackages).map((pkg: any, idx: number) => (
            <div key={idx} className={\
ounded-2xl overflow-hidden transition duration-300 flex flex-col \}>
              {pkg.featured && (
                <div className="bg-secondary text-white text-center py-2 text-sm font-bold uppercase tracking-wider">
                  Recommended
                </div>
              )}
              <div className="bg-primary p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl font-extrabold">{pkg.price}</div>
              </div>
              <div className="p-8 flex flex-col flex-grow bg-white">
                <ul className="mb-8 space-y-4 flex-grow">
                  {(pkg.features || []).map((feature: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-start">
                      <svg className="w-5 h-5 text-secondary mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {(!pkg.features || pkg.features.length === 0) && (
                    <li className="text-gray-500 italic">Features will be listed here.</li>
                  )}
                </ul>
                <a href="#contact" className={\lock w-full text-center font-bold py-4 rounded-xl transition \}>
                  Choose Package
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-primary text-white py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to build your future?</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">Get in touch with us today and let's discover the perfect path for your career journey.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-lg">
            <a href={\mailto:\} className="bg-white text-primary px-8 py-4 rounded-xl shadow-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2">
              ? Email Us
            </a>
            <a href={\	el:\} className="bg-secondary text-white px-8 py-4 rounded-xl shadow-lg font-bold hover:bg-yellow-600 transition flex items-center justify-center gap-2">
              ?? Call Now
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4 text-center">
        <div className="container mx-auto">
          <p className="mb-4">&copy; {new Date().getFullYear()} Career Compass Global. All rights reserved.</p>
          <p className="text-sm">Find your direction. Build your future.</p>
        </div>
      </footer>
    </div>
  );
}
