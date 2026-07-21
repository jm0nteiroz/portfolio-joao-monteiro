import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("configures the portfolio for a native Next.js build", async () => {
  const [layout, page] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /title:\s*"João Monteiro"/);
  assert.match(layout, /next\/font\/local/);
  assert.match(layout, /joao-pedro-favicon-large-v4\.png/);
  assert.match(page, /<PortfolioShell\s*\/>/);
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

test("shows SaaS and the Product Discovery methodologies", async () => {
  const component = await readFile(
    new URL("../app/components/PortfolioShell.tsx", import.meta.url),
    "utf8",
  );

  assert.match(component, /<span>SaaS<\/span>/);
  assert.match(component, /Design Sprint by Google/);
  assert.match(component, /User Story Mapping/);
  assert.match(component, /Tanque de Decantação/);
  assert.match(component, /Agile Design Thinking/);
  assert.match(component, /<h2 className="sub-title education-title">Formação<\/h2>/);

  const icons = [
    "../public/method-google.svg",
    "../public/method-story-map.svg",
    "../public/method-decantation.svg",
    "../public/method-design-thinking.svg",
  ];

  await Promise.all(icons.map((icon) => access(new URL(icon, import.meta.url))));
});
