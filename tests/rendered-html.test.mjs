import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders João Monteiro's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>João Monteiro<\/title>/i);
  assert.match(html, /João Pedro Monteiro Quintas/);
  assert.match(html, /Product Owner/);
  assert.match(html, /joao-pedro-favicon-large-v4\.png/);
});

test("keeps project demos and CV download available", async () => {
  const component = await readFile(
    new URL("../app/components/PortfolioShell.tsx", import.meta.url),
    "utf8",
  );

  assert.match(component, /href=\{`\/exact-demos\/\$\{project\.slug\}\/`\}/);
  assert.match(component, /href="\/Joao-Pedro-Quintas-CV\.pdf" download/);

  const assets = [
    "../public/exact-demos/nexora/index.html",
    "../public/exact-demos/pulse-hours/index.html",
    "../public/exact-demos/project-flow/index.html",
    "../public/exact-demos/bridgeops/index.html",
    "../public/Joao-Pedro-Quintas-CV.pdf",
  ];

  await Promise.all(assets.map((asset) => access(new URL(asset, import.meta.url))));
});
