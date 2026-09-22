"use client";

import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const query = \{
      "settings": *[_type == "siteSettings"][0],
      "home": *[_type == "homePage"][0],
      "founder": *[_type == "founder"][0],
      "services": *[_type == "service"] | order(_createdAt asc),
      "packages": *[_type == "mentoriaPackage"] | order(_createdAt asc),
      "testimonials": *[_type == "testimonial"] | order(_createdAt asc)
    }\;
    
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
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-gray-50 py-20 px-4 border-t border-gray-200">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-primary">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {(data.services?.length > 0 ? data.services : defaultServices).map((service: any, idx: number) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition duration-300 border border-gray-100">
                {service.image ? (
                  <img src={urlFor(service.image).width(400).url()} alt={service.name} className="w-full h-48 object-cover rounded-xl mb-6" />
                ) : (
                  <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">?</div>
                )}
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="py-20 px-4 container mx-auto bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Mentoria Packages</h2>
        
        <div className="space-y-16">
          {/* PACKAGE 1: Discover */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
             <div className="grid md:grid-cols-2">
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-4 rounded-t-xl">
                      <h3 className="text-xl font-bold">Discover</h3>
                   </div>
                   <div className="text-center py-6">
                      <span className="text-3xl font-bold text-gray-800">?5,500</span>
                   </div>
                   <ul className="space-y-3 flex-grow mb-8 px-4">
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Psychometric Assessment</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Career counseling session</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Stream selection</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Detailed report</li>
                   </ul>
                   <button className="w-full bg-indigo-100 text-[#4169E1] font-bold py-3 rounded-full hover:bg-indigo-200 transition">BUY NOW</button>
                </div>
                <div className="p-8 flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-4 rounded-t-xl">
                      <h3 className="text-xl font-bold">Discover Plus</h3>
                   </div>
                   <div className="text-center py-6">
                      <span className="text-3xl font-bold text-gray-800">?15,000</span>
                   </div>
                   <ul className="space-y-3 flex-grow mb-8 px-4">
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Psychometric Assessment (includes personality, aptitude, and interest)</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Multiple career counseling sessions</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Stream and career path selection</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Detailed report and continuous guidance</li>
                   </ul>
                   <button className="w-full bg-[#4169E1] text-white font-bold py-3 rounded-full hover:bg-blue-700 transition shadow-md">BUY NOW</button>
                </div>
             </div>
          </div>

          {/* PACKAGE 2: Achieve */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
             <div className="grid md:grid-cols-2">
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-4 rounded-t-xl">
                      <h3 className="text-xl font-bold">Achieve Online</h3>
                   </div>
                   <div className="text-center py-6">
                      <span className="text-3xl font-bold text-gray-800">?5,999</span>
                   </div>
                   <ul className="space-y-3 flex-grow mb-8 px-4">
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Complete online assessment</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Virtual career counseling</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Career roadmap generation</li>
                   </ul>
                   <button className="w-full bg-indigo-100 text-[#4169E1] font-bold py-3 rounded-full hover:bg-indigo-200 transition">BUY NOW</button>
                </div>
                <div className="p-8 flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-4 rounded-t-xl">
                      <h3 className="text-xl font-bold">Achieve Plus</h3>
                   </div>
                   <div className="text-center py-6">
                      <span className="text-3xl font-bold text-gray-800">?10,500</span>
                   </div>
                   <ul className="space-y-3 flex-grow mb-8 px-4">
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Comprehensive career mapping</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Dedicated in-person counseling sessions</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Action plan execution support</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Specialized mentoring & follow-ups</li>
                   </ul>
                   <button className="w-full bg-[#4169E1] text-white font-bold py-3 rounded-full hover:bg-blue-700 transition shadow-md">BUY NOW</button>
                </div>
             </div>
          </div>

          {/* PACKAGE 3: Ascend */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
             <div className="grid md:grid-cols-2">
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-4 rounded-t-xl">
                      <h3 className="text-xl font-bold">Ascend Online</h3>
                   </div>
                   <div className="text-center py-6">
                      <span className="text-3xl font-bold text-gray-800">?6,499</span>
                   </div>
                   <ul className="space-y-3 flex-grow mb-8 px-4">
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> In-depth skill gap analysis</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Virtual professional mentoring</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Actionable industry insights</li>
                   </ul>
                   <button className="w-full bg-indigo-100 text-[#4169E1] font-bold py-3 rounded-full hover:bg-indigo-200 transition">BUY NOW</button>
                </div>
                <div className="p-8 flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-4 rounded-t-xl">
                      <h3 className="text-xl font-bold">Ascend Plus</h3>
                   </div>
                   <div className="text-center py-6">
                      <span className="text-3xl font-bold text-gray-800">?10,599</span>
                   </div>
                   <ul className="space-y-3 flex-grow mb-8 px-4">
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Professional resume building & review</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Interview preparation and mock sessions</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Personal branding strategies (LinkedIn)</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Continuous career progression tracking</li>
                   </ul>
                   <button className="w-full bg-[#4169E1] text-white font-bold py-3 rounded-full hover:bg-blue-700 transition shadow-md">BUY NOW</button>
                </div>
             </div>
          </div>
          
          {/* PACKAGE 4: Ascend Premium */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
             <div className="grid md:grid-cols-2">
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-4 rounded-t-xl">
                      <h3 className="text-xl font-bold">Ascend Premium</h3>
                   </div>
                   <div className="text-center py-6">
                      <span className="text-3xl font-bold text-gray-800">?15,499</span>
                   </div>
                   <ul className="space-y-3 flex-grow mb-8 px-4">
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Comprehensive career gap analysis</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> 1-on-1 premium professional mentoring</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Direct industry connections & networking</li>
                   </ul>
                   <button className="w-full bg-indigo-100 text-[#4169E1] font-bold py-3 rounded-full hover:bg-indigo-200 transition">BUY NOW</button>
                </div>
                <div className="p-8 flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-4 rounded-t-xl">
                      <h3 className="text-xl font-bold">Ascend Executive</h3>
                   </div>
                   <div className="text-center py-6">
                      <span className="text-3xl font-bold text-gray-800">?20,599</span>
                   </div>
                   <ul className="space-y-3 flex-grow mb-8 px-4">
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Executive resume building & cover letter</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Advanced interview preparation</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> Complete LinkedIn profile makeover</li>
                      <li className="flex items-start text-sm text-gray-600"><span className="text-blue-500 mr-2">?</span> 6-month continuous career coaching</li>
                   </ul>
                   <button className="w-full bg-[#4169E1] text-white font-bold py-3 rounded-full hover:bg-blue-700 transition shadow-md">BUY NOW</button>
                </div>
             </div>
          </div>
          
          {/* PACKAGE 5: Branding & Prep */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
             <div className="grid md:grid-cols-2 p-8 gap-8">
                <div className="flex items-center gap-6 p-4 border border-gray-100 shadow-sm rounded-xl">
                   <div className="bg-blue-100 text-blue-600 p-4 rounded-lg flex items-center justify-center text-3xl">??</div>
                   <div>
                     <h3 className="font-bold text-gray-800 text-lg">Resume Building</h3>
                     <p className="text-sm text-gray-500">Professional tailored resumes</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 p-4 border border-gray-100 shadow-sm rounded-xl">
                   <div className="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-center text-3xl">in</div>
                   <div>
                     <h3 className="font-bold text-gray-800 text-lg">LinkedIn Makeover</h3>
                     <p className="text-sm text-gray-500">Optimize your digital brand</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 p-4 border border-gray-100 shadow-sm rounded-xl">
                   <div className="bg-orange-100 text-orange-600 p-4 rounded-lg flex items-center justify-center text-3xl">??</div>
                   <div>
                     <h3 className="font-bold text-gray-800 text-lg">Career Assessment</h3>
                     <p className="text-sm text-gray-500">Discover your strengths</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 p-4 border border-gray-100 shadow-sm rounded-xl">
                   <div className="bg-green-100 text-green-600 p-4 rounded-lg flex items-center justify-center text-3xl">??</div>
                   <div>
                     <h3 className="font-bold text-gray-800 text-lg">Interview Prep</h3>
                     <p className="text-sm text-gray-500">Mock interviews & tips</p>
                   </div>
                </div>
             </div>
          </div>
          
          {/* PACKAGE 6: Global Study */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 p-8">
             <h3 className="text-2xl font-bold text-center text-primary mb-8 border-b pb-4">Study Abroad Counseling</h3>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                   <div className="bg-teal-100 p-3 rounded-full text-3xl">??</div>
                   <div>
                     <h4 className="font-bold text-gray-800">University Selection</h4>
                     <p className="text-sm text-gray-500">Find the right global fit</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="bg-yellow-100 p-3 rounded-full text-3xl">??</div>
                   <div>
                     <h4 className="font-bold text-gray-800">Application Strategy</h4>
                     <p className="text-sm text-gray-500">Crafting perfect essays</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="bg-purple-100 p-3 rounded-full text-3xl">??</div>
                   <div>
                     <h4 className="font-bold text-gray-800">Visa Assistance</h4>
                     <p className="text-sm text-gray-500">End-to-end processing</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="bg-pink-100 p-3 rounded-full text-3xl">??</div>
                   <div>
                     <h4 className="font-bold text-gray-800">Pre-departure Briefing</h4>
                     <p className="text-sm text-gray-500">Get ready to fly</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      <section id="contact" className="bg-primary text-white py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to build your future?</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">Get in touch with us today and let's discover the perfect path for your career journey.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-lg">
            <a href={\mailto:\\} className="bg-white text-primary px-8 py-4 rounded-xl shadow-lg font-bold hover:bg-gray-100 transition">
              Email Us
            </a>
            <a href={\	el:\\} className="bg-secondary text-white px-8 py-4 rounded-xl shadow-lg font-bold hover:bg-yellow-600 transition">
              Call Now
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4 text-center">
        <div className="container mx-auto">
          <p className="mb-4">&copy; {new Date().getFullYear()} Career Compass Global. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
