import { myfxbookLogin } from "@/lib/myfxbook";

export async function GET() {
  try {
    const session = await myfxbookLogin();

    return Response.json({
      success: true,
      session,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}