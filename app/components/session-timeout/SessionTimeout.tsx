"use client";

import { useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";

/**
 * Signs the user out after a period with no interaction.
 *
 * The authoritative timeout is the NextAuth session maxAge (lib/auth.ts) — the
 * JWT expires server-side whether or not this component runs. This exists so an
 * abandoned browser is visibly returned to the sign-in page instead of sitting
 * on a logged-in-looking screen until the next request.
 *
 * Calling signOut() also triggers the signOut event in lib/auth.ts, which
 * revokes the Liferay access and refresh tokens — so an idle timeout kills the
 * underlying grant, not just the browser cookie.
 *
 * timeoutMinutes is passed from the server (see app/layout.tsx) so the value
 * stays configurable per environment via SESSION_IDLE_TIMEOUT_MINUTES.
 */
export default function SessionTimeout({
  timeoutMinutes,
}: {
  timeoutMinutes: number;
}) {
  const { status } = useSession();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    const idleMs = timeoutMinutes * 60 * 1000;

    const clear = () => {
      if (timer.current) clearTimeout(timer.current);
    };

    const reset = () => {
      clear();
      timer.current = setTimeout(() => {
        void signOut({ callbackUrl: "/sign-in?reason=timeout" });
      }, idleMs);
    };

    const events = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "visibilitychange",
    ];

    events.forEach((event) =>
      window.addEventListener(event, reset, { passive: true })
    );
    reset();

    return () => {
      events.forEach((event) => window.removeEventListener(event, reset));
      clear();
    };
  }, [status, timeoutMinutes]);

  return null;
}
