// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   LayoutDashboard, 
//   Users, 
//   Settings, 
//   BarChart3, 
//   Bell, 
//   Search,
//   Menu
// } from 'lucide-react';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('Overview');

//   // Animation variants for the "Slide from Top" effect
//   const pageVariants = {
//     initial: { opacity: 0, y: -50 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
//   };

//   const stats = [
//     { label: 'Total Revenue', value: '$54,230', change: '+12.5%' },
//     { label: 'Active Users', value: '1,240', change: '+3.2%' },
//     { label: 'New Signups', value: '48', change: '+18%' },
//     { label: 'Retention', value: '98.2%', change: '+0.4%' },
//   ];

//   return (
//     <motion.div 
//       variants={pageVariants}
//       initial="initial"
//       animate="animate"
//       className="min-h-screen bg-slate-50 flex"
//     >
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
//         <div className="p-6">
//           <h1 className="text-2xl font-bold text-teal-600 tracking-tight">Vortex Admin</h1>
//         </div>
//         <nav className="flex-1 px-4 space-y-2">
//           {[
//             { name: 'Overview', icon: <LayoutDashboard size={20} /> },
//             { name: 'Analytics', icon: <BarChart3 size={20} /> },
//             { name: 'Customers', icon: <Users size={20} /> },
//             { name: 'Settings', icon: <Settings size={20} /> },
//           ].map((item) => (
//             <button
//               key={item.name}
//               onClick={() => setActiveTab(item.name)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                 activeTab === item.name 
//                 ? 'bg-teal-50 text-teal-700 font-medium' 
//                 : 'text-slate-500 hover:bg-slate-50'
//               }`}
//             >
//               {item.icon}
//               {item.name}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col">
//         {/* Top Header */}
//         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
//           <div className="relative w-96">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input 
//               type="text" 
//               placeholder="Search data..." 
//               className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
//             />
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
//               <Bell size={22} />
//             </button>
//             <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
//               JD
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Grid */}
//         <div className="p-8">
//           <header className="mb-8">
//             <h2 className="text-2xl font-bold text-slate-800">{activeTab}</h2>
//             <p className="text-slate-500">Welcome back, here's what's happening today.</p>
//           </header>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {stats.map((stat, idx) => (
//               <motion.div 
//                 key={idx}
//                 whileHover={{ y: -5 }}
//                 className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
//               >
//                 <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
//                 <div className="flex items-end justify-between">
//                   <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
//                   <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded">
//                     {stat.change}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Table Placeholder */}
//           <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
//             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
//               <h3 className="font-bold text-slate-800">Recent Transactions</h3>
//               <button className="text-sm text-teal-600 font-semibold hover:underline">View All</button>
//             </div>
//             <div className="h-64 flex items-center justify-center text-slate-400 italic">
//               Table data content would render here...
//             </div>
//           </div>
//         </div>
//       </main>
//     </motion.div>
//   );
// };

// export default AdminDashboard;

































import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3, 
  Bell, 
  Search
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const stats = [
    { label: 'Total Revenue', value: '$54,230', change: '+12.5%' },
    { label: 'Active Users', value: users.length, change: '+3.2%' },
    { label: 'New Signups', value: '48', change: '+18%' },
    { label: 'Retention', value: '98.2%', change: '+0.4%' },
  ];

  // 🔥 FETCH USERS WHEN CUSTOMERS TAB IS OPEN
  useEffect(() => {
    if (activeTab === "Customers") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);

      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setUsers(data);

    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-slate-50 flex"
    >
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-teal-600 tracking-tight">
           Admin-Dashboard
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {[
            { name: 'Overview', icon: <LayoutDashboard size={20} /> },
            { name: 'Analytics', icon: <BarChart3 size={20} /> },
            { name: 'Customers', icon: <Users size={20} /> },
            { name: 'Settings', icon: <Settings size={20} /> },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.name 
                ? 'bg-teal-50 text-teal-700 font-medium' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search data..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-teal-600">
              <Bell size={22} />
            </button>
            <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">{activeTab}</h2>
            <p className="text-slate-500">
              Welcome back, here's what's happening today.
            </p>
          </header>

          {/* STATS */}
          {activeTab === "Overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl border shadow-sm"
                >
                  <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* USERS TABLE */}
          {activeTab === "Customers" && (
            <div className="bg-white border rounded-xl overflow-hidden">
              <div className="p-6 border-b font-bold text-slate-800">
                Registered Users
              </div>

              {loadingUsers ? (
                <div className="p-6 text-center text-slate-400">
                  Loading users...
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} className="border-t">
                        <td className="px-6 py-3">{user.name}</td>
                        <td className="px-6 py-3">{user.email}</td>
                        <td className="px-6 py-3 capitalize">{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default AdminDashboard;
