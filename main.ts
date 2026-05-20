const TARGET = "https://api.openai.com";

  Deno.serve(async (req: Request) => {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      return new Response("OpenAI Proxy is running", { status: 200 });
    }

    const targetUrl = TARGET + url.pathname + url.search;
    const headers = new Headers(req.headers);
    headers.delete("host");

    const resp = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method === "GET" || req.method === "HEAD" ? undefined : req.body,
    });

    return new Response(resp.body, {
      status: resp.status,
      headers: resp.headers,
    });
  });
