"use client";

import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [activeMainTab, setActiveMainTab] = useState('plans'); // 'plans' or 'customise'
  const [activeSubTab, setActiveSubTab] = useState('8-9'); // '8-9', '10-12', 'college', 'working'

  useEffect(() => {
    const query = `{
      "settings": *[_type == "siteSettings"][0],
      "home": *[_type == "homePage"][0],
      "founder": *[_type == "founder"][0],
      "services": *[_type == "service"] | order(_createdAt asc)
    }`;
    
    client.fetch(query).then((res) => {
      setData(res);
    }).catch(console.error);
  }, []);

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading Career Compass Global...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans scroll-smooth">
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2 mb-4 md:mb-0">
            {data.settings?.logo ? (
              <img src={urlFor(data.settings.logo).width(200).url()} alt="Logo" className="h-12 w-auto" />
            ) : (
              <img src="/Bertin-Kenfack-Voufo-/logo.png" alt="Logo" className="h-12 w-auto" />
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 font-semibold text-sm md:text-base">
            <a href="#home" className="hover:text-blue-600 transition">Home</a>
            <a href="#about" className="hover:text-blue-600 transition">About Founder</a>
            <a href="#services" className="hover:text-blue-600 transition">Services</a>
            <a href="#packages" className="hover:text-blue-600 transition">Mentoria Packages</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact Us</a>
          </div>
        </div>
      </nav>

      <section id="home" className="bg-[#002B5B] text-white py-24 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{data.home?.heroHeading || "Find your direction. Build your future."}</h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100">{data.home?.heroDescription || "Career Guidance, Workshops & Seminars, Admission Guidance"}</p>
        <a href="#packages" className="bg-[#D49A36] hover:bg-yellow-600 text-white font-bold py-4 px-10 rounded-full text-lg transition shadow-lg inline-block">
          {data.home?.ctaText || "Get Started"}
        </a>
      </section>

      <section id="packages" className="py-20 px-4 container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#002B5B]">Mentoria Packages</h2>
        
        <div className="max-w-6xl mx-auto">
          {/* Main Tabs */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button 
              onClick={() => setActiveMainTab('plans')}
              className={`flex-1 py-3 text-center rounded shadow font-bold ${activeMainTab === 'plans' ? 'bg-[#4169E1] text-white' : 'bg-white text-[#4169E1] border border-gray-200'}`}>
              Mentoria's Plans
            </button>
            <button 
              onClick={() => setActiveMainTab('customise')}
              className={`flex-1 py-3 text-center rounded shadow font-bold ${activeMainTab === 'customise' ? 'bg-[#4169E1] text-white' : 'bg-white text-[#4169E1] border border-gray-200'}`}>
              Customise Your Mentorship Plan
            </button>
          </div>

          {activeMainTab === 'plans' && (
            <>
              {/* Sub Tabs */}
              <div className="flex flex-col md:flex-row gap-4 mb-16">
                <button onClick={() => setActiveSubTab('8-9')} className={`flex-1 py-3 rounded shadow font-bold text-sm ${activeSubTab === '8-9' ? 'bg-[#4169E1] text-white' : 'bg-white text-[#4169E1] border border-gray-200'}`}>8-9 STUDENTS</button>
                <button onClick={() => setActiveSubTab('10-12')} className={`flex-1 py-3 rounded shadow font-bold text-sm ${activeSubTab === '10-12' ? 'bg-[#4169E1] text-white' : 'bg-white text-[#4169E1] border border-gray-200'}`}>10-12 STUDENTS</button>
                <button onClick={() => setActiveSubTab('college')} className={`flex-1 py-3 rounded shadow font-bold text-sm ${activeSubTab === 'college' ? 'bg-[#4169E1] text-white' : 'bg-white text-[#4169E1] border border-gray-200'}`}>COLLEGE GRADUATES</button>
                <button onClick={() => setActiveSubTab('working')} className={`flex-1 py-3 rounded shadow font-bold text-sm ${activeSubTab === 'working' ? 'bg-[#4169E1] text-white' : 'bg-white text-[#4169E1] border border-gray-200'}`}>WORKING PROFESSIONALS</button>
              </div>

              {/* Plans Content */}
              <div className="relative">
                {/* Yellow Circle Decoration */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 hidden lg:block w-64 h-64 bg-[#F6D000] rounded-full z-0"></div>
                
                <div className="flex flex-col md:flex-row gap-8 relative z-10 justify-center ml-0 lg:ml-40">
                  
                  {/* Standard Card */}
                  <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-10 flex-1 max-w-md border border-gray-100 flex flex-col">
                    <div className="text-blue-400 text-sm font-semibold mb-6">STANDARD</div>
                    
                    {activeSubTab === '8-9' && (
                      <>
                        <h3 className="text-3xl font-bold text-[#7B8AF3] text-center mb-2">Discover</h3>
                        <div className="text-center mb-8"><span className="text-xl text-[#7B8AF3]">₹</span><span className="text-4xl font-bold text-[#7B8AF3]">5,500</span></div>
                        <ul className="space-y-4 mb-10 text-sm text-gray-600">
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Psychometric assessment to measure your interests</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> 1 career counselling session with Mentoria's expert career coaches</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Lifetime access to Knowledge Gateway</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Invites to live webinars by industry experts</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> Customised reports after each session with education pathways</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> Guidance on studying abroad</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> CV building during internships/graduation</li>
                        </ul>
                      </>
                    )}
                    {activeSubTab === '10-12' && (
                      <>
                        <h3 className="text-3xl font-bold text-[#7B8AF3] text-center mb-2">Achieve Online</h3>
                        <div className="text-center mb-8"><span className="text-xl text-[#7B8AF3]">₹</span><span className="text-4xl font-bold text-[#7B8AF3]">5,999</span></div>
                        <ul className="space-y-4 mb-10 text-sm text-gray-600">
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Psychometric assessment to measure your interests, personality and abilities</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> 1 career counselling session</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Lifetime access to Knowledge Gateway</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Pre-recorded webinars by industry experts</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> Customised reports after each session with education pathways</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> Guidance on studying abroad</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> CV reviews during internships/graduation</li>
                        </ul>
                      </>
                    )}
                    {activeSubTab === 'college' && (
                      <>
                        <h3 className="text-3xl font-bold text-[#7B8AF3] text-center mb-2">Ascend Online</h3>
                        <div className="text-center mb-8"><span className="text-xl text-[#7B8AF3]">₹</span><span className="text-4xl font-bold text-[#7B8AF3]">6,499</span></div>
                        <ul className="space-y-4 mb-10 text-sm text-gray-600">
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Psychometric assessment to measure your interests, personality and abilities</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> 1 career counselling session</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Lifetime access to Knowledge Gateway</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Pre-recorded webinars by industry experts</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> Customised reports after each session with information on certificate/online courses</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> Guidance on studying abroad</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> CV reviews for job application</li>
                        </ul>
                      </>
                    )}
                    {activeSubTab === 'working' && (
                      <>
                        <h3 className="text-3xl font-bold text-[#7B8AF3] text-center mb-2">Ascend Online</h3>
                        <div className="text-center mb-8"><span className="text-xl text-[#7B8AF3]">₹</span><span className="text-4xl font-bold text-[#7B8AF3]">6,499</span></div>
                        <ul className="space-y-4 mb-10 text-sm text-gray-600">
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Psychometric assessment to measure your interests, personality and abilities</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> 1 career counselling session</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Lifetime access to Knowledge Gateway</li>
                          <li className="flex items-start"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✓</span> Pre-recorded webinars by industry experts</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> Customised reports after each session</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> Guidance on studying abroad</li>
                          <li className="flex items-start text-gray-400 line-through"><span className="text-[#7B8AF3] font-bold mr-3 text-lg">✕</span> CV reviews for job application</li>
                        </ul>
                      </>
                    )}

                    <div className="text-center mt-auto pt-8">
                      <button className="bg-[#7B8AF3] text-white font-bold py-3 px-12 rounded-full text-sm shadow-md hover:bg-blue-600 transition">BUY NOW</button>
                    </div>
                  </div>

                  {/* Premium Card */}
                  <div className="relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-10 flex-1 max-w-md border border-gray-100 flex flex-col">
                    <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-20 h-20 bg-[#E91E63] rounded-full z-[-1]"></div>
                    <div className="text-[#2748D8] text-sm font-semibold mb-6">PREMIUM</div>
                    
                    {activeSubTab === '8-9' && (
                      <>
                        <h3 className="text-3xl font-bold text-[#2748D8] text-center mb-2">Discover plus+</h3>
                        <div className="text-center mb-8"><span className="text-xl text-[#2748D8]">₹</span><span className="text-4xl font-bold text-[#2748D8]">15,000</span></div>
                        <ul className="space-y-4 mb-10 text-sm text-gray-600">
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Psychometric assessments to measure your interests, personality and abilities</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> 8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Lifetime access to Knowledge Gateway</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Invites to live webinars by industry experts</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Customised reports after each session with education pathways</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Guidance on studying abroad</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> CV building during internships/graduation</li>
                        </ul>
                      </>
                    )}
                    {activeSubTab === '10-12' && (
                      <>
                        <h3 className="text-3xl font-bold text-[#2748D8] text-center mb-2">Achieve Plus+</h3>
                        <div className="text-center mb-8"><span className="text-xl text-[#2748D8]">₹</span><span className="text-4xl font-bold text-[#2748D8]">10,599</span></div>
                        <ul className="space-y-4 mb-10 text-sm text-gray-600">
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Psychometric assessment to measure your interests, personality and abilities</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> 4 career counselling sessions</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Lifetime access to Knowledge Gateway</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Attend live webinars by industry experts</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Customised reports after each session with education pathways</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Guidance on studying abroad</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> CV reviews during internships/graduation</li>
                        </ul>
                      </>
                    )}
                    {activeSubTab === 'college' && (
                      <>
                        <h3 className="text-3xl font-bold text-[#2748D8] text-center mb-2">Ascend Plus+</h3>
                        <div className="text-center mb-8"><span className="text-xl text-[#2748D8]">₹</span><span className="text-4xl font-bold text-[#2748D8]">10,599</span></div>
                        <ul className="space-y-4 mb-10 text-sm text-gray-600">
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Psychometric assessment to measure your interests, personality and abilities</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> 3 career counselling sessions</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Lifetime access to Knowledge Gateway</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Attend live webinars by industry experts</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Customised reports after each session with information on certificate/online courses</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Guidance on studying abroad</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> CV reviews for job application</li>
                        </ul>
                      </>
                    )}
                    {activeSubTab === 'working' && (
                      <>
                        <h3 className="text-3xl font-bold text-[#2748D8] text-center mb-2">Ascend Plus+</h3>
                        <div className="text-center mb-8"><span className="text-xl text-[#2748D8]">₹</span><span className="text-4xl font-bold text-[#2748D8]">10,599</span></div>
                        <ul className="space-y-4 mb-10 text-sm text-gray-600">
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Psychometric assessment to measure your interests, personality and abilities</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> 3 career counselling sessions</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Lifetime access to Knowledge Gateway</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Attend live webinars by industry experts</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Customised reports after each session</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> Guidance on studying abroad</li>
                          <li className="flex items-start"><span className="text-[#2748D8] font-bold mr-3 text-lg">✓</span> CV reviews for job application</li>
                        </ul>
                      </>
                    )}

                    <div className="text-center mt-auto pt-8">
                      <button className="bg-[#2748D8] text-white font-bold py-3 px-12 rounded-full text-sm shadow-md hover:bg-blue-800 transition">BUY NOW</button>
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}

          {activeMainTab === 'customise' && (
            <div className="text-center mt-8">
              <h3 className="text-2xl font-bold text-[#1a237e] mb-2">Want To Customise Your Mentorship Plan?</h3>
              <p className="text-gray-500 text-sm mb-12 max-w-2xl mx-auto">If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:</p>
              
              <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                {/* CV Building */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex flex-col">
                  <div className="h-48 bg-[#4C5E89] flex items-center justify-center p-6">
                     <div className="w-24 h-32 bg-[#3A496E] rounded-md shadow-lg flex flex-col p-3 border border-gray-600">
                       <div className="w-8 h-8 rounded-full bg-yellow-400 mx-auto mb-3"></div>
                       <div className="w-full h-1.5 bg-blue-300 mb-2 rounded"></div>
                       <div className="w-3/4 h-1.5 bg-blue-300 mb-4 rounded"></div>
                       <div className="w-full h-1 bg-blue-300 mb-1.5 rounded"></div>
                       <div className="w-5/6 h-1 bg-blue-300 mb-1.5 rounded"></div>
                     </div>
                  </div>
                  <div className="p-8 bg-white flex-grow flex flex-col items-start">
                    <h4 className="font-bold text-[#1a237e] text-lg mb-1">CV Building</h4>
                    <div className="font-bold text-md mb-4 text-[#1a237e]">₹2000</div>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">Is your CV making a great first impression on your behalf? Our HR experts will help you build the kind of CV that stands out from the crowd and increases your chances of getting interview calls.</p>
                    <button className="mt-auto bg-[#7B8AF3] text-white text-xs font-bold py-2.5 px-8 rounded shadow hover:bg-blue-600 transition">BUY NOW</button>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex flex-col">
                  <div className="h-48 bg-white flex items-center justify-center border-b border-gray-100">
                     <div className="w-32 h-32 bg-[#0077b5] rounded-2xl flex items-center justify-center text-white font-bold text-[5rem]">
                       in
                     </div>
                  </div>
                  <div className="p-8 bg-white flex-grow flex flex-col items-start">
                    <h4 className="font-bold text-[#1a237e] text-lg mb-1">LinkedIn Profile Building</h4>
                    <div className="font-bold text-md mb-4 text-[#1a237e]">₹2000</div>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">Revamp your LinkedIn profile with recommendations from recruitment experts to showcase your career journey and increase your chances of interview calls.</p>
                    <button className="mt-auto bg-[#7B8AF3] text-white text-xs font-bold py-2.5 px-8 rounded shadow hover:bg-blue-600 transition">BUY NOW</button>
                  </div>
                </div>

                {/* CV + LinkedIn */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex flex-col">
                  <div className="h-48 bg-[#4C5E89] flex items-center justify-center p-6">
                     <div className="flex gap-4 items-center">
                       <div className="w-20 h-28 bg-[#3A496E] rounded-md shadow-lg flex flex-col p-2.5 border border-gray-600">
                         <div className="w-6 h-6 rounded-full bg-yellow-400 mx-auto mb-2"></div>
                         <div className="w-full h-1 bg-blue-300 mb-1.5 rounded"></div>
                         <div className="w-3/4 h-1 bg-blue-300 mb-3 rounded"></div>
                       </div>
                       <div className="w-20 h-20 bg-[#0077b5] rounded-xl flex items-center justify-center text-white font-bold text-4xl shadow-lg">in</div>
                     </div>
                  </div>
                  <div className="p-8 bg-white flex-grow flex flex-col items-start">
                    <h4 className="font-bold text-[#1a237e] text-lg mb-1">LinkedIn Profile + CV Building</h4>
                    <div className="font-bold text-md mb-4 text-[#1a237e]">₹3500</div>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">Build the kind of profile recruiters would love to spend time on. Get your CV and LinkedIn profile built by our HR/Recruitment experts.</p>
                    <button className="mt-auto bg-[#7B8AF3] text-white text-xs font-bold py-2.5 px-8 rounded shadow hover:bg-blue-600 transition">BUY NOW</button>
                  </div>
                </div>

                {/* Job Strategy */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex flex-col">
                  <div className="h-48 bg-white flex items-center justify-center border-b border-gray-100">
                     <div className="w-40 h-28 bg-[#3A5B80] rounded-lg relative shadow-xl">
                       <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-14 h-12 border-4 border-[#CA6F4B] rounded-t-xl"></div>
                       <div className="absolute w-full h-1/2 bottom-0 bg-[#29425E] rounded-b-lg"></div>
                       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-8 bg-[#F4D03F] rounded-sm shadow-sm z-10"></div>
                     </div>
                  </div>
                  <div className="p-8 bg-white flex-grow flex flex-col items-start">
                    <h4 className="font-bold text-[#1a237e] text-lg mb-1">Job Application Strategy</h4>
                    <div className="font-bold text-md mb-4 text-[#1a237e]">₹4000</div>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">Build the right pipeline for job interviews through a customised job application tracker with information on companies, job postings and steps you need to follow to land your dream job.</p>
                    <button className="mt-auto bg-[#7B8AF3] text-white text-xs font-bold py-2.5 px-8 rounded shadow hover:bg-blue-600 transition">BUY NOW</button>
                  </div>
                </div>

                {/* Career Report */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex flex-col">
                  <div className="h-48 bg-white flex items-center justify-center border-b border-gray-100">
                     <div className="w-28 h-36 bg-[#E8A365] rounded-lg shadow-xl p-3 relative flex flex-col items-center justify-end">
                       <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-5 bg-[#F2C94C] rounded-sm shadow-sm"></div>
                       <div className="w-full h-full bg-white rounded-sm mt-3 flex items-end justify-center gap-2 p-2 border border-orange-200">
                         <div className="w-4 h-8 bg-red-400 rounded-sm"></div>
                         <div className="w-4 h-12 bg-yellow-400 rounded-sm"></div>
                         <div className="w-4 h-16 bg-blue-300 rounded-sm"></div>
                       </div>
                     </div>
                  </div>
                  <div className="p-8 bg-white flex-grow flex flex-col items-start">
                    <h4 className="font-bold text-[#1a237e] text-lg mb-1">Career Report</h4>
                    <div className="font-bold text-md mb-4 text-[#1a237e]">₹2500</div>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">Get a detailed report of your psychometric assessment for a scientific analysis of your interests, personality and abilities. Find out where your interests lie and which future paths you can potentially consider.</p>
                    <button className="mt-auto bg-[#7B8AF3] text-white text-xs font-bold py-2.5 px-8 rounded shadow hover:bg-blue-600 transition">BUY NOW</button>
                  </div>
                </div>

                {/* Career Report + Counseling */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex flex-col">
                  <div className="h-48 bg-white flex items-center justify-center border-b border-gray-100">
                     <div className="w-32 h-40 bg-gray-100 rounded-md shadow-lg p-5 relative flex flex-col gap-3 border border-gray-300">
                       <div className="w-3/4 h-2 bg-gray-400 rounded"></div>
                       <div className="flex items-center gap-2 mt-2"><div className="w-5 h-5 border-2 border-red-500 rounded-sm flex items-center justify-center"><div className="w-3 h-3 bg-red-500 rounded-sm"></div></div><div className="w-1/2 h-2 bg-gray-400 rounded"></div></div>
                       <div className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-red-500 rounded-sm flex items-center justify-center"><div className="w-3 h-3 bg-red-500 rounded-sm"></div></div><div className="w-1/2 h-2 bg-gray-400 rounded"></div></div>
                       <div className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-red-500 rounded-sm"></div><div className="w-1/2 h-2 bg-gray-400 rounded"></div></div>
                       <div className="absolute -right-6 -bottom-4 w-12 h-36 bg-red-500 transform rotate-12 rounded-full border-4 border-gray-800 shadow-xl flex flex-col items-center justify-between py-1">
                         <div className="w-full h-4 bg-gray-800 opacity-50 rounded-full mt-1"></div>
                         <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-yellow-300 mb-1"></div>
                       </div>
                     </div>
                  </div>
                  <div className="p-8 bg-white flex-grow flex flex-col items-start">
                    <h4 className="font-bold text-[#1a237e] text-lg mb-1">Career Report + Career Counselling</h4>
                    <div className="font-bold text-md mb-4 text-[#1a237e]">₹4000</div>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">Connect with India's top career coaches to analyse your psychometric report, get a detailed action plan for your development areas and shortlist the top three career paths you're most likely to enjoy and excel at.</p>
                    <button className="mt-auto bg-[#7B8AF3] text-white text-xs font-bold py-2.5 px-8 rounded shadow hover:bg-blue-600 transition">BUY NOW</button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>

      <section id="contact" className="bg-[#002B5B] text-white py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to build your future?</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">Get in touch with us today and let's discover the perfect path for your career journey.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-lg mb-12">
            <a href={`mailto:${data.settings?.contactEmail || 'bertinkenfack@gmail.com'}`} className="bg-white text-[#002B5B] px-8 py-4 rounded-xl shadow-lg font-bold hover:bg-gray-100 transition">
              Email Us
            </a>
            <a href={`tel:${data.settings?.contactPhone || '9740403705'}`} className="bg-[#D49A36] text-white px-8 py-4 rounded-xl shadow-lg font-bold hover:bg-yellow-600 transition">
              Call Now
            </a>
          </div>
          
          <form className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-left">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002B5B] text-gray-900" placeholder="Your Name" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002B5B] text-gray-900" placeholder="Your Email" required />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea id="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002B5B] text-gray-900" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="w-full bg-[#D49A36] text-white font-bold py-3 px-4 rounded-md hover:bg-yellow-600 transition">Send Message</button>
          </form>
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
