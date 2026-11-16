export function verificationUrl(base) {
  const url = new URL(base);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('Invalid API configuration');
  }
  return `${url.href.replace(/\/$/, '')}/api/v1/auth/verify-email`;
}

export function validToken(token) {
  return typeof token === 'string' && token.length > 0 && token.length <= 4096 && !/\s|[\u0000-\u001f\u007f]/u.test(token);
}

/** Consume once before React mounts; never keep the email token in history or persistent storage. */
export function readVerificationLink(location, history) {
  if (location.pathname.replace(/\/$/, '') !== '/verificar-correo') return null;
  const params = new URLSearchParams(location.search);
  const tokens = params.getAll('token');
  params.delete('token');
  const cleanQuery = params.toString();
  history.replaceState(null, '', `${location.pathname}${cleanQuery ? `?${cleanQuery}` : ''}`);
  return { token: tokens.length === 1 && validToken(tokens[0]) ? tokens[0] : '',
    malformed: tokens.length > 0 && (tokens.length !== 1 || !validToken(tokens[0])) };
}

/** Public endpoint: no session cookies, bearer, redirects, logging or automatic replay. */
export async function verifyEmail(base, token, fetcher = globalThis.fetch) {
  if (!validToken(token)) return 'missing';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetcher(verificationUrl(base), {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ token }), credentials: 'omit', redirect: 'error',
      cache: 'no-store', referrerPolicy: 'no-referrer', signal: controller.signal,
    });
    if (response.status === 429) return 'limited';
    if (response.status >= 500) return 'unavailable';
    const body = await response.json().catch(() => null);
    if (response.status === 200 && body?.data?.email_verified === true) return 'success';
    if (response.status === 400 && body?.code === 'INVALID_OR_EXPIRED_TOKEN') return 'invalid';
    return 'error';
  } catch {
    return 'network';
  } finally { clearTimeout(timer); }
}
