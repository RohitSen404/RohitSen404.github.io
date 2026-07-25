import { defineTool } from "@lovable.dev/mcp-js";
import { aboutParagraphs, identity } from "@/data/portfolio";

export default defineTool({
  name: "get_about",
  title: "Get about section",
  description: "Return the About section: bio paragraphs and top-line identity for Rohit Sen.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: aboutParagraphs.join("\n\n") }],
    structuredContent: { identity, about: aboutParagraphs },
  }),
});
