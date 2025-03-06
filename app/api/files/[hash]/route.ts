import { NextResponse } from "next/server";
import { pinata } from "@/utils/config";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ hash: string }> }
) {
  try {
    const { hash } = await params;

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
}

/* export async function DELETE(
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