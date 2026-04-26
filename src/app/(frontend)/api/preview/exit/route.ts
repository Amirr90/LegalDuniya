import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Disables draft mode for the current browser session. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "/";
  const draft = await draftMode();
  draft.disable();
  redirect(slug);
}
