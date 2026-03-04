import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref as dbRef, onValue, push } from "firebase/database";
import Reveal from './Reveal';
import { ChevronRight, X, Star, Loader2, MessageSquarePlus } from 'lucide-react';
import { logPublicAction } from '../utils/logger';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [feedbackForm, setFeedbackForm] = useState({
        clientName: '',
        company: '',
        role: '',
        content: '',
        rating: 5
    });

    useEffect(() => {
        const testimonialsRef = dbRef(database, 'testimonials');
        const unsubscribe = onValue(testimonialsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let loadedTestimonials = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                loadedTestimonials = loadedTestimonials.sort((a, b) => b.createdAt - a.createdAt);
                setTestimonials(loadedTestimonials);
            } else {
                setTestimonials([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const testimonialsRef = dbRef(database, 'testimonials');
            const newData = {
                clientName: feedbackForm.clientName,
                company: feedbackForm.company || '',
                role: feedbackForm.role || '',
                content: feedbackForm.content,
                rating: feedbackForm.rating,
                imageUrl: '',
                createdAt: Date.now()
            };

            await push(testimonialsRef, newData);

            await logPublicAction(
                'Submitted Feedback',
                'Testimonial',
                feedbackForm.clientName,
                feedbackForm.clientName,
                newData
            );

            setSubmitted(true);
            setFeedbackForm({ clientName: '', company: '', role: '', content: '', rating: 5 });

            setTimeout(() => {
                setIsFeedbackOpen(false);
                setSubmitted(false);
            }, 2000);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const closeFeedbackModal = () => {
        setIsFeedbackOpen(false);
        setSubmitted(false);
        setFeedbackForm({ clientName: '', company: '', role: '', content: '', rating: 5 });
    };

    if (loading || testimonials.length === 0) {
        return null;
    }

    const rows = [[], []];
    testimonials.forEach((t, i) => rows[i % 2].push(t));

    return (
        <section id="testimonials" className="py-24 relative bg-gray-50 dark:bg-transparent overflow-hidden transition-colors duration-300">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-7xl">
                <Reveal>
                    <div className="flex items-center justify-between mb-16 flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <ChevronRight className="text-cyan-600 dark:text-cyan-500 w-8 h-8 stroke-[3]" />
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
                                What People Say
                            </h2>
                        </div>
                        <button
                            onClick={() => setIsFeedbackOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 text-sm"
                        >
                            <MessageSquarePlus size={18} />
                            Give Feedback
                        </button>
                    </div>
                </Reveal>
            </div>

            {/* Seamless Horizontally Scrolling Marquee Rows */}
            <div className="relative w-full flex flex-col gap-6 overflow-hidden max-w-[100vw]">
                <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-gray-50 dark:from-black to-transparent z-10 pointer-events-none transition-colors"></div>
                <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-gray-50 dark:from-black to-transparent z-10 pointer-events-none transition-colors"></div>

                {rows.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={`flex gap-6 w-max pause-on-hover ${rowIndex % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}
                    >
                        {[...row, ...row].map((testimonial, index) => (
                            <div
                                key={`${testimonial.id || index}-${rowIndex}-${index}`}
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

            {/* Give Feedback Modal */}
            {isFeedbackOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm"
                        onClick={closeFeedbackModal}
                    ></div>
                    <div className="relative w-full max-w-lg p-6 md:p-8 bg-white dark:bg-[#0B0D14] backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 transition-colors animate-in zoom-in-95 duration-200">
                        <button
                            onClick={closeFeedbackModal}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                                <p className="text-gray-500 dark:text-gray-400">Your feedback has been submitted successfully.</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <MessageSquarePlus className="text-cyan-500" size={22} />
                                        Give Feedback
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Share your experience with us</p>
                                </div>

                                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Your Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={feedbackForm.clientName}
                                            onChange={(e) => setFeedbackForm({ ...feedbackForm, clientName: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyan-500/50 text-gray-900 dark:text-white outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Company</label>
                                            <input
                                                type="text"
                                                value={feedbackForm.company}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, company: e.target.value })}
                                                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyan-500/50 text-gray-900 dark:text-white outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                                                placeholder="Optional"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Role</label>
                                            <input
                                                type="text"
                                                value={feedbackForm.role}
                                                onChange={(e) => setFeedbackForm({ ...feedbackForm, role: e.target.value })}
                                                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyan-500/50 text-gray-900 dark:text-white outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                                                placeholder="Optional"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Your Feedback *</label>
                                        <textarea
                                            required
                                            value={feedbackForm.content}
                                            onChange={(e) => setFeedbackForm({ ...feedbackForm, content: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyan-500/50 text-gray-900 dark:text-white outline-none h-28 resize-none transition-colors placeholder-gray-400 dark:placeholder-gray-600"
                                            placeholder="Tell us about your experience..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Rating</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                                                    className="p-1 transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        size={28}
                                                        className={star <= feedbackForm.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={closeFeedbackModal}
                                            className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                            {submitting ? 'Submitting...' : 'Submit Feedback'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Testimonials;
