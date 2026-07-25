import { defineMcp } from "@lovable.dev/mcp-js";
import whoamiTool from "./tools/whoami";
import getAboutTool from "./tools/get-about";
import listSkillsTool from "./tools/list-skills";
import listProjectsTool from "./tools/list-projects";
import getContactTool from "./tools/get-contact";

export default defineMcp({
  name: "rohit-sen-portfolio-mcp",
  title: "Rohit Sen Portfolio MCP",
  version: "0.1.0",
  instructions:
    "Public tools that expose Rohit Sen's portfolio content: identity, about, skills, projects, and contact info. Use these to answer questions about Rohit's background, expertise, and how to reach him.",
  tools: [whoamiTool, getAboutTool, listSkillsTool, listProjectsTool, getContactTool],
});
