/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		// Build the target URL
		const url = new URL(request.url);
		url.hostname = "sign.app.ibnzelt.com";
		url.protocol = "https:";

		// Forward the request to DocuSeal
		const docusealResponse = await fetch(url.toString(), request);

		// Clone response and add CORS headers
		const newHeaders = new Headers(docusealResponse.headers);
		newHeaders.set("Access-Control-Allow-Origin", "https://www.ibnzelt.com");
		newHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		newHeaders.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
		newHeaders.set("Access-Control-Allow-Credentials", "true");

		// Handle preflight OPTIONS
		if (request.method === "OPTIONS") {
			return new Response(null, {
				status: 204,
				headers: newHeaders,
			});
		}

		// Return proxied response with CORS headers
		return new Response(docusealResponse.body, {
			status: docusealResponse.status,
			statusText: docusealResponse.statusText,
			headers: newHeaders,
		});
	},
};
