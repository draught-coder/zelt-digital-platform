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
		const url = new URL(request.url);
		url.hostname = "sign.app.ibnzelt.com";
		url.protocol = "https:";

		// Prepare init object to forward method, headers, and body
		const init = {
			method: request.method,
			headers: request.headers,
			body: request.method !== "GET" && request.method !== "HEAD" ? await request.arrayBuffer() : undefined,
			redirect: "follow"
		};

		const docusealResponse = await fetch(url.toString(), init);

		const newHeaders = new Headers(docusealResponse.headers);
		newHeaders.set("Access-Control-Allow-Origin", "https://www.ibnzelt.com");
		newHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		newHeaders.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
		newHeaders.set("Access-Control-Allow-Credentials", "true");

		if (request.method === "OPTIONS") {
			return new Response(null, {
				status: 204,
				headers: newHeaders,
			});
		}

		return new Response(docusealResponse.body, {
			status: docusealResponse.status,
			statusText: docusealResponse.statusText,
			headers: newHeaders,
		});
	},
};
