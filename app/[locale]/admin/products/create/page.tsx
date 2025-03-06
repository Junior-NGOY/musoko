
import Link from "next/link";

import { Metadata } from "next";
//import Product from "../product";
import ProductForm from "../product-form";

export const metadata: Metadata = {
  title: "Create Product"
};

const CreateProductPage = () => {

 /*  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrl = await uploadRequest.json();
      setUrl(ipfsUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  }; */

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="flex mb-4">
        <Link href="/admin/products">Products</Link>
        <span className="mx-1">›</span>
        <Link href="/admin/products/create">Create</Link>
      </div>

      <div className="my-8">
     
      </div>
      <div className="my-8">
        <ProductForm type="Create" /> 
      </div>
    </main>
  );
};

export default CreateProductPage;
