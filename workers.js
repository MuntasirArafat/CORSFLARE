export default {
  async fetch(request) {
    let url = new URL(request.url);
    let targetUrl = url.searchParams.get("url"); // Get the actual API URL from query params

    if (!targetUrl) {
      return new Response("Missing 'url' parameter", { status: 400 });
    }

    try {
      let response = await fetch(targetUrl, {
        method: request.method,
        headers: {
          "X-Requested-With": "XMLHttpRequest", // Required by some APIs
        },
      });

      let corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      };

      return new Response(await response.text(), {
        status: response.status,
        headers: { ...corsHeaders },
      });

    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};
