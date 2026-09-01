import type { NextApiRequest, NextApiResponse } from 'next';
import { getAnalyticsStats, clearAnalyticsLogs } from '@/lib/analytics';
import { verifyAdminToken } from './auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');

  // Check authorization
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');

  if (!verifyAdminToken(token)) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }

  if (req.method === 'GET') {
    try {
      const stats = getAnalyticsStats();
      return res.status(200).json({ success: true, stats });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return res.status(500).json({ error: 'Failed to retrieve telemetry data' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const cleared = clearAnalyticsLogs();
      return res.status(200).json({ success: cleared, message: 'Telemetry logs reset successfully' });
    } catch (error) {
      console.error('Error resetting analytics:', error);
      return res.status(500).json({ error: 'Failed to reset telemetry logs' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
