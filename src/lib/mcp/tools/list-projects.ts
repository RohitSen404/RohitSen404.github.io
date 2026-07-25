import { defineTool } from "@lovable.dev/mcp-js";
import { projects } from "../../../data/portfolio";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List Rohit Sen's portfolio projects with names and short descriptions.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
    structuredContent: { projects },
  }),
});
