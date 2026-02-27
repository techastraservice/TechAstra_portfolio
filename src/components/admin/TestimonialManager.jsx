import React, { useState, useEffect } from 'react';
import { database, storage } from '../../firebaseConfig';
import { ref as dbRef, onValue, push, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { MessageSquareQuote, Plus, Trash2, Upload, Loader2, Star, User, Edit2, XCircle } from 'lucide-react';
import { logAdminAction } from '../../utils/logger';

const TestimonialManager = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        clientName: '',
        company: '',
        role: '',
        content: '',
        rating: 5,
        imageUrl: ''
    });

    useEffect(() => {
        const testimonialsRef = dbRef(database, 'testimonials');
        const unsubscribe = onValue(testimonialsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const loadedTestimonials = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Sort by newest first
                setTestimonials(loadedTestimonials.sort((a, b) => b.createdAt - a.createdAt));
            } else {
                setTestimonials([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        try {
            const fileRef = storageRef(storage, `testimonials/${Date.now()}_${file.name}`);
            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);
            setFormData(prev => ({ ...prev, imageUrl: url }));
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
            setImagePreview(null);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingId) {
                // Update existing
                const testimonialRef = dbRef(database, `testimonials/${editingId}`);
                const updateData = {
                    ...formData,
                    updatedAt: Date.now()
                };
                await update(testimonialRef, updateData);
                await logAdminAction('Updated Testimonial', 'Testimonial', formData.clientName, updateData);
            } else {
                // Create new
                const testimonialsRef = dbRef(database, 'testimonials');
                const newData = {
                    ...formData,
                    createdAt: Date.now()
                };
                await push(testimonialsRef, newData);
                await logAdminAction('Added Testimonial', 'Testimonial', formData.clientName, newData);
            }

            // Reset form
            closeModal();
        } catch (error) {
            console.error("Error saving testimonial:", error);
            alert("Failed to save testimonial");
        }
    };

    const openModalForNew = () => {
        setFormData({
            clientName: '',
            company: '',
            role: '',
            content: '',
            rating: 5,
            imageUrl: ''
        });
        setImagePreview(null);
        setEditingId(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (testimonial) => {
        setFormData({
            clientName: testimonial.clientName || '',
            company: testimonial.company || '',
            role: testimonial.role || '',
            content: testimonial.content || '',
            rating: testimonial.rating || 5,
            imageUrl: testimonial.imageUrl || ''
        });
        setImagePreview(testimonial.imageUrl || null);
        setEditingId(testimonial.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setImagePreview(null);
        setFormData({
            clientName: '',
            company: '',
            role: '',
            content: '',
            rating: 5,
            imageUrl: ''
        });
    };

    const handleDelete = async (testimonial) => {
        if (window.confirm("Are you sure you want to delete this testimonial?")) {
            try {
                const testimonialRef = dbRef(database, `testimonials/${testimonial.id}`);
                await remove(testimonialRef);
                await logAdminAction('Deleted Testimonial', 'Testimonial', testimonial.clientName, testimonial);
            } catch (error) {
                console.error("Error deleting testimonial:", error);
            }
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500 animate-pulse">Loading testimonials database...</div>;
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageSquareQuote className="text-cyan-500" />
                    Testimonial Management
                </h2>
                <button
                    onClick={openModalForNew}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-cyan-500/25"
                >
                    <Plus size={18} /> Add Testimonial
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                
                {/* Modal Form */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-[#0f0f16] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
                            
                            {/* Modal Header */}
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0a0f]">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    {editingId ? <Edit2 className="text-cyan-500" /> : <Plus className="text-cyan-500" />}
                                    {editingId ? 'Edit Testimonial' : 'New Testimonial'}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-white transition-colors p-2"
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono text-gray-500 mb-1">CLIENT NAME</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.clientName}
                                                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                                                className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono text-gray-500 mb-1">COMPANY</label>
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none transition-colors"
                                                    placeholder="TechCorp (Optional)"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono text-gray-500 mb-1">ROLE</label>
                                                <input
                                                    type="text"
                                                    value={formData.role}
                                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none transition-colors"
                                                    placeholder="CEO (Optional)"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6">
                                        <div>
                                            <label className="block text-xs font-mono text-gray-500 mb-1">TESTIMONIAL CONTENT</label>
                                            <textarea
                                                required
                                                value={formData.content}
                                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none h-32 resize-none transition-colors"
                                                placeholder="What did the client say about us?"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-mono text-gray-500 mb-1">RATING (1-5)</label>
                                                <select 
                                                    value={formData.rating}
                                                    onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                                                    className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white outline-none appearance-none transition-colors"
                                                >
                                                    {[5,4,3,2,1].map(num => (
                                                        <option key={num} value={num} className="bg-[#0a0a0f]">{num} Stars</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-mono text-gray-500 mb-1">CLIENT PHOTO</label>
                                                <div className="relative border-2 border-dashed border-white/10 rounded-xl h-24 flex items-center justify-center hover:border-cyan-500/30 transition-colors bg-black/20 overflow-hidden group">
                                                    {imagePreview ? (
                                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                                                    ) : (
                                                        <Upload className="text-gray-500 group-hover:text-cyan-500 transition-colors" size={24} />
                                                    )}
                                                    
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        disabled={uploading}
                                                    />
                                                    
                                                    {uploading && (
                                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                                            <Loader2 className="animate-spin text-cyan-500" size={24} />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-gray-500 mt-1 text-center font-mono">Click to browse</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="flex justify-end gap-3 pt-6 border-t border-white/5 sticky bottom-0 bg-[#0f0f16] -mx-6 px-6 pb-2 mt-6">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-6 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium border border-transparent hover:border-white/10"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={uploading}
                                            className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors border border-cyan-500/50 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                                        >
                                            {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                                            {editingId ? 'Save Changes' : 'Publish Testimonial'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Display Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-[#0f0f16]/60 border border-white/5 hover:border-white/10 rounded-2xl p-6 relative group transition-all flex flex-col h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                            
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-10">
                                <button 
                                    onClick={() => openModalForEdit(testimonial)}
                                    className="p-2 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                                    title="Edit Testimonial"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(testimonial)}
                                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Delete Testimonial"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 p-[2px] shrink-0">
                                    <div className="w-full h-full rounded-full bg-black/80 overflow-hidden flex items-center justify-center">
                                        {testimonial.imageUrl ? (
                                            <img src={testimonial.imageUrl} alt={testimonial.clientName} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="text-gray-500" size={20} />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{testimonial.clientName}</h4>
                                    <p className="text-xs text-gray-500">
                                        {testimonial.role && <span className="text-gray-400">{testimonial.role}</span>}
                                        {testimonial.role && testimonial.company && <span> at </span>}
                                        {testimonial.company && <span className="text-cyan-500/70">{testimonial.company}</span>}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={14} 
                                        className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-700"} 
                                    />
                                ))}
                            </div>

                            <div className="flex-1 relative">
                                <MessageSquareQuote className="absolute top-0 left-0 text-white/5 w-12 h-12 -translate-x-3 -translate-y-3 pointer-events-none" />
                                <p className="text-gray-300 text-sm leading-relaxed relative z-10 italic">"{testimonial.content}"</p>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gray-600 font-mono tracking-wider">
                                ADDED: {new Date(testimonial.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                    
                    {testimonials.length === 0 && !isModalOpen && (
                        <div className="col-span-full py-12 text-center border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-gray-500 gap-3">
                            <MessageSquareQuote size={48} className="text-gray-700" />
                            <p>No testimonials stored in database yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialManager;
