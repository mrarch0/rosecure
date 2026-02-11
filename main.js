export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const hostname = url.hostname;

      // Only allow GET and HEAD methods for static assets
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response('Method Not Allowed', { status: 405, headers: { 'Allow': 'GET, HEAD' } });
      }

      // Production lockdown - block ALL routes on main domain
      if (hostname === 'rosecure.org' || hostname === 'www.rosecure.org') {
        return new Response(getLockdownHTML(), {
          status: 503,
          headers: getLockdownHeaders()
        });
      }

      // Serve normal assets for staging and other environments
      const response = await env.ASSETS.fetch(request);
      const newResponse = new Response(response.body, response);

      // Add security headers WITHOUT overriding Content-Type from the asset server
      const securityHeaders = getSecurityHeaders();
      Object.entries(securityHeaders).forEach(([key, value]) => {
        newResponse.headers.set(key, value);
      });

      return newResponse;
    } catch (err) {
      // Generic error response - never leak internals
      return new Response('<!DOCTYPE html><html><head><title>Error</title></head><body><h1>Something went wrong</h1><p>Please try again later.</p></body></html>', {
        status: 500,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'no-store'
        }
      });
    }
  }
};

function getSecurityHeaders() {
  // NOTE: Content-Type is intentionally NOT set here - let the asset server provide correct MIME types
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '0',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://embed.tawk.to; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://embed.tawk.to wss://*.tawk.to; frame-src https://embed.tawk.to; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;",
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'credentialless',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'X-DNS-Prefetch-Control': 'off',
    'X-Download-Options': 'noopen',
    'X-Permitted-Cross-Domain-Policies': 'none'
  };
}

function getLockdownHeaders() {
  return {
    'Content-Type': 'text/html;charset=UTF-8',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '0',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
    'Content-Security-Policy': "default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; font-src https://fonts.gstatic.com; img-src https://staging.rosecure.org; connect-src 'none'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; upgrade-insecure-requests;",
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'X-Robots-Tag': 'noindex, nofollow',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'credentialless',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'X-DNS-Prefetch-Control': 'off',
    'X-Download-Options': 'noopen',
    'X-Permitted-Cross-Domain-Policies': 'none'
  };
}

function getLockdownHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>RoSecure - Under Development</title>
    <link rel="icon" type="image/png" href="https://staging.rosecure.org/rosecurelogo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0d0d12 0%, #1a1a2e 100%);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
        }
        .lockdown-container {
            background: rgba(255, 255, 255, 0.05);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 48px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .icon {
            font-size: 64px;
            margin-bottom: 24px;
            animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
        }
        h1 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
            background: linear-gradient(135deg, #1f4dff 0%, #00d4ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 32px;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #1f4dff 0%, #0039e6 100%);
            color: #fff;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(31, 77, 255, 0.4);
        }
        .footer-text {
            margin-top: 24px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.4);
        }
    </style>
</head>
<body>
    <div class="lockdown-container">
        <div class="icon">&#128679;</div>
        <h1>Site Under Development</h1>
        <p>
            This site is currently under development and not available to the public.
            Only authorized developers and testers have access to the staging environment.
        </p>
        <a href="https://staging.rosecure.org" class="btn">I am a Developer or Tester</a>
        <p class="footer-text">Check back soon for our official launch</p>
    </div>
</body>
</html>`;
}
