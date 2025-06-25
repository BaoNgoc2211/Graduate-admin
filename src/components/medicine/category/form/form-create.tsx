// "use client";
// import { createMedCategoryAPI } from "@/api/medicine/category.api";
// import { Button } from "@/components/ui/button";
// import { useMutation } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// const Form = () => {
//   // const [categoryName, setCategoryName] = useState("");

//   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   setCategoryName(e.target.value);
//   // };

//   const router = useRouter();
//   const [createMedCate, setCreateMedCate] = useState({
//     name: "",
//     icon: "",
//   });
//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCreateMedCate((prev) => ({
//       ...prev,
//       name: e.target.value,
//     }));
//   };
//   const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCreateMedCate((prev) => ({
//       ...prev,
//       icon: e.target.value,
//     }));
//   };
//   const mutation = useMutation({
//     mutationKey: [`create-medicine-category`],
//     mutationFn: () => createMedCategoryAPI(createMedCate),
//     onSuccess: () => {
//       toast.success("Medicine category created successfully!");
//       router.push("/verify-email"); // Chỉnh route theo nhu cầu
//     },
//     onError: (error: any) => {
//       toast.error(`Error: ${error.message || "Something went wrong"}`);
//     },
//   });
//   const handleSubmit = () => {
//     if (!createMedCate.name) {
//       toast.error("Category name is required");
//       return;
//     }
//     mutation.mutate();
//   };
//   console.log(createMedCate);
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
//             value={createMedCate.name}
//             onChange={handleNameChange}
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
//               value={createMedCate.icon}
//               onChange={handleIconChange}
//             />
//           </div>
//           <div className="flex items-center justify-center md:w-1/3">
//             <img
//               src="/image/icon/upload_icon.png"
//               alt="Upload"
//               className="w-6 h-6 cursor-pointer"
//             />
//           </div>
//         </div>
//         <Button onClick={handleSubmit} disabled={mutation.isPending}>
//           {mutation.isPending ? "Creating..." : "Create New"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Form;
