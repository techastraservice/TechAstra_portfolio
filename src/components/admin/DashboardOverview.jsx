import React, { useMemo, useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useTeam } from '../../context/TeamContext';
import { database } from '../../firebaseConfig';
import { ref, onValue } from "firebase/database";
import { Users, FolderKanban, Eye, ShieldCheck, Code, Layers } from 'lucide-react';
import {
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const DashboardOverview = () => {
    const { projects, totalVisits } = useProjects();
    const { teamMembers } = useTeam();
    const [clients, setClients] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    // Fetch clients and connection status from Firebase
    useEffect(() => {
        // Fetch clients
        const clientsRef = ref(database, 'clients');
        const unsubsClients = onValue(clientsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setClients(Object.keys(data).map(key => ({ id: key, ...data[key] })));
            } else {
                setClients([]);
            }
        });

        // Fetch firebase connection status
        const connectedRef = ref(database, '.info/connected');
        const unsubsConnection = onValue(connectedRef, (snap) => {
            setIsConnected(snap.val() === true);
        });

        return () => {
            unsubsClients();
            unsubsConnection();
        };
    }, []);

    // 1. REAL TIME: Category distribution for bar chart
    const categoryData = useMemo(() => {
        const categoryMap = {};
        projects.forEach(p => {
            const cat = p.category || 'Uncategorized';
            categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });
        return Object.entries(categoryMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [projects]);

    // 2. REAL TIME: Pie chart data for team roles
    const roleData = useMemo(() => {
        const roleMap = {};
        teamMembers.forEach(m => {
            const role = m.role || 'Member';
            roleMap[role] = (roleMap[role] || 0) + 1;
        });
        return Object.entries(roleMap)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [teamMembers]);

    // 3. REAL TIME: Client Agreement Status Pipeline
    const clientStatusData = useMemo(() => {
        const statusMap = { 'Pending': 0, 'Approved': 0, 'Rejected': 0 };
        clients.forEach(c => {
            const status = c.status || 'Pending';
            if (statusMap[status] !== undefined) {
                statusMap[status]++;
            } else {
                statusMap[status] = 1;
            }
        });
        return Object.entries(statusMap)
            .filter(([_, count]) => count > 0)
            .map(([name, value]) => ({ name, value }));
    }, [clients]);

    // 4. REAL TIME: Revenue Pipeline (Top 5 largest contracts)
    const revenueData = useMemo(() => {
        return [...clients]
            .filter(c => c.price && !isNaN(Number(c.price)))
            .map(c => ({
                name: c.clientName || 'Unknown',
                value: Number(c.price),
                status: c.status || 'Pending'
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // top 5
    }, [clients]);

    // 3. REAL TIME: Tech Stack Usage from projects
    const techData = useMemo(() => {
        const techMap = {};
        projects.forEach(p => {
            if (Array.isArray(p.tech)) {
                p.tech.forEach(t => {
                    const techName = t.trim();
                    if (techName) {
                        techMap[techName] = (techMap[techName] || 0) + 1;
                    }
                });
            }
        });
        // Get top 8 technologies to keep the chart clean
        return Object.entries(techMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8);
    }, [projects]);

    const PIE_COLORS = ['#06b6d4', '#a855f7', '#eab308', '#10b981', '#f43f5e', '#3b82f6', '#f97316'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0f0f16] border border-white/10 rounded-lg px-4 py-3 shadow-xl z-50">
                    <p className="text-xs font-mono text-gray-400 mb-1">{label}</p>
                    {payload.map((entry, i) => (
                        <p key={i} className="text-sm font-bold" style={{ color: entry.color || entry.fill }}>
                            {entry.name}: {entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                    icon={<FolderKanban className="w-6 h-6" />}
                    label="TOTAL PROJECTS"
                    value={projects.length}
                    badge="ACTIVE"
                    color="cyan"
                />
                <StatCard
                    icon={<Eye className="w-6 h-6" />}
                    label="TOTAL VIEWS"
                    value={totalVisits ? totalVisits.toLocaleString() : '0'}
                    badge="LIVE"
                    color="purple"
                />
                <StatCard
                    icon={<Users className="w-6 h-6" />}
                    label="TOTAL CLIENTS"
                    value={clients.length}
                    badge="DB RECORDS"
                    color="yellow"
                />
                <StatCard
                    icon={<ShieldCheck className="w-6 h-6" />}
                    label="DB CONNECTION"
                    value={isConnected ? "ONLINE" : "WAITING"}
                    badge={isConnected ? "SECURE" : "CONNECTING"}
                    color={isConnected ? "green" : "red"}
                />
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Bar Chart - Real-Time Project Categories */}
                <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-6">
                        <Layers className="w-5 h-5 text-cyan-400" />
                        Project Categories
                    </h3>
                    
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={categoryData} barSize={40}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#a855f7" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} name="Projects" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[250px] flex items-center justify-center text-gray-500 text-sm border border-dashed border-white/5 rounded-lg">
                            No project category data available
                        </div>
                    )}
                </div>

                {/* Bar Chart - Real-Time Tech Stack Distribution */}
                <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-6">
                        <Code className="w-5 h-5 text-purple-400" />
                        Top Technologies Used
                    </h3>
                    {techData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={techData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                                <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.02)'}} />
                                <Bar dataKey="count" fill="#a855f7" radius={[0, 4, 4, 0]} name="Projects Using" barSize={16}>
                                    {techData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[250px] flex items-center justify-center text-gray-500 text-sm border border-dashed border-white/5 rounded-lg">
                            No technology stack data available
                        </div>
                    )}
                </div>

                {/* Pie Chart - Real-Time Team Composition */}
                <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-6">
                        <Users className="w-5 h-5 text-yellow-500" />
                        Team Composition
                    </h3>
                    {roleData.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={roleData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {roleData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex flex-wrap justify-center gap-4 mt-2">
                                {roleData.map((entry, i) => (
                                    <span key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}></span>
                                        {entry.name} ({entry.value})
                                    </span>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-[250px] flex items-center justify-center text-gray-500 text-sm border border-dashed border-white/5 rounded-lg mt-4">
                            No team member data available
                        </div>
                    )}
                </div>

                {/* Pie Chart - Agreement Pipeline Status */}
                <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-6">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                        Agreement Pipeline
                    </h3>
                    {clientStatusData.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={clientStatusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {clientStatusData.map((entry, index) => {
                                            const color = entry.name === 'Approved' ? '#10b981' : entry.name === 'Rejected' ? '#f43f5e' : '#eab308';
                                            return <Cell key={`cell-${index}`} fill={color} />;
                                        })}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex flex-wrap justify-center gap-4 mt-2">
                                {clientStatusData.map((entry, i) => {
                                    const color = entry.name === 'Approved' ? '#10b981' : entry.name === 'Rejected' ? '#f43f5e' : '#eab308';
                                    return (
                                        <span key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
                                            {entry.name} ({entry.value})
                                        </span>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="h-[250px] flex items-center justify-center text-gray-500 text-sm border border-dashed border-white/5 rounded-lg mt-4">
                            No agreement data available
                        </div>
                    )}
                </div>

                {/* Bar Chart - Revenue Pipeline */}
                <div className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 relative overflow-hidden md:col-span-2">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-6">
                        <FolderKanban className="w-5 h-5 text-blue-500" />
                        Top Active Contracts (Revenue Pipeline)
                    </h3>
                    {revenueData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={revenueData} margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.02)'}} />
                                <Bar dataKey="value" name="Contract Value (₹)" radius={[4, 4, 0, 0]} barSize={40}>
                                    {revenueData.map((entry, index) => {
                                         const color = entry.status === 'Approved' ? '#10b981' : entry.status === 'Rejected' ? '#4b5563' : '#3b82f6';
                                         return <Cell key={`cell-${index}`} fill={color} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[250px] flex items-center justify-center text-gray-500 text-sm border border-dashed border-white/5 rounded-lg">
                            Price data not available for tracked projects
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};



// Reusable stat card component
const StatCard = ({ icon, label, value, badge, color }) => {
    const colorClasses = {
        cyan: 'text-cyan-500',
        purple: 'text-purple-500',
        yellow: 'text-yellow-500',
        green: 'text-green-500',
    };
    return (
        <div className="bg-[#0f0f16] border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-white/10 transition-all">
            <div className={`absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity ${colorClasses[color]}`}>
                {React.cloneElement(icon, { className: 'w-14 h-14' })}
            </div>
            <div className="text-gray-400 text-xs font-mono tracking-widest mb-2">{label}</div>
            <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                {value}
                <span className="text-xs text-green-500 font-mono">{badge}</span>
            </div>
        </div>
    );
};

export default DashboardOverview;
