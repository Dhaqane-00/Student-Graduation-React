// import React from "react";
// import { Link } from "react-router-dom";
// import Icons from "../../components/Icon/icon";
// import Card from "../../components/Card/card";

// // import images
// import profile from 'assets/profile/profile.jpg';

// const Profile: React.FC = () => {
//   return (
//     <div className="space-y-5 profile-page bg-gray-100 dark:bg-slate-900 min-h-screen p-6">
//       <div className="profile-wrap p-10 rounded-lg bg-white dark:bg-slate-800 flex flex-col lg:flex-row lg:space-y-0 space-y-6 justify-between items-center relative z-[1]">
//         <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 h-40 w-full z-[-1] rounded-t-lg"></div>
//         <div className="profile-box flex-none text-center lg:text-left">
//           <div className="flex items-center space-x-6 rtl:space-x-reverse">
//             <div className="flex-none">
//               <div className="h-[120px] w-[120px] rounded-full ring-4 ring-slate-100 relative">
//                 <img
//                   src={profile}
//                   alt="Profile"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//                 <Link
//                   to="#"
//                   className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex items-center justify-center top-[90px]"
//                 >
//                   <Icons icon="heroicons:pencil-square" />
//                 </Link>
//               </div>
//             </div>
//             <div className="flex-1">
//               <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-1">
//                 Albert Flores
//               </div>
//               <div className="text-sm font-light text-slate-600 dark:text-slate-400">
//                 Front End Developer
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="profile-info flex flex-wrap justify-around lg:justify-between lg:flex-1 text-center lg:text-left space-y-4 lg:space-y-0 max-w-[516px]">
//           <div className="flex-1">
//             <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
//               $32,400
//             </div>
//             <div className="text-sm text-slate-600 font-light dark:text-slate-300">
//               Total Balance
//             </div>
//           </div>
//           <div className="flex-1">
//             <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
//               200
//             </div>
//             <div className="text-sm text-slate-600 font-light dark:text-slate-300">
//               Board Card
//             </div>
//           </div>
//           <div className="flex-1">
//             <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
//               3200
//             </div>
//             <div className="text-sm text-slate-600 font-light dark:text-slate-300">
//               Calendar Events
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="grid grid-cols-12 gap-6">
//         <div className="lg:col-span-4 col-span-12">
//           <Card title="Info" className="h-full">
//             <ul className="list space-y-8">
//               <li className="flex space-x-3 rtl:space-x-reverse">
//                 <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
//                   <Icons icon="heroicons:envelope" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
//                     EMAIL
//                   </div>
//                   <a
//                     href="mailto:someone@example.com"
//                     className="text-base text-slate-600 dark:text-slate-50"
//                   >
//                     info-500@dashcode.com
//                   </a>
//                 </div>
//               </li>
//               <li className="flex space-x-3 rtl:space-x-reverse">
//                 <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
//                   <Icons icon="heroicons:phone-arrow-up-right" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
//                     PHONE
//                   </div>
//                   <a
//                     href="tel:0189749676767"
//                     className="text-base text-slate-600 dark:text-slate-50"
//                   >
//                     +1-202-555-0151
//                   </a>
//                 </div>
//               </li>
//               <li className="flex space-x-3 rtl:space-x-reverse">
//                 <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
//                   <Icons icon="heroicons:map" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
//                     LOCATION
//                   </div>
//                   <div className="text-base text-slate-600 dark:text-slate-50">
//                     Home# 320/N, Road# 71/B, Mohakhali, Dhaka-1207, Bangladesh
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </Card>
//         </div>




//       </div>
//     </div>
//   );
// };

// export default Profile;
