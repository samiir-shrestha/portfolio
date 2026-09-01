import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

// Secret salt for hashing credentials
const AUTH_SALT = process.env.ADMIN_AUTH_SALT || 'c9b4e782f1a603d8_bloodbird_secure_salt';
const SERVER_SECRET = process.env.ADMIN_JWT_SECRET || '9f8e7d6c5b4a3210_telemetry_secure_key';

// Precomputed SHA-256 hashes of salted credentials
// Username: "bloodbird" -> sha256("bloodbird:" + AUTH_SALT)
// Password: "samiirstha" -> sha256("samiirstha:" + AUTH_SALT)
function hashValue(val: string): string {
  return crypto.createHash('sha256').update(`${val}:${AUTH_SALT}`).digest('hex');
}

const EXPECTED_USER_HASH = hashValue('bloodbird');
const EXPECTED_PASS_HASH = hashValue('samiirstha');

// Constant-time comparison to prevent timing attacks
function timingSafeCompare(input: string, expectedHash: string): boolean {
  const computedHash = hashValue(input);
  const bufA = Buffer.from(computedHash, 'utf8');
  const bufB = Buffer.from(expectedHash, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Generate a cryptographically signed HMAC token with expiration
export function generateAdminToken(username: string): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload = Buffer.from(JSON.stringify({ u: username, exp: expiresAt })).toString('base64url');
  const signature = crypto.createHmac('sha256', SERVER_SECRET).update(payload).digest('base64url');
  return `bb_${payload}.${signature}`;
}

// Verify the HMAC token signature and expiration
export function verifyAdminToken(token?: string): boolean {
  if (!token || !token.startsWith('bb_')) return false;

  try {
    const raw = token.replace('bb_', '');
    const [payload, signature] = raw.split('.');
    if (!payload || !signature) return false;

    // Verify HMAC signature
    const expectedSig = crypto.createHmac('sha256', SERVER_SECRET).update(payload).digest('base64url');
    const bufSigA = Buffer.from(signature, 'utf8');
    const bufSigB = Buffer.from(expectedSig, 'utf8');
    if (bufSigA.length !== bufSigB.length || !crypto.timingSafeEqual(bufSigA, bufSigB)) {
      return false;
    }

    // Check expiration and user
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data.exp && Date.now() > data.exp) {
      return false;
    }

    return timingSafeCompare(data.u || '', EXPECTED_USER_HASH);
  } catch {
    return false;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Prevent any search engine caching / indexing
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');

  if (req.method === 'POST') {
    const { username, password, action } = req.body || {};

    if (action === 'verify') {
      const authHeader = req.headers.authorization;
      const token = authHeader?.replace('Bearer ', '') || req.body.token;
      if (verifyAdminToken(token)) {
        return res.status(200).json({ authenticated: true });
      }
      return res.status(401).json({ authenticated: false, message: 'Invalid or expired session' });
    }

    // Authenticate Login Credentials
    const cleanUser = (username || '').trim();
    const cleanPass = (password || '').trim();

    const isUserValid = timingSafeCompare(cleanUser, EXPECTED_USER_HASH);
    const isPassValid = timingSafeCompare(cleanPass, EXPECTED_PASS_HASH);

    if (isUserValid && isPassValid) {
      const token = generateAdminToken(cleanUser);
      return res.status(200).json({
        success: true,
        token,
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Access Denied: Invalid credentials.',
    });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
