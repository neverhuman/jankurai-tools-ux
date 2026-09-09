import { expect, test } from "@playwright/test";
import { execFile } from "node:child_process";
import { readFile, symlink, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";

test("installed CLI symlink executes an audit and writes its report", async ({}, testInfo) => {
  const executable = testInfo.outputPath("jankurai-ux-qa");
  const page = testInfo.outputPath("fixture.html");
  const report = testInfo.outputPath("report.json");
  await symlink(fileURLToPath(new URL("../dist/cli.js", import.meta.url)), executable);
  await writeFile(page, '<html lang="en"><title>CLI test</title><main><h1>Rendered fixture</h1></main></html>');
  await promisify(execFile)(process.execPath, [executable, "audit", "--url", pathToFileURL(page).href, "--out", report]);
  const payload = JSON.parse(await readFile(report, "utf8"));
  expect(payload.reports).toHaveLength(2);
  expect(payload.reports.every((item: { url: string }) => item.url === pathToFileURL(page).href)).toBe(true);
});
