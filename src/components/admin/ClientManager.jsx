import React, { useState, useEffect } from 'react';
import { database } from '../../firebaseConfig';
import { ref, onValue, update, remove } from "firebase/database";
import { CheckCircle, XCircle, Trash2, Clock, Search, User } from 'lucide-react';

const ClientManager = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        const clientsRef = ref(database, 'clients');
        const unsubscribe = onValue(clientsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const loadedClients = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Sort by generatedAt descending (newest first)
                setClients(loadedClients.sort((a, b) => b.generatedAt - a.generatedAt));
            } else {
                setClients([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateStatus = async (id, status) => {
        const clientRef = ref(database, `clients/${id}`);
        try {
            await update(clientRef, { status });
            // alert(`Client marked as ${status}`);
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const deleteClient = async (id) => {
        if (window.confirm("Are you sure you want to delete this client record?")) {
            const clientRef = ref(database, `clients/${id}`);
            try {
                await remove(clientRef);
            } catch (error) {
                console.error("Error deleting client:", error);
            }
        }
    };

    const filteredClients = clients.filter(client =>
        client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="p-8 text-center text-gray-500 animate-pulse">Loading clients database...</div>;
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <User className="text-cyan-500" />
                    Client Management
                </h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 pl-10 text-sm text-white focus:border-cyan-500/50 outline-none w-64 transition-all"
                    />
                    <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                </div>
            </div>

            {/* Client List */}
            <div className="flex-1 overflow-y-auto bg-[#0f0f16]/90 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
                <div className="p-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-[#0a0a0f] z-10 text-xs font-mono text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="p-4 border-b border-white/5">Client</th>
                                <th className="p-4 border-b border-white/5">Project</th>
                                <th className="p-4 border-b border-white/5">Price</th>
                                <th className="p-4 border-b border-white/5">Date</th>
                                <th className="p-4 border-b border-white/5">Status</th>
                                <th className="p-4 border-b border-white/5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 mx-2">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr key={client.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <div className="font-bold text-white cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => setSelectedClient(client)}>{client.clientName}</div>
                                            <div className="text-xs text-gray-500">ID: {client.id.slice(0, 8)}...</div>
                                        </td>
                                        <td className="p-4 text-gray-300">{client.projectTitle}</td>
                                        <td className="p-4 font-mono text-cyan-400">₹{client.priceWithoutResource || client.priceWithResource || 'N/A'}</td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {new Date(client.generatedAt || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${client.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                client.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                }`}>
                                                {client.status === 'Approved' && <CheckCircle size={12} />}
                                                {client.status === 'Rejected' && <XCircle size={12} />}
                                                {client.status === 'Pending' && <Clock size={12} />}
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {client.status === 'Pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => updateStatus(client.id, 'Approved')}
                                                            className="p-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(client.id, 'Rejected')}
                                                            className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                                            title="Reject"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => deleteClient(client.id)}
                                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">
                                        No clients found. Generate an agreement to see clients here.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Client Details Modal */}
            {selectedClient && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0f0f16] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0a0f]">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <User className="text-cyan-500" />
                                    Client Profile
                                </h3>
                                <p className="text-xs text-gray-500 font-mono mt-1">ID: {selectedClient.id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedClient(null)}
                                className="text-gray-500 hover:text-white transition-colors p-2"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">CLIENT NAME</p>
                                    <p className="text-white font-medium">{selectedClient.clientName || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">PROJECT TITLE</p>
                                    <p className="text-cyan-400 font-medium">{selectedClient.projectTitle || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">EMAIL</p>
                                    <p className="text-white font-medium">{selectedClient.clientEmail || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">PHONE</p>
                                    <p className="text-white font-medium">{selectedClient.clientPhone || 'N/A'}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs font-mono text-gray-500 mb-1">ADDRESS</p>
                                    <p className="text-white font-medium">{selectedClient.clientAddress || 'N/A'}</p>
                                </div>
                            </div>
                            
                            <hr className="border-white/5" />
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">PRICE (WO/RESOURCE)</p>
                                    <p className="text-white font-mono">₹{selectedClient.priceWithoutResource || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">PRICE (W/RESOURCE)</p>
                                    <p className="text-white font-mono">₹{selectedClient.priceWithResource || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">DURATION</p>
                                    <p className="text-white">{selectedClient.duration || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">START DATE</p>
                                    <p className="text-white">{selectedClient.startDate || 'N/A'}</p>
                                </div>
                            </div>

                            <hr className="border-white/5" />

                            <div>
                                <p className="text-xs font-mono text-gray-500 mb-2">DELIVERABLES</p>
                                <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-gray-300 text-sm whitespace-pre-wrap">
                                    {selectedClient.deliverables || 'No deliverables specified.'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientManager;
