import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * GET /api/preview?slug=/service/divorce-lawyer
 *
 * Enables Next.js draft mode for the current browser session, then redirects
 * to the requested page so it renders against unpublished Payload drafts.
 * Auth is enforced via Payload's session cookie — only signed-in admin/editor
 * users can hit this endpoint.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "/";

  const payload = await getPayload({ config });
  const { user } = await payload.auth({
    headers: request.headers,
  });

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(slug);
}
