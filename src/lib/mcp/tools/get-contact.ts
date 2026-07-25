import { defineTool } from "@lovable.dev/mcp-js";
import { contact, socialLinks } from "../../../data/portfolio";

export default defineTool({
  name: "get_contact",
  title: "Get contact info",
  description: "Return Rohit Sen's public contact info: email, GitHub, LinkedIn, and social links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ contact, socialLinks }, null, 2) }],
    structuredContent: { contact, socialLinks },
  }),
});
