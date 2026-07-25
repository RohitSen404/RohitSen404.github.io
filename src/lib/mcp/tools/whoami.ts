import { defineTool } from "@lovable.dev/mcp-js";
import { identity } from "../../data/portfolio";

export default defineTool({
  name: "whoami",
  title: "Who is Rohit Sen",
  description: "Return Rohit Sen's identity: name, role, tagline, location, focus, and status.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(identity, null, 2) }],
    structuredContent: { identity },
  }),
});
