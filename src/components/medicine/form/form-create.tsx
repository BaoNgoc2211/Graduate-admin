// import { useState } from "react";
"use client";
import { useState } from "react";
// import { assets } from "../assets/assets";
// import ButtonComponent from "../components/button";
import SelectComponent from "@/components/ui/select";
import { Link } from "react-router-dom";
import Button04 from "@/components/ui/button-04";
import Input04 from "@/components/ui/input-04";

const Add = () => {
  const [addProduct, setAddProduct] = useState({
    name: "",
    thumbnail: "",
    price: 0,
    badge: "",
    status: "",
    category: "",
    description: "",
    shape: "",
  });
  console.log(addProduct);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [badge, setBadge] = useState("");
  const categoryOptions = [
    { value: "Furniture", label: "Furniture" },
    { value: "Outdoor", label: "Outdoor" },
    { value: "Decor & Mirror", label: "Decor & Mirror" },
    { value: "Lighting", label: "Lighting" },
    { value: "Rugs", label: "Rugs" },
    { value: "Pillows & Throws", label: "Pillows & Throws" },
    { value: "Bedding & Bath", label: "Bedding & Bath" },
    { value: "Tabletop & Bar", label: "Tabletop & Bar" },
  ];
  const statusOptions = [
    { value: "Available", label: "Available" },
    { value: "Out of Stock", label: "Out of Stock" },
    { value: "Discontinued", label: "Discontinued" },
  ];
  const badgeOptions = [
    { value: "Best Seller", label: "Best Seller" },
    { value: "Limited Edition", label: "Limited Edition" },
    { value: "standard", label: "standard" },
  ];
  return (
    <form className="flex flex-col w-full items-start gap-3">
      <div className="flex flex-row px-3 py-2  gap-6 sm:flex-gap-1">
        {/* Thumbnail */}
        <div>
          <p className="mb-2">Upload Image Thumbnail</p>
          <div className="flex gap 2 ">
            <label htmlFor="image1">
              {/* <img className="w-40" src={assets.upload_area} alt="" /> */}
              <img className="w-40" src="image/icon/upload_icon.png" alt="" />
              <input type="file" id="image1" hidden />
            </label>
          </div>
        </div>
        {/* Info */}
        <div className="flex flex-col">
          <Input04
            label="Product name"
            placeholder="Type here"
            type="text"
            value={addProduct.name}
            onChange={(text) =>
              setAddProduct({ ...addProduct, name: text.target.value })
            }
          />
          <Input04
            label="Product description"
            placeholder="Write content"
            type="text"
            value={addProduct.description}
            onChange={(text) =>
              setAddProduct({ ...addProduct, description: text.target.value })
            }
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <SelectComponent
            label="Product Category"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
          />
        </div>
        <div>
          <SelectComponent
            label="Product Status"
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="price"
          />
        </div>
        <div>
          <SelectComponent
            label="Badge"
            options={badgeOptions}
            value={badge}
            onChange={setBadge}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8"></div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">
              up to 10 inches
            </p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">
              10 to 20 inches
            </p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">
              20 to 30 inches
            </p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">
              30 to 40 inches
            </p>
          </div>
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">
              40 to 50 inches
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input type="checkbox" id="bestseller" />
        <Link to="/variant" className="cursor-pointer">
          Add to Variant
        </Link>
      </div>
      <Button04 name="ADD" />
    </form>
  );
};

export default Add;
