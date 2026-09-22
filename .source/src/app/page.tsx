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

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2 mb-4 md:mb-0">
            {data.settings?.logo ? (
              <img src={urlFor(data.settings.logo).width(200).url()} alt="Logo" className="h-12 w-auto" />
            ) : (
              <img src="/Bertin-Kenfack-Voufo-/logo.png" alt="Logo" className="h-12 w-auto" />
            )}
          </div>
        </div>
      </nav>

      <section className="py-12 px-4 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#002B5B]">Mentoria Packages</h2>
        
        <div className="space-y-10 max-w-5xl mx-auto">
          
          {/* Package 1 */}
          <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
             <div className="grid md:grid-cols-2">
                <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-300">
                   <div className="bg-[#4169E1] text-white text-center py-3 font-semibold text-lg">Discover</div>
                   <div className="p-8 flex flex-col flex-grow">
                      <div className="text-center mb-6">
                         <span className="text-sm font-semibold text-gray-500 line-through">?7,000</span>
                         <div className="text-3xl font-bold text-[#4169E1]">?5,500</div>
                      </div>
                      <ul className="space-y-4 flex-grow mb-8 text-sm text-gray-700">
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Psychometric Assessment (Personality, Aptitude, Interest)</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Career counseling session (45 minutes)</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Stream selection</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Detailed career report</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-[#4169E1] text-white font-semibold py-2 px-8 rounded-full text-sm hover:bg-blue-700 transition">BUY NOW</button>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-3 font-semibold text-lg">Discover Plus</div>
                   <div className="p-8 flex flex-col flex-grow">
                      <div className="text-center mb-6">
                         <span className="text-sm font-semibold text-gray-500 line-through">?20,000</span>
                         <div className="text-3xl font-bold text-[#4169E1]">?15,000</div>
                      </div>
                      <ul className="space-y-4 flex-grow mb-8 text-sm text-gray-700">
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Everything in Discover</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Multiple career counseling sessions</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Long term career planning</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Parent involvement sessions</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-[#4169E1] text-white font-semibold py-2 px-8 rounded-full text-sm hover:bg-blue-700 transition">BUY NOW</button>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Package 2 */}
          <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
             <div className="grid md:grid-cols-2">
                <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-300">
                   <div className="bg-[#4169E1] text-white text-center py-3 font-semibold text-lg">Achieve Online</div>
                   <div className="p-8 flex flex-col flex-grow">
                      <div className="text-center mb-6">
                         <span className="text-sm font-semibold text-gray-500 line-through">?8,000</span>
                         <div className="text-3xl font-bold text-[#4169E1]">?5,999</div>
                      </div>
                      <ul className="space-y-4 flex-grow mb-8 text-sm text-gray-700">
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Complete online assessment</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Virtual career counseling (1 hour)</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Career roadmap generation</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-[#4169E1] text-white font-semibold py-2 px-8 rounded-full text-sm hover:bg-blue-700 transition">BUY NOW</button>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-3 font-semibold text-lg">Achieve Plus</div>
                   <div className="p-8 flex flex-col flex-grow">
                      <div className="text-center mb-6">
                         <span className="text-sm font-semibold text-gray-500 line-through">?14,000</span>
                         <div className="text-3xl font-bold text-[#4169E1]">?10,500</div>
                      </div>
                      <ul className="space-y-4 flex-grow mb-8 text-sm text-gray-700">
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Comprehensive career mapping</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Dedicated in-person sessions</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Action plan execution support</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-[#4169E1] text-white font-semibold py-2 px-8 rounded-full text-sm hover:bg-blue-700 transition">BUY NOW</button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Package 3 */}
          <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
             <div className="grid md:grid-cols-2">
                <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-300">
                   <div className="bg-[#4169E1] text-white text-center py-3 font-semibold text-lg">Ascend Online</div>
                   <div className="p-8 flex flex-col flex-grow">
                      <div className="text-center mb-6">
                         <span className="text-sm font-semibold text-gray-500 line-through">?9,000</span>
                         <div className="text-3xl font-bold text-[#4169E1]">?6,499</div>
                      </div>
                      <ul className="space-y-4 flex-grow mb-8 text-sm text-gray-700">
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> In-depth skill gap analysis</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Virtual professional mentoring</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Industry insights</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-[#4169E1] text-white font-semibold py-2 px-8 rounded-full text-sm hover:bg-blue-700 transition">BUY NOW</button>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-3 font-semibold text-lg">Ascend Plus</div>
                   <div className="p-8 flex flex-col flex-grow">
                      <div className="text-center mb-6">
                         <span className="text-sm font-semibold text-gray-500 line-through">?15,000</span>
                         <div className="text-3xl font-bold text-[#4169E1]">?10,599</div>
                      </div>
                      <ul className="space-y-4 flex-grow mb-8 text-sm text-gray-700">
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Professional resume building</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Interview preparation</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Personal branding strategies</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-[#4169E1] text-white font-semibold py-2 px-8 rounded-full text-sm hover:bg-blue-700 transition">BUY NOW</button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Package 4 */}
          <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
             <div className="grid md:grid-cols-2">
                <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-300">
                   <div className="bg-[#4169E1] text-white text-center py-3 font-semibold text-lg">Ascend Premium</div>
                   <div className="p-8 flex flex-col flex-grow">
                      <div className="text-center mb-6">
                         <span className="text-sm font-semibold text-gray-500 line-through">?20,000</span>
                         <div className="text-3xl font-bold text-[#4169E1]">?15,499</div>
                      </div>
                      <ul className="space-y-4 flex-grow mb-8 text-sm text-gray-700">
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Comprehensive career gap analysis</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> 1-on-1 premium mentoring</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Direct industry connections</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-[#4169E1] text-white font-semibold py-2 px-8 rounded-full text-sm hover:bg-blue-700 transition">BUY NOW</button>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col">
                   <div className="bg-[#4169E1] text-white text-center py-3 font-semibold text-lg">Ascend Executive</div>
                   <div className="p-8 flex flex-col flex-grow">
                      <div className="text-center mb-6">
                         <span className="text-sm font-semibold text-gray-500 line-through">?25,000</span>
                         <div className="text-3xl font-bold text-[#4169E1]">?20,599</div>
                      </div>
                      <ul className="space-y-4 flex-grow mb-8 text-sm text-gray-700">
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Executive resume & cover letter</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> Advanced interview prep</li>
                         <li className="flex items-start"><span className="text-[#4169E1] mr-2">?</span> LinkedIn profile makeover</li>
                      </ul>
                      <div className="text-center">
                        <button className="bg-[#4169E1] text-white font-semibold py-2 px-8 rounded-full text-sm hover:bg-blue-700 transition">BUY NOW</button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Package 5 */}
          <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
             <div className="grid md:grid-cols-2">
                <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-300 p-8">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-[#4169E1] text-white rounded-md flex items-center justify-center font-bold text-xl">??</div>
                      <div>
                         <h4 className="font-bold text-[#4169E1] text-lg">Resume Building</h4>
                         <p className="text-sm text-gray-600">Professional tailored resumes</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#4169E1] text-white rounded-md flex items-center justify-center font-bold text-xl">in</div>
                      <div>
                         <h4 className="font-bold text-[#4169E1] text-lg">LinkedIn Makeover</h4>
                         <p className="text-sm text-gray-600">Optimize your digital brand</p>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col p-8">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-[#4169E1] text-white rounded-md flex items-center justify-center font-bold text-xl">??</div>
                      <div>
                         <h4 className="font-bold text-[#4169E1] text-lg">Career Assessment</h4>
                         <p className="text-sm text-gray-600">Discover your strengths</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#4169E1] text-white rounded-md flex items-center justify-center font-bold text-xl">??</div>
                      <div>
                         <h4 className="font-bold text-[#4169E1] text-lg">Interview Prep</h4>
                         <p className="text-sm text-gray-600">Mock interviews & tips</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Package 6 */}
          <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
             <div className="grid md:grid-cols-2">
                <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-300 p-8">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-[#4169E1] text-white rounded-full flex items-center justify-center font-bold text-xl">??</div>
                      <div>
                         <h4 className="font-bold text-[#4169E1] text-lg">University Selection</h4>
                         <p className="text-sm text-gray-600">Find the right global fit</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#4169E1] text-white rounded-full flex items-center justify-center font-bold text-xl">??</div>
                      <div>
                         <h4 className="font-bold text-[#4169E1] text-lg">Application Strategy</h4>
                         <p className="text-sm text-gray-600">Crafting perfect essays</p>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col p-8">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-[#4169E1] text-white rounded-full flex items-center justify-center font-bold text-xl">??</div>
                      <div>
                         <h4 className="font-bold text-[#4169E1] text-lg">Visa Assistance</h4>
                         <p className="text-sm text-gray-600">End-to-end processing</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#4169E1] text-white rounded-full flex items-center justify-center font-bold text-xl">??</div>
                      <div>
                         <h4 className="font-bold text-[#4169E1] text-lg">Pre-departure Briefing</h4>
                         <p className="text-sm text-gray-600">Get ready to fly</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
}
