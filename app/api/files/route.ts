import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config"

/* export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.file(file)
    const url = await pinata.gateways.convert(uploadData.IpfsHash)
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} */

  export async function POST(request: NextRequest) {
    try {
      const data = await request.formData();
      const file: File | null = data.get("file") as unknown as File;
  
      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }
  
      const uploadData = await pinata.upload.file(file);
      const url = await pinata.gateways.convert(uploadData.IpfsHash);
  
      return NextResponse.json({
        success: true,
        url: url,
        hash: uploadData.IpfsHash
      }, { status: 200 });
  
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }


 
  
 /*  export async function DELETE(
    request: Request,
    { params }: { params: { hash: string } }
  ) {
    try {
      const hash = params.hash;
  
      if (!hash) {
        return NextResponse.json(
          { error: "Hash not provided" },
          { status: 400 }
        );
      }
  
      await pinata.unpin([hash]);
  
      return NextResponse.json({ 
        success: true,
        message: "File successfully deleted" 
      });
  
    } catch (error) {
      console.error("Delete error:", error);
      return NextResponse.json(
        { 
          success: false,
          error: "Failed to delete file from Pinata" 
        },
        { status: 500 }
      );
    }
  } */