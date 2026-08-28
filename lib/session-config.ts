/**
 * Single source of truth for how long an idle session survives.
 *
 * Configure with SESSION_IDLE_TIMEOUT_MINUTES (defaults to 15). The value is
 * read at runtime on the server, so it can differ per environment without a
 * rebuild. The client-side idle watcher receives it as a prop rather than via
 * a NEXT_PUBLIC_* variable — those are inlined at build time and would freeze
 * the value into the deployed artifact.
 *
 * Both the NextAuth session (lib/auth.ts) and the token-refresh cookie rewrite
 * (app/_lib/user-token-service.js) must use this, otherwise a refresh silently
 * re-extends the session past the idle timeout.
 */

const DEFAULT_IDLE_TIMEOUT_MINUTES = 15;

export function sessionIdleTimeoutMinutes(): number {
  const parsed = Number(process.env.SESSION_IDLE_TIMEOUT_MINUTES);

  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_IDLE_TIMEOUT_MINUTES;
}

export function sessionIdleTimeoutSeconds(): number {
  return Math.round(sessionIdleTimeoutMinutes() * 60);
}

/**
 * How often NextAuth re-issues the JWT while the user is active. Kept to a
 * third of the idle window so the expiry is refreshed well before it lapses,
 * without re-signing the token on every request.
 */
export function sessionUpdateAgeSeconds(): number {
  return Math.max(60, Math.floor(sessionIdleTimeoutSeconds() / 3));
}
