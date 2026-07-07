// "use client";

// import {
//   Building2,
//   MapPin,
//   Calendar,
//   IndianRupee,
//   CheckCircle2,
//   FileText,
//   User,
//   ClipboardList,
//   FileSpreadsheet,
//   Clock,
//   Briefcase
// } from "lucide-react";

// interface Props {
//   project: any;
// }

// export default function ProjectInformation({ project }: Props) {
//   if (!project) return null;

//   return (
//     <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-xs">
      
//       {/* Decorative Crane/Construction Watermark Image Alignment Background */}
//       <div 
//         className="absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.04] pointer-events-none mix-blend-multiply bg-right bg-no-repeat"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='currentColor' stroke-width='0.5'%3E%3Cpath d='M20 95 L20 40 L5 55 M20 45 L85 25 L20 40 M20 30 L85 25 M35 36 L35 95 M55 31 L55 95 M75 27 L75 60' /%3E%3Crect x='65' y='60' width='15' height='35' rx='1' /%3E%3Crect x='45' y='70' width='12' height='25' rx='1' /%3E%3C/svg%3E")`,
//           backgroundSize: 'contain'
//         }}
//       />

//       {/* Main Header */}
//       <div className="flex items-center gap-3">
//         <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
//           <Building2 size={22} className="stroke-[2.5]" />
//         </div>
//         <div>
//           <h2 className="text-lg font-bold text-slate-950">Project Information</h2>
//           <p className="text-xs text-slate-500">Basic information about the selected project</p>
//         </div>
//       </div>

//       {/* Rows Container */}
//       <div className="mt-6 border border-slate-100 rounded-xl overflow-hidden bg-slate-50/20">
        
//         {/* Top Row: Primary Project Attributes */}
//         <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 p-4 pb-5 gap-y-4 md:gap-y-0">
          
//           {/* Project Name */}
//           <div className="flex items-start gap-3 md:px-2">
//             <div className="mt-0.5 rounded-full bg-blue-50 p-2 text-blue-600">
//               <Briefcase size={16} />
//             </div>
//             <div>
//               <span className="text-[11px] font-medium text-slate-400 block tracking-wide">Project Name</span>
//               <span className="text-sm font-bold text-slate-900 mt-0.5 block uppercase">
//                 {project.project_name || project.name || "—"}
//               </span>
//             </div>
//           </div>

//           {/* Client Name */}
//           <div className="flex items-start gap-3 md:px-4">
//             <div className="mt-0.5 rounded-full bg-indigo-50 p-2 text-indigo-600">
//               <User size={16} />
//             </div>
//             <div>
//               <span className="text-[11px] font-medium text-slate-400 block tracking-wide">Client</span>
//               <span className="text-sm font-bold text-blue-600 mt-0.5 block uppercase cursor-pointer hover:underline">
//                 {project.client_name || "—"}
//               </span>
//             </div>
//           </div>

//           {/* Location */}
//           <div className="flex items-start gap-3 md:px-4 md:col-span-1">
//             <div className="mt-0.5 rounded-full bg-slate-100 p-2 text-slate-600">
//               <MapPin size={16} />
//             </div>
//             <div>
//               <span className="text-[11px] font-medium text-slate-400 block tracking-wide">Location</span>
//               <span className="text-sm font-bold text-slate-800 mt-0.5 block uppercase">
//                 {project.location || "—"}
//               </span>
//             </div>
//           </div>

//           {/* Status Badge */}
//           <div className="flex items-start justify-between md:justify-start gap-3 md:px-4">
//             <div className="flex items-start gap-3">
//               <div className="mt-0.5 rounded-full bg-emerald-50 p-2 text-emerald-600">
//                 <CheckCircle2 size={16} />
//               </div>
//               <div>
//                 <span className="text-[11px] font-medium text-slate-400 block tracking-wide">Status</span>
//                 <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/40 mt-1">
//                   {project.status || "Active"}
//                 </span>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Bottom Row: Key Metrics & Financial Indicators */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-t border-slate-100 divide-x divide-y sm:divide-y-0 divide-slate-100 bg-white p-4">
          
//           {/* Contract Value */}
//           <div className="flex items-center gap-3 p-2">
//             <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
//               <IndianRupee size={15} />
//             </div>
//             <div>
//               <span className="text-[11px] font-medium text-slate-400 block">Contract Value</span>
//               <span className="text-sm font-bold text-emerald-600">
//                 ₹ {Number(project.contract_value ?? 190).toLocaleString("en-IN")}
//               </span>
//             </div>
//           </div>

//           {/* Work Order No. */}
//           <div className="flex items-center gap-3 p-2">
//             <div className="rounded-full bg-slate-50 p-2 text-slate-500">
//               <ClipboardList size={15} />
//             </div>
//             <div>
//               <span className="text-[11px] font-medium text-slate-400 block">Work Order No.</span>
//               <span className="text-sm font-bold text-slate-800">
//                 {project.work_order_no || "—"}
//               </span>
//             </div>
//           </div>

//           {/* Start Date */}
//           <div className="flex items-center gap-3 p-2">
//             <div className="rounded-full bg-slate-50 p-2 text-slate-500">
//               <Calendar size={15} />
//             </div>
//             <div>
//               <span className="text-[11px] font-medium text-slate-400 block">Start Date</span>
//               <span className="text-sm font-bold text-slate-800">
//                 {project.start_date || "—"}
//               </span>
//             </div>
//           </div>

//           {/* End Date */}
//           <div className="flex items-center gap-3 p-2">
//             <div className="rounded-full bg-slate-50 p-2 text-slate-500">
//               <Clock size={15} />
//             </div>
//             <div>
//               <span className="text-[11px] font-medium text-slate-400 block">End Date</span>
//               <span className="text-sm font-bold text-slate-800">
//                 {project.end_date || "—"}
//               </span>
//             </div>
//           </div>

//           {/* BOQ Items */}
//           <div className="flex items-center gap-3 p-2 col-span-2 sm:col-span-1">
//             <div className="rounded-full bg-slate-50 p-2 text-slate-500">
//               <FileSpreadsheet size={15} />
//             </div>
//             <div>
//               <span className="text-[11px] font-medium text-slate-400 block">BOQ Items</span>
//               <span className="text-sm font-bold text-slate-800">
//                 {project.total_items ?? "—"}
//               </span>
//             </div>
//           </div>

//         </div>

//       </div>

//       {/* Description Section */}
//       <div className="mt-5 space-y-1">
//         <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
//           <FileText size={13} />
//           Project Description
//         </span>
//         <p className="text-xs text-slate-600 leading-relaxed pl-1">
//           {project.description || "No project description available."}
//         </p>
//       </div>

//     </div>
//   );
// }