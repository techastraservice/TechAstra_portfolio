import React, { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { ExternalLink, Github, Trash2, Search, Edit2, Upload, Loader2, Plus, X, FolderOpen } from 'lucide-react';
import { logAdminAction } from '../../utils/logger';
import { uploadToCloudinary } from '../../utils/cloudinary';

const ProjectManager = () => {
    const { addProject, projects, deleteProject, updateProject } = useProjects();

    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        image: '',
        desc: '',
        technologies: '',
        liveLink: '',
        githubUrl: ''
    });

    // Lock body scroll when modal is open
    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showForm]);

    const resetForm = () => {
        setFormData({ title: '', category: '', image: '', desc: '', technologies: '', liveLink: '', githubUrl: '' });
        setImageFile(null);
        setImagePreview(null);
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title || '',
            category: project.category || '',
            image: project.image || '',
            desc: project.desc || '',
            technologies: Array.isArray(project.tech) ? project.tech.join(', ') : (project.tech || ''),
            liveLink: project.liveLink || '',
            githubUrl: project.githubUrl || ''
        });
        setImageFile(null);
        setImagePreview(project.image || null);
        setEditingId(project.id);
        setShowForm(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = formData.image;

        if (imageFile) {
            setUploading(true);
            try {
                imageUrl = await uploadToCloudinary(imageFile, 'projects');
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("Image upload failed. Please try again.");
                setUploading(false);
                return;
            }
            setUploading(false);
        }

        const projectData = {
            ...formData,
            image: imageUrl,
            tech: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
        };
        delete projectData.technologies;

        if (editingId) {
            updateProject(editingId, projectData);
            logAdminAction('Updated Project', 'Project', projectData.title, projectData);
            alert('Project updated successfully!');
        } else {
            if (!imageUrl) {
                alert("Please select a project image!");
                return;
            }
            addProject(projectData);
            logAdminAction('Added Project', 'Project', projectData.title, projectData);
            alert('Project added successfully!');
        }

        resetForm();
    };

    const handleDelete = (project) => {
        if (window.confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
            deleteProject(project.id);
            logAdminAction('Deleted Project', 'Project', project.title, project);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header with Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="w-1 h-8 bg-cyan-500 rounded-full"></span>
                        Projects Directory
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 ml-4">{projects.length} project{projects.length !== 1 ? 's' : ''} in database</p>
                </div>

                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="btn-primary"
                >
                    <Plus size={18} />
                    Add New Project
                </button>
            </div>

            {/* Modal Popup for Add/Edit */}
            {showForm && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={resetForm}>
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    {/* Modal */}
                    <div
                        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0f0f16] border border-white/10 rounded-2xl shadow-2xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent rounded-t-2xl"></div>

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                {editingId ? 'Edit Project Protocol' : 'New Project Protocol'}
                            </h3>
                            <button
                                onClick={resetForm}
                                className="btn-icon-only"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Scrollable Form Content */}
                        <div className="overflow-y-auto px-6 py-6 flex-1">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-xs font-mono text-cyan-500/80 mb-2 tracking-wider">PROJECT IDENTIFIER</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white placeholder-gray-600 outline-none transition-all focus:bg-black/60 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                            required
                                            placeholder="Enter project name..."
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-mono text-purple-500/80 mb-2 tracking-wider">CATEGORY CLASSIFICATION</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500/50 text-white placeholder-gray-600 outline-none transition-all focus:bg-black/60 focus:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                                            required
                                            placeholder="e.g. Web Development"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-mono text-gray-500 mb-2 tracking-wider">PROJECT TEMPLATE IMAGE</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-16 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0 flex items-center justify-center relative group/image">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            )}
                                            <div className="absolute inset-0 bg-black/50 hidden group-hover/image:flex items-center justify-center transition-all">
                                                <Upload className="w-5 h-5 text-white" />
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                required={!editingId && !imagePreview}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-400 mb-1">Upload a visually stunning preview image.</p>
                                            <p className="text-xs text-gray-500">Supported formats: JPG, PNG, WEBP (16:9 ratio recommended).</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-xs font-mono text-gray-500 mb-2 tracking-wider">DEPLOYMENT UPLINK (OPTIONAL)</label>
                                        <input
                                            type="url"
                                            name="liveLink"
                                            value={formData.liveLink}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-lg bg-black/40 border border-white/10 focus:border-green-500/50 text-white placeholder-gray-600 outline-none transition-all"
                                            placeholder="https://"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-mono text-gray-500 mb-2 tracking-wider">GITHUB REPO (OPTIONAL)</label>
                                        <input
                                            type="url"
                                            name="githubUrl"
                                            value={formData.githubUrl}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500/50 text-white placeholder-gray-600 outline-none transition-all"
                                            placeholder="https://github.com/"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-mono text-gray-500 mb-2 tracking-wider">TECH STACK (CSV)</label>
                                    <input
                                        type="text"
                                        name="technologies"
                                        value={formData.technologies}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg bg-black/40 border border-white/10 focus:border-yellow-500/50 text-white placeholder-gray-600 outline-none transition-all"
                                        required
                                        placeholder="React, Node.js, AI..."
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-mono text-gray-500 mb-2 tracking-wider">PROJECT DATA LOG</label>
                                    <textarea
                                        name="desc"
                                        value={formData.desc}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white placeholder-gray-600 outline-none transition-all h-32 resize-none"
                                        required
                                        placeholder="Detailed system description..."
                                    ></textarea>
                                </div>

                                <div className="pt-4 flex justify-end gap-4 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="btn-secondary"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className={uploading ? "btn-secondary opacity-50 cursor-not-allowed" : "btn-primary"}
                                    >
                                        {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {uploading ? 'Uploading...' : (editingId ? 'UPDATE TEMPLATE' : 'ADD TEMPLATE')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Projects List */}
            <div className="bg-[#0f0f16]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                        Active Projects
                    </h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search database..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 pl-10 text-sm text-white focus:border-cyan-500/50 outline-none w-48 md:w-64 transition-all"
                        />
                        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="group bg-black/20 hover:bg-white/5 border border-white/5 hover:border-cyan-500/30 rounded-xl p-4 flex flex-col md:flex-row gap-4 transition-all duration-300">
                            <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden relative">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">{project.category}</span>
                                            </div>
                                            <p className="text-gray-500 text-xs line-clamp-2 md:line-clamp-1">{project.desc}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="btn-icon-only hover:text-cyan-500 hover:bg-cyan-500/10"
                                                title="Edit Project"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project)}
                                                className="btn-icon-only hover:text-red-500 hover:bg-red-500/10"
                                                title="Delete Project"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-[10px] text-gray-400 font-mono bg-white/5 px-2 py-1 rounded">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs font-mono text-gray-600">
                                    <span>ID: <span className="text-gray-400">P-{project.id || 'LEGACY'}</span></span>
                                    <span>STATUS: <span className="text-green-500">ACTIVE</span></span>
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-cyan-500 hover:text-cyan-400 transition-colors">
                                            <ExternalLink size={12} /> Live
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-purple-500 hover:text-purple-400 transition-colors">
                                            <Github size={12} /> Repo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16 text-gray-500">
                            <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p className="font-medium">No projects found matching your query.</p>
                            <p className="text-xs mt-1">Try a different search term or add a new project.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectManager;
