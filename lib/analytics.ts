import fs from 'fs';
import path from 'path';

export interface VisitorLog {
  id: string;
  timestamp: string;
  ip: string;
  path: string;
  referrer: string;
  userAgent: string;
  browser: string;
  os: string;
  device: string;
  country: string;
}

export interface AnalyticsStats {
  totalViews: number;
  uniqueIpsCount: number;
  todayViews: number;
  weeklyViews: number;
  viewsByDate: Record<string, number>;
  viewsByPath: Record<string, number>;
  topBrowsers: Record<string, number>;
  topOs: Record<string, number>;
  recentLogs: VisitorLog[];
}

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'analytics_data.json');

// Parse basic user agent details without heavy external dependencies
function parseUserAgent(ua: string) {
  let browser = 'Unknown';
  let os = 'Unknown';
  let device = 'Desktop';

  if (!ua) return { browser, os, device };

  // Detect Device
  if (/mobile|iphone|ipod|android.*mobile|windows phone/i.test(ua)) {
    device = 'Mobile';
  } else if (/ipad|tablet|android(?!.*mobile)/i.test(ua)) {
    device = 'Tablet';
  }

  // Detect OS
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  // Detect Browser
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua) && !/opr|opera/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';

  return { browser, os, device };
}

function ensureDataDirectoryExists() {
  const dir = path.dirname(DATA_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readLogsFromFile(): VisitorLog[] {
  try {
    ensureDataDirectoryExists();
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, 'utf8');
      if (content.trim()) {
        return JSON.parse(content);
      }
    }
  } catch (error) {
    console.error('Error reading analytics data:', error);
  }
  return [];
}

function writeLogsToFile(logs: VisitorLog[]) {
  try {
    ensureDataDirectoryExists();
    // Keep at most 2,000 most recent logs to avoid unbounded growth
    const trimmedLogs = logs.slice(0, 2000);
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(trimmedLogs, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing analytics data:', error);
  }
}

export function recordPageView(data: {
  ip: string;
  path: string;
  referrer?: string;
  userAgent?: string;
  country?: string;
}): VisitorLog {
  const ua = data.userAgent || '';
  const { browser, os, device } = parseUserAgent(ua);
  
  // Format IP nicely if localhost or IPv6 mapped IPv4
  let cleanIp = data.ip || '127.0.0.1';
  if (cleanIp === '::1' || cleanIp === '::ffff:127.0.0.1' || cleanIp === 'localhost') {
    cleanIp = '127.0.0.1 (Localhost)';
  } else if (cleanIp.startsWith('::ffff:')) {
    cleanIp = cleanIp.replace('::ffff:', '');
  }

  const logEntry: VisitorLog = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    timestamp: new Date().toISOString(),
    ip: cleanIp,
    path: data.path || '/',
    referrer: data.referrer || 'Direct',
    userAgent: ua,
    browser,
    os,
    device,
    country: data.country || 'Unknown',
  };

  const logs = readLogsFromFile();
  logs.unshift(logEntry); // Add to beginning of array
  writeLogsToFile(logs);

  return logEntry;
}

export function getAnalyticsStats(): AnalyticsStats {
  const logs = readLogsFromFile();
  const totalViews = logs.length;

  const uniqueIps = new Set<string>();
  const viewsByDate: Record<string, number> = {};
  const viewsByPath: Record<string, number> = {};
  const topBrowsers: Record<string, number> = {};
  const topOs: Record<string, number> = {};

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  let todayViews = 0;
  let weeklyViews = 0;

  for (const log of logs) {
    uniqueIps.add(log.ip);

    const logDate = log.timestamp.split('T')[0];
    viewsByDate[logDate] = (viewsByDate[logDate] || 0) + 1;

    viewsByPath[log.path] = (viewsByPath[log.path] || 0) + 1;
    topBrowsers[log.browser] = (topBrowsers[log.browser] || 0) + 1;
    topOs[log.os] = (topOs[log.os] || 0) + 1;

    if (logDate === todayStr) {
      todayViews++;
    }

    const logTime = new Date(log.timestamp);
    if (logTime >= sevenDaysAgo) {
      weeklyViews++;
    }
  }

  return {
    totalViews,
    uniqueIpsCount: uniqueIps.size,
    todayViews,
    weeklyViews,
    viewsByDate,
    viewsByPath,
    topBrowsers,
    topOs,
    recentLogs: logs.slice(0, 150),
  };
}

export function clearAnalyticsLogs(): boolean {
  try {
    writeLogsToFile([]);
    return true;
  } catch (error) {
    console.error('Error clearing analytics logs:', error);
    return false;
  }
}
