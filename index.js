// Cloudflare Workers entry point for RoSecure static site
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
