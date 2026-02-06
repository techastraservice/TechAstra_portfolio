import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: "The Future of AI in Software Development",
        excerpt: "How artificial intelligence is reshaping the way we build, test, and deploy applications.",
        date: "Oct 15, 2023",
        author: "Vivek Vernekar",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        category: "Technology"
    },
    {
        id: 2,
        title: "Optimizing React Performance for Scale",
        excerpt: "advanced techniques and best practices for building high-performance React applications.",
        date: "Oct 22, 2023",
        author: "Vivek Vernekar",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
        category: "Development"
    },
    {
        id: 3,
        title: "The Rise of Edge Computing",
        excerpt: "Why processing data closer to the source is becoming critical for modern infrastructure.",
        date: "Nov 05, 2023",
        author: "Vivek Vernekar",
        image: "https://images.unsplash.com/photo-1558494949-efc535b5c47c?q=80&w=1000&auto=format&fit=crop",
        category: "Cloud"
    }
];

const BlogPreview = () => {
    return (
        <section id="blog" className="py-20 relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm">Our Blog</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Latest Insights</h2>
                        <p className="text-gray-400 mt-2 max-w-xl">Stay updated with the latest trends, tutorials, and industry news from our experts.</p>
                    </div>
                    <a href="#" className="text-white hover:text-cyan-400 flex items-center gap-2 transition-colors group">
                        View all articles
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="group relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 h-full flex flex-col">
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <span className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                                    {post.category}
                                </span>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User size={14} />
                                        <span>{post.author}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                                    {post.excerpt}
                                </p>

                                <button className="mt-auto flex items-center text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors group-hover:translate-x-1 transition-transform duration-300">
                                    Read Article <ArrowRight size={16} className="ml-2" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
