import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref as dbRef, onValue } from "firebase/database";
import Reveal from './Reveal';
import { ChevronRight, X } from 'lucide-react';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);

    useEffect(() => {
        const testimonialsRef = dbRef(database, 'testimonials');
        const unsubscribe = onValue(testimonialsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let loadedTestimonials = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Sort by newest first
                loadedTestimonials = loadedTestimonials.sort((a, b) => b.createdAt - a.createdAt);
                setTestimonials(loadedTestimonials);
            } else {
                setTestimonials([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading || testimonials.length === 0) {
        return null;
    }

    // Split testimonials into 2 rows for the horizontal marquees
    const rows = [[], []];
    testimonials.forEach((t, i) => rows[i % 2].push(t));

    return (
        <section id="testimonials" className="py-24 relative bg-gray-50 dark:bg-[#050505] overflow-hidden transition-colors duration-300">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-7xl">
                <Reveal>
                    <div className="flex items-center gap-3 mb-16">
                        <ChevronRight className="text-cyan-600 dark:text-cyan-500 w-8 h-8 stroke-[3]" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
                            What People Say
                        </h2>
                    </div>
                </Reveal>
            </div>

            {/* Seamless Horizontally Scrolling Marquee Rows */}
            <div className="relative w-full flex flex-col gap-6 overflow-hidden max-w-[100vw]">
                {/* Left/Right Gradient Mask for smooth fade-in/-out effect */}
                <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-gray-50 dark:from-[#050505] to-transparent z-10 pointer-events-none transition-colors"></div>
                <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-gray-50 dark:from-[#050505] to-transparent z-10 pointer-events-none transition-colors"></div>

                {rows.map((row, rowIndex) => (
                     <div 
                         key={rowIndex} 
                         className={`flex gap-6 w-max pause-on-hover ${rowIndex % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}
                     >
                         {/* Duplicate Content blocks exactly twice to ensure a perfect endless continuous loop (`-50%` wrapper translate logic natively expects two full sets to form exactly 100% boundary width without jumping gaps) */}
                         {[...row, ...row].map((testimonial, index) => (
                             <div 
                                 key={`${testimonial.id || index}-${rowIndex}`} 
                                 onClick={() => setSelectedTestimonial(testimonial)}
                                 className="bg-white dark:bg-[#0B0D14] border border-gray-200 dark:border-white/5 hover:border-cyan-500/30 rounded-2xl p-6 transition-all flex gap-4 md:gap-5 items-start w-[320px] md:w-[450px] shrink-0 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 group dark:shadow-none shadow-sm"
                             >
                                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-black/50">
                                     {testimonial.imageUrl ? (
                                         <img src={testimonial.imageUrl} alt={testimonial.clientName} className="w-full h-full object-cover" />
                                     ) : (
                                         <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-cyan-600 to-purple-600 text-white font-bold">
                                             {testimonial.clientName ? testimonial.clientName[0].toUpperCase() : 'C'}
                                         </div>
                                     )}
                                 </div>

                                 <div className="flex-1">
                                     <p className="text-gray-600 dark:text-gray-400 text-[13px] md:text-sm leading-relaxed mb-4 font-normal line-clamp-3 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
                                         "{testimonial.content}"
                                     </p>
                                     <div className="text-cyan-600 dark:text-cyan-500 font-medium text-xs md:text-[13px] transition-colors">
                                         @{testimonial.company ? testimonial.company.replace(/\s+/g, '').toLowerCase() : testimonial.clientName.replace(/\s+/g, '').toLowerCase()}
                                     </div>
                                 </div>
                             </div>
                         ))}
                    </div>
                ))}
            </div>

            {/* Testimonial Detailed Modal */}
            {selectedTestimonial && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedTestimonial(null)}
                    ></div>
                    <div className="relative w-full max-w-2xl md:p-8 p-6 animate-in slide-in-from-bottom-4 fade-in duration-300 bg-white dark:bg-[#0B0D14] backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 flex flex-col items-center text-center transition-colors">
                        <button
                            onClick={() => setSelectedTestimonial(null)}
                            className="absolute top-4 right-4 btn-icon-only"
                        >
                            <X size={24} />
                        </button>

                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] mb-6 mx-auto">
                            {selectedTestimonial.imageUrl ? (
                                 <img src={selectedTestimonial.imageUrl} alt={selectedTestimonial.clientName} className="w-full h-full object-cover" />
                             ) : (
                                 <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-cyan-600 to-purple-600 text-white font-bold text-2xl">
                                     {selectedTestimonial.clientName ? selectedTestimonial.clientName[0].toUpperCase() : 'C'}
                                 </div>
                             )}
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 md:text-lg leading-relaxed mb-8 italic transition-colors">
                            "{selectedTestimonial.content}"
                        </p>

                        <div className="mt-auto">
                            <h3 className="text-gray-900 dark:text-white font-bold text-xl transition-colors">{selectedTestimonial.clientName}</h3>
                            <div className="text-cyan-600 dark:text-cyan-500 font-medium tracking-wide mt-1 transition-colors">
                                {selectedTestimonial.role && `${selectedTestimonial.role}`}
                                {selectedTestimonial.role && selectedTestimonial.company && ` @ `}
                                {selectedTestimonial.company}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Testimonials;
