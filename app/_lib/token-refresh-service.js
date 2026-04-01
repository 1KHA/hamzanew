// Global cache that persists across server requests
const globalTokenCache =
  globalThis.__tokenCache ||
  (globalThis.__tokenCache = {
    token: null,
    refreshPromise: null, // Promise for ongoing token refresh
    isRefreshing: false, // Flag to prevent concurrent refreshes
    lastFetchError: null, // Track last fetch error to prevent infinite retries
    fetchFailureCount: 0, // Count consecutive fetch failures
  });

const MAX_CONSECUTIVE_FAILURES = 3;
const FAILURE_RESET_TIMEOUT = 30000; // 30 seconds

export const getAccessToken = async function name() {
  // Check if we've had too many consecutive failures
  if (
    globalTokenCache.fetchFailureCount >= MAX_CONSECUTIVE_FAILURES &&
    globalTokenCache.lastFetchError
  ) {
    const timeSinceLastError =
      Date.now() - (globalTokenCache.lastFetchError.timestamp || 0);
    if (timeSinceLastError < FAILURE_RESET_TIMEOUT) {
      throw new Error(
        `Token fetch failed multiple times. Last error: ${
          globalTokenCache.lastFetchError.message
        }. Retrying after ${FAILURE_RESET_TIMEOUT / 1000}s.`
      );
    } else {
      // Reset after timeout
      globalTokenCache.fetchFailureCount = 0;
      globalTokenCache.lastFetchError = null;
    }
  }

  // Check if we have a cached token
  if (globalTokenCache.token) {
    // console.log("Using cached access token");
    return globalTokenCache.token;
  }

  // If there's already a refresh in progress, wait for it
  if (globalTokenCache.refreshPromise && globalTokenCache.isRefreshing) {
    console.log("Token refresh already in progress, waiting for completion...");
    try {
      return await globalTokenCache.refreshPromise;
    } catch (error) {
      // If the refresh promise failed, we need to retry
      // But don't retry if we've hit max failures
      if (globalTokenCache.fetchFailureCount >= MAX_CONSECUTIVE_FAILURES) {
        throw error;
      }
      // Fall through to start a new refresh
    }
  }

  // Token doesn't exist, fetch a new one
  console.log("Fetching new access token - cache miss");

  // Create a promise for the token refresh and store it
  globalTokenCache.isRefreshing = true;
  globalTokenCache.refreshPromise = performTokenRefresh();

  try {
    const accessToken = await globalTokenCache.refreshPromise;
    // Reset failure count on success
    globalTokenCache.fetchFailureCount = 0;
    globalTokenCache.lastFetchError = null;
    return accessToken;
  } catch (error) {
    // Track failure
    globalTokenCache.fetchFailureCount++;
    globalTokenCache.lastFetchError = {
      message: error.message,
      timestamp: Date.now(),
    };
    throw error;
  } finally {
    // Clear the refresh promise and flag when done (success or failure)
    globalTokenCache.refreshPromise = null;
    globalTokenCache.isRefreshing = false;
  }
};

// Function to clear the token cache (useful when token is invalid)
// This should NOT clear an ongoing refresh to avoid race conditions
export const clearTokenCache = () => {
  console.log("Clearing token cache");
  // Only clear the token, not the refresh promise if refresh is in progress
  // This prevents race conditions where multiple 401s clear the cache simultaneously
  if (!globalTokenCache.isRefreshing) {
    globalTokenCache.token = null;
    globalTokenCache.refreshPromise = null;
  } else {
    // If refresh is in progress, just clear the token
    // The ongoing refresh will complete and set a new token
    globalTokenCache.token = null;
  }
};

// Function to check if current token exists without fetching a new one
export const isTokenValid = () => {
  return globalTokenCache.token !== null;
};

// Function to handle 401 errors and refresh token
export const handleTokenRefresh = async () => {
  console.log("401 error detected, clearing cache and refreshing token");
  clearTokenCache();
  return await getAccessToken();
};

// Internal function to perform the actual token refresh
async function performTokenRefresh() {
  const accessToken = await fetchAccessTokenFromLiferay();

  // Cache the token (no expiration time - cache until 401)
  globalTokenCache.token = accessToken;

  // console.log("Token cached successfully (will be used until 401 error)");

  return accessToken;
}

async function fetchAccessTokenFromLiferay() {
  console.log("fetchAccessTokenFromLiferay");

  if (!process.env.BASE_URL || !process.env.ACCESS_TOKEN_URL) {
    throw new Error(
      "BASE_URL or ACCESS_TOKEN_URL environment variable is not set"
    );
  }

  const URL = `${process.env.BASE_URL}${process.env.ACCESS_TOKEN_URL}`;
  console.log("Fetching access token from:", URL);

  const grantType = `${process.env.GRANT_TYPE}`;
  const clientId = `${process.env.LIFERAY_CLIENT_ID}`;
  const clientSecret = `${process.env.LIFERAY_CLIENT_SECRET}`;

  if (!grantType || !clientId || !clientSecret) {
    throw new Error(
      "Missing required OAuth credentials (GRANT_TYPE, LIFERAY_CLIENT_ID, or LIFERAY_CLIENT_SECRET)"
    );
  }

  const payload = new URLSearchParams({
    grant_type: grantType,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload.toString(), // Convert URLSearchParams to string
    // Don't cache POST requests - we need fresh tokens
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res
      .text()
      .catch(() => "Unable to read error response");
    console.error("Failed to fetch access token:", {
      status: res.status,
      statusText: res.statusText,
      url: URL,
      errorBody: errorText,
    });

    // If we get a 401 from the OAuth endpoint itself, this is a credentials issue
    // Don't clear cache (there's no valid cache anyway), just throw the error
    const errorMessage = `Failed to fetch access token: ${res.status} ${
      res.statusText
    }. ${
      res.status === 401
        ? "OAuth credentials are invalid or expired. Check LIFERAY_CLIENT_ID and LIFERAY_CLIENT_SECRET environment variables."
        : `Error: ${
            errorText || "Unknown error"
          }. Check environment variables (BASE_URL, ACCESS_TOKEN_URL, GRANT_TYPE, LIFERAY_CLIENT_ID, LIFERAY_CLIENT_SECRET)`
    }`;

    throw new Error(errorMessage);
  }
  const data = await res.json();

  return data.access_token;
}
