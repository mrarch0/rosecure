// STAGING WORKER - No lockdown
// Staging is protected by its own third-party access control
// Production lockdown lives ONLY on the main branch

export default {
  async fetch(request, env) {
    try {
      // Only allow GET and HEAD methods for static assets
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response('Method Not Allowed', { status: 405, headers: { 'Allow': 'GET, HEAD' } });
      }

      // Serve assets directly - no lockdown on staging
      const response = await env.ASSETS.fetch(request);
      const newResponse = new Response(response.body, response);

      // Add security headers WITHOUT overriding Content-Type from the asset server
      const securityHeaders = getSecurityHeaders();
      Object.entries(securityHeaders).forEach(([key, value]) => {
        newResponse.headers.set(key, value);
      });

      return newResponse;
    } catch (err) {
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
