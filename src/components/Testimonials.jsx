import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref as dbRef, onValue } from "firebase/database";
import Reveal from './Reveal';
import { ChevronRight } from 'lucide-react';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <section id="testimonials" className="py-24 relative bg-[#050505] overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-7xl">
                <Reveal>
                    <div className="flex items-center gap-3 mb-16">
                        <ChevronRight className="text-red-500 w-8 h-8 stroke-[3]" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            What People Say
                        </h2>
                    </div>
                </Reveal>
            </div>

            {/* Seamless Horizontally Scrolling Marquee Rows */}
            <div className="relative w-full flex flex-col gap-6 overflow-hidden max-w-[100vw]">
                {/* Left/Right Gradient Mask for smooth fade-in/-out effect */}
                <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

                {rows.map((row, rowIndex) => (
                     <div 
                         key={rowIndex} 
                         className={`flex gap-6 w-max pause-on-hover ${rowIndex % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}
                     >
                         {/* Duplicate Content blocks exactly twice to ensure a perfect endless continuous loop (`-50%` wrapper translate logic natively expects two full sets to form exactly 100% boundary width without jumping gaps) */}
                         {[...row, ...row].map((testimonial, index) => (
                             <div 
                                 key={`${testimonial.id || index}-${rowIndex}`} 
                                 className="bg-[#0B0D14] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-colors flex gap-4 md:gap-5 items-start w-[320px] md:w-[450px] shrink-0"
                             >
                                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-black/50">
                                     {testimonial.imageUrl ? (
                                         <img src={testimonial.imageUrl} alt={testimonial.clientName} className="w-full h-full object-cover" />
                                     ) : (
                                         <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-gray-800 to-gray-700 text-white font-bold">
                                             {testimonial.clientName ? testimonial.clientName[0].toUpperCase() : 'C'}
                                         </div>
                                     )}
                                 </div>

                                 <div className="flex-1">
                                     <p className="text-gray-400 text-[13px] md:text-sm leading-relaxed mb-4 font-normal">
                                         "{testimonial.content}"
                                     </p>
                                     <div className="text-red-500 font-medium text-xs md:text-[13px]">
                                         @{testimonial.company ? testimonial.company.replace(/\s+/g, '').toLowerCase() : testimonial.clientName.replace(/\s+/g, '').toLowerCase()}
                                     </div>
                                 </div>
                             </div>
                         ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
