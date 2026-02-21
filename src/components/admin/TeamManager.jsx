import React, { useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Trash2, Edit2, Search, Users, ExternalLink, Github, Linkedin, Upload, Loader2 } from 'lucide-react';

const TeamManager = () => {
    const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useTeam();
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        image: '',
        desc: '',
        linkedin: '',
        github: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (member) => {
        setFormData({
            name: member.name || '',
            role: member.role || '',
            image: member.image || '',
            desc: member.desc || '',
            linkedin: member.linkedin || '',
            github: member.github || ''
        });
        setImageFile(null);
        setImagePreview(member.image || null);
        setEditingId(member.id);

        // Scroll to form (assuming it's at the top)
        const formElement = document.getElementById('team-form');
        if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
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
                const storageRef = ref(storage, `team/${Date.now()}_${imageFile.name}`);
                const uploadTask = await uploadBytesResumable(storageRef, imageFile);
                imageUrl = await getDownloadURL(uploadTask.ref);
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("Image upload failed. Please try again.");
                setUploading(false);
                return;
            }
            setUploading(false);
        }

        const teamData = { ...formData, image: imageUrl };

        if (editingId) {
            updateTeamMember(editingId, teamData);
            alert('Team member updated successfully!');
            setEditingId(null);
        } else {
            if (!imageUrl) {
                alert("Please select an avatar image!");
                return;
            }
            addTeamMember(teamData);
            alert('Team member added successfully!');
        }

        setFormData({ name: '', role: '', image: '', desc: '', linkedin: '', github: '' });
        setImageFile(null);
        setImagePreview(null);
    };

    const handleDelete = (member) => {
        if (window.confirm(`Are you sure you want to remove "${member.name}" from the team?`)) {
            deleteTeamMember(member.id);
        }
    };

    const filteredMembers = teamMembers.filter(m =>
        m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col gap-8">
            {/* Form Section */}
            <div id="team-form" className="bg-[#0f0f16]/90 border border-white/10 rounded-2xl p-6 relative backdrop-blur-xl shadow-2xl shrink-0">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                    <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                    {editingId ? 'Edit Team Member' : 'Add New Team Member'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="group">
                            <label className="block text-xs font-mono text-cyan-500/80 mb-1 tracking-wider">FULL NAME</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white placeholder-gray-600 outline-none transition-all text-sm"
                                required
                                placeholder="e.g. John Doe"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-xs font-mono text-purple-500/80 mb-1 tracking-wider">ROLE / TITLE</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-purple-500/50 text-white placeholder-gray-600 outline-none transition-all text-sm"
                                required
                                placeholder="e.g. Lead Designer"
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-xs font-mono text-gray-500 mb-2 tracking-wider">AVATAR IMAGE</label>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-black/40 border border-white/10 shrink-0 flex items-center justify-center relative group/image">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Users className="w-6 h-6 text-gray-600" />
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
                                <p className="text-sm text-gray-400 mb-1">Upload a squarish image (1:1 ratio recommended).</p>
                                <p className="text-xs text-gray-500">Supported formats: JPG, PNG, WEBP.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="group">
                            <label className="block text-xs font-mono text-blue-500/80 mb-1 tracking-wider">LINKEDIN URL (OPTIONAL)</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    className="w-full p-3 pl-10 rounded-lg bg-black/40 border border-white/10 focus:border-blue-500/50 text-white placeholder-gray-600 outline-none transition-all text-sm"
                                    placeholder="https://linkedin.com/in/..."
                                />
                                <Linkedin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                            </div>
                        </div>
                        <div className="group">
                            <label className="block text-xs font-mono text-gray-400 mb-1 tracking-wider">GITHUB URL (OPTIONAL)</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    className="w-full p-3 pl-10 rounded-lg bg-black/40 border border-white/10 focus:border-gray-400/50 text-white placeholder-gray-600 outline-none transition-all text-sm"
                                    placeholder="https://github.com/..."
                                />
                                <Github className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-xs font-mono text-gray-500 mb-1 tracking-wider">SHORT BIO / DESCRIPTION</label>
                        <textarea
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-500/50 text-white placeholder-gray-600 outline-none transition-all h-24 resize-none text-sm"
                            required
                            maxLength="150"
                            placeholder="Brief description of skills and focus..."
                        ></textarea>
                        <div className="text-right text-xs text-gray-600 mt-1">{formData.desc.length}/150</div>
                    </div>

                    <div className="flex justify-end pt-2 gap-3">
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setFormData({ name: '', role: '', image: '', desc: '', linkedin: '', github: '' });
                                    setImageFile(null);
                                    setImagePreview(null);
                                }}
                                className="py-2.5 px-6 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 font-bold rounded-lg transition-all border border-gray-500/30 text-xs uppercase tracking-wider"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={uploading}
                            className={`py-2.5 px-6 font-bold rounded-lg transition-all border shadow-[0_0_15px_rgba(6,182,212,0.1)] text-xs uppercase tracking-wider flex items-center gap-2
                                ${uploading
                                    ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                                }`}
                        >
                            {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {uploading ? 'Uploading...' : (editingId ? 'Update Member' : 'Add Member')}
                        </button>
                    </div>
                </form>
            </div>

            {/* List Section */}
            <div className="bg-[#0f0f16]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl flex-1 flex flex-col min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <Users className="text-purple-500 w-5 h-5" />
                        Team Roster
                    </h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search team..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 pl-10 text-sm text-white focus:border-cyan-500/50 outline-none w-48 md:w-64 transition-all"
                        />
                        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pr-2 pb-2">
                    {filteredMembers.map((member) => (
                        <div key={member.id} className="bg-black/40 hover:bg-white/5 border border-white/5 hover:border-cyan-500/30 rounded-xl p-4 flex gap-4 transition-all duration-300 group">
                            <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/10 group-hover:border-cyan-500/50 transition-colors shrink-0" />
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h3 className="text-white font-bold truncate">{member.name}</h3>
                                <p className="text-cyan-400 text-xs font-medium truncate mb-1">{member.role}</p>
                                <div className="flex gap-2">
                                    {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400"><Linkedin size={14} /></a>}
                                    {member.github && <a href={member.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white"><Github size={14} /></a>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0">
                                <button
                                    onClick={() => handleEdit(member)}
                                    className="p-1.5 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                                    title="Edit Member"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(member)}
                                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Remove Member"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredMembers.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-xl bg-black/20">
                            {searchTerm ? "No team members found." : "No team members added yet."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamManager;
