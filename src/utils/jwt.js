// minimal JWT payload decoder (no signature verification).
export function decodePayload(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = parts[1];
    // base64url decode
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch (e) {
    try {
      // fallback simpler decode
      const json = atob(parts[1]);
      return JSON.parse(json);
    } catch (err) {
      return null;
    }
  }
}

export function getRoleFromToken(token) {
  const p = decodePayload(token);
  return p && p.role ? p.role : null;
}

export function getEmailFromToken(token) {
  const p = decodePayload(token);
  return p && p.sub ? p.sub : null;
}