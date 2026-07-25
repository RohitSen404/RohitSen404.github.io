import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { skills } from "../../data/portfolio";

const categories = ["frontend", "backend", "security", "cloud", "other", "all"] as const;

export default defineTool({
  name: "list_skills",
  title: "List skills",
  description:
    "List Rohit Sen's technical skills, optionally filtered by category (frontend, backend, security, cloud, other, or all).",
  inputSchema: {
    category: z
      .enum(categories)
      .optional()
      .describe("Which skill category to return. Defaults to 'all'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const cat = category ?? "all";
    const data =
      cat === "all"
        ? skills
        : { [cat]: skills[cat as Exclude<typeof cat, "all">] };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { skills: data },
    };
  },
});
