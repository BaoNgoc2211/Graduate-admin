// "use client";

// import { Button } from "@/components/ui/button";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import React, { useState } from "react";

// const FormUpdate = () => {
//   const params = useParams();
//   const [updateMedCate, setUpdateMedCate] = useState({
//     name: "",
//     icon: "",
//   });
//   const id = params?.id as string;
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["medicine-detail", id],
//     queryFn: () => getMedCategoryAPI(id),
//   });

//   console.log("Detail", data);
//   if (isLoading) return "isLoading...";
//   if (isError) return "Fetching data error";
//   return (
//     <div className="bg-white border border-gray-300 p-5 max-w-xl mx-auto space-x-2">
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center border border-gray-300  p-2 gap-2">
//           <label htmlFor="categoryName1" className="font-semibold">
//             Category Name:
//           </label>
//           <input
//             id="categoryName1"
//             type="text"
//             placeholder="Enter category name"
//             className="flex-1 rounded px-2 py-1"
//             value={updateMedCate.name}
//             // onChange={handleInputChange}
//           />
//         </div>

//         <div className="flex flex-col md:flex-row border border-gray-300 p-2 gap-2">
//           <div className="flex items-center flex-1">
//             <label htmlFor="categoryName2" className="font-semibold mr-2">
//               Icon:
//             </label>
//             <input
//               id="categoryName2"
//               type="text"
//               placeholder="Upload icon"
//               className="flex-1 rounded px-2 py-1"
//             />
//           </div>
//           <div className="flex items-center justify-center md:w-1/3">
//             <img
//               src="/image/icon/upload_icon.png"
//               alt="Upload"
//               className="w-6 h-6 cursor-pointer"
//               // value={updateMedCate.icon}
//             />
//           </div>
//         </div>
//         <Button>Create New</Button>
//       </div>
//     </div>
//   );
// };

// export default FormUpdate;
