import test from 'node:test';
import assert from 'node:assert/strict';
import { readVerificationLink, validToken, verificationUrl, verifyEmail } from '../src/verification/api.js';

const Base = 'https://api.example';
const reply = (status, body) => ({ status, json: async () => body });

test('direct access without a token cannot provide a verification code', () => {
  assert.deepEqual(readVerificationLink({ pathname: '/verificar-correo', search: '' },
    { replaceState() {} }), { token: '', malformed: false });
});

test('keeps landing unchanged and strips the token from verification history', () => {
  assert.equal(readVerificationLink({ pathname: '/', search: '?token=fixture' }, {}), null);
  let clean;
  const result = readVerificationLink({ pathname: '/verificar-correo', search: '?token=synthetic-code' },
    { replaceState: (_, __, url) => { clean = url; } });
  assert.equal(clean, '/verificar-correo');
  assert.deepEqual(result, { token: 'synthetic-code', malformed: false });
});

test('duplicate, oversized and blank tokens are rejected without selecting an arbitrary one', () => {
  for (const query of ['?token=one&token=two', '?token=', '?token=' + 'x'.repeat(4097)]) {
    let replaced = false;
    const result = readVerificationLink({ pathname: '/verificar-correo/', search: query },
      { replaceState: () => { replaced = true; } });
    assert.equal(result.token, ''); assert.equal(result.malformed, true); assert.equal(replaced, true);
  }
  assert.equal(validToken('a\nb'), false);
});

test('requires HTTPS API base without credentials or query', () => {
  assert.equal(verificationUrl(Base + '/'), Base + '/api/v1/auth/verify-email');
  for (const base of ['http://api.example', 'https://user:pass@api.example', 'https://api.example?token=x']) {
    assert.throws(() => verificationUrl(base));
  }
});

test('sends exactly the public token contract without cookies or authorization', async () => {
  let calls = 0;
  const result = await verifyEmail(Base, 'synthetic-code', async (url, options) => {
    calls++; assert.equal(url, Base + '/api/v1/auth/verify-email');
    assert.equal(options.method, 'POST'); assert.deepEqual(JSON.parse(options.body), { token: 'synthetic-code' });
    assert.equal(options.credentials, 'omit'); assert.equal(options.redirect, 'error');
    assert.equal(options.referrerPolicy, 'no-referrer'); assert.equal(options.headers.Authorization, undefined);
    return reply(200, { data: { email_verified: true } });
  });
  assert.equal(result, 'success'); assert.equal(calls, 1);
});

test('missing code never sends a request', async () => {
  assert.equal(await verifyEmail(Base, '', () => { assert.fail('Must not send'); }), 'missing');
});

test('handles expired/used code, rate limits and provider failure without replay', async () => {
  for (const [status, body, expected] of [
    [400, { code: 'INVALID_OR_EXPIRED_TOKEN' }, 'invalid'], [429, null, 'limited'],
    [503, null, 'unavailable'], [403, { message: 'private detail' }, 'error'],
    [200, { data: { email_verified: false } }, 'error'],
  ]) {
    let calls = 0;
    assert.equal(await verifyEmail(Base, 'synthetic-code', async () => { calls++; return reply(status, body); }), expected);
    assert.equal(calls, 1);
  }
});

test('network or CORS errors do not pretend the code was rejected or replay POST', async () => {
  let calls = 0;
  assert.equal(await verifyEmail(Base, 'synthetic-code', async () => { calls++; throw new TypeError('network'); }), 'network');
  assert.equal(calls, 1);
});

test('malformed success is never displayed as verified', async () => {
  assert.equal(await verifyEmail(Base, 'synthetic-code', async () => ({ status: 200, json: async () => { throw new Error(); } })), 'error');
});
