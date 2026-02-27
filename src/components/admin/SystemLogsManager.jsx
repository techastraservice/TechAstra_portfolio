import React, { useState, useEffect } from 'react';
import { database } from '../../firebaseConfig';
import { ref, onValue } from "firebase/database";
import { Activity, Search, Eye, XCircle, Clock, Database, User } from 'lucide-react';

const SystemLogsManager = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLog, setSelectedLog] = useState(null);

    useEffect(() => {
        const logsRef = ref(database, 'system_logs');
        const unsubscribe = onValue(logsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const loadedLogs = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Sort by newest first
                setLogs(loadedLogs.sort((a, b) => b.timestamp - a.timestamp));
            } else {
                setLogs([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const filteredLogs = logs.filter(log =>
        log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.adminEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityIdentifier?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="p-8 text-center text-gray-500 animate-pulse">Loading system logs...</div>;
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="text-cyan-500" />
                    System Logs Activity
                </h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 pl-10 text-sm text-white focus:border-cyan-500/50 outline-none w-64 transition-all"
                    />
                    <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                </div>
            </div>

            {/* Logs List */}
            <div className="flex-1 overflow-y-auto bg-[#0f0f16]/90 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl custom-scrollbar">
                <div className="p-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-[#0a0a0f] z-10 text-xs font-mono text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="p-4 border-b border-white/5">Date / Time</th>
                                <th className="p-4 border-b border-white/5">Administrator</th>
                                <th className="p-4 border-b border-white/5">Action Performed</th>
                                <th className="p-4 border-b border-white/5">Target Entity</th>
                                <th className="p-4 border-b border-white/5 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 mx-2">
                            {filteredLogs.length > 0 ? (
                                filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4 text-sm text-gray-400 font-mono">
                                            <div className="flex items-center gap-2">
                                                <Clock size={12} className="text-gray-600" />
                                                {new Date(log.timestamp).toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <User size={14} className="text-gray-500" />
                                                <span className="text-xs">{log.adminEmail}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                                log.action.includes('Deleted') || log.action.includes('Rejected')
                                                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                : log.action.includes('Approved') || log.action.includes('Updated')
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                                            }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-white font-medium text-sm">{log.entityIdentifier}</div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{log.entityType}</div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => setSelectedLog(log)}
                                                className="inline-flex items-center gap-2 p-2 px-3 text-xs bg-white/5 hover:bg-white/10 text-cyan-400 rounded-lg transition-colors border border-white/10 hover:border-cyan-500/30 font-medium"
                                                title="View Full Payload"
                                            >
                                                <Eye size={14} /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No system logs found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Log Details Modal */}
            {selectedLog && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0f0f16] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0a0f]">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Database className="text-cyan-500" />
                                    System Log Detail
                                </h3>
                                <div className="text-xs text-gray-500 font-mono mt-2 flex items-center gap-4">
                                    <span>ID: {selectedLog.id}</span>
                                    <span>TIMESTAMP: {selectedLog.timestamp}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedLog(null)}
                                className="text-gray-500 hover:text-white transition-colors p-2"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-black/40 p-5 rounded-xl border border-white/5">
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">ADMINISTRATOR</p>
                                    <p className="text-white text-sm font-medium truncate">{selectedLog.adminEmail}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">ACTION</p>
                                    <p className="text-cyan-400 text-sm font-medium">{selectedLog.action}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">ENTITY TYPE</p>
                                    <p className="text-white text-sm font-medium">{selectedLog.entityType}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-mono text-gray-500 mb-1">TARGET IDENTIFIER</p>
                                    <p className="text-white text-sm font-medium truncate">{selectedLog.entityIdentifier}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-mono text-gray-500 mb-3 tracking-wider">PAYLOAD DATA SNAPSHOT</h4>
                                <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-4 overflow-x-auto relative group">
                                    <pre className="text-[11px] text-green-400 font-mono leading-relaxed whitespace-pre-wrap">
                                        {JSON.stringify(selectedLog.details, null, 2)}
                                    </pre>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SystemLogsManager;
