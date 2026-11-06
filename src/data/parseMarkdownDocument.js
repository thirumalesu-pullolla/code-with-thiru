import { parse } from "yaml";

export function parseMarkdownDocument(rawContent) {
  const match = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(
    rawContent
  );

  if (!match) {
    throw new Error("Markdown problem is missing YAML front matter");
  }

  const attributes = parse(match[1]);

  if (
    attributes === null ||
    typeof attributes !== "object" ||
    Array.isArray(attributes)
  ) {
    throw new Error("Markdown front matter must be a YAML object");
  }

  return {
    attributes,
    body: rawContent.slice(match[0].length)
  };
}