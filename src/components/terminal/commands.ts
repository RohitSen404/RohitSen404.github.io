import { identity, aboutParagraphs, skills, projects, contact } from "@/data/portfolio";

export interface CommandOutput {
  text: string;
  color?: string;
  delay?: number;
}

type CommandHandler = () => CommandOutput[];

const GREEN = "#00FF00";
const DIM_GREEN = "#008F11";
const RED = "#FF0033";
const WHITE = "#CCCCCC";
const BRIGHT_GREEN = "#33FF33";


const commands: Record<string, CommandHandler> = {
  help: () => [
    { text: "", delay: 100 },
    { text: "  Available commands:", color: GREEN },
    { text: "" },
    { text: "  help        Show this help message", color: DIM_GREEN },
    { text: "  whoami      Display identity", color: DIM_GREEN },
    { text: "  about       Read system profile", color: DIM_GREEN },
    { text: "  projects    List projects directory", color: DIM_GREEN },
    { text: "  skills      Load skill modules", color: DIM_GREEN },
    { text: "  contact     Show contact configuration", color: DIM_GREEN },
    { text: "  sudo        Elevate to root privileges", color: DIM_GREEN },
    { text: "  clear       Clear terminal screen", color: DIM_GREEN },
    { text: "  exit        Switch to Normal Mode", color: DIM_GREEN },
    { text: "" },
  ],

  whoami: () => [
    { text: "", delay: 200 },
    { text: `  ${identity.name} | ${identity.tagline}`, color: GREEN },
    { text: "" },
  ],

  about: () => [
    { text: "", delay: 100 },
    { text: "  > cat system_profile.txt", color: DIM_GREEN, delay: 300 },
    { text: "  > Fetching data...", color: DIM_GREEN, delay: 400 },
    { text: "" },
    { text: "  ┌─────────────────────────────────────────────┐", color: GREEN },
    { text: `  │  Name      :  ${identity.name.padEnd(28)}│`, color: GREEN },
    { text: `  │  Location  :  ${identity.location.padEnd(28)}│`, color: GREEN },
    { text: `  │  Focus     :  ${identity.focus.padEnd(28)}│`, color: GREEN },
    { text: `  │  Passions  :  ${identity.passions.join(", ").padEnd(28)}│`, color: GREEN },
    { text: `  │  Status    :  ${identity.status.padEnd(28)}│`, color: GREEN },
    { text: "  └─────────────────────────────────────────────┘", color: GREEN },
    { text: "" },
    ...aboutParagraphs.map((p) => ({ text: `  ${p}`, color: WHITE })),
    { text: "" },
  ],

  projects: () => [
    { text: "", delay: 100 },
    { text: "  > ls -la projects/", color: DIM_GREEN, delay: 300 },
    { text: "  > Executing...", color: DIM_GREEN, delay: 350 },
    { text: "" },
    { text: "  total " + projects.length, color: DIM_GREEN, delay: 80 },
    ...projects.map((p) => ({
      text: `  drwxr-xr-x  root  staff   ${p.name}/`,
      color: BRIGHT_GREEN,
      delay: 80,
    })),
    { text: "" },
    ...projects.map((p) => ({
      text: `    └── ${p.description}`,
      color: WHITE,
    })),
    { text: "" },
    { text: `  ${projects.length} directories, 0 files`, color: DIM_GREEN },
    { text: "" },
  ],

  skills: () => {
    const lines: CommandOutput[] = [
      { text: "", delay: 100 },
      { text: "  > load modules --all", color: DIM_GREEN, delay: 300 },
      { text: "  > Fetching data...", color: DIM_GREEN, delay: 400 },
      { text: "" },
    ];

    const addGroup = (title: string, items: { name: string; level: number }[]) => {
      lines.push({ text: `  [ ${title} ]`, color: GREEN });
      items.forEach((s) => {
        lines.push({ text: `    • ${s.name}`, color: WHITE });
      });
      lines.push({ text: "" });
    };

    addGroup("FRONTEND", skills.frontend);
    addGroup("BACKEND", skills.backend);
    addGroup("SECURITY", skills.security);
    addGroup("CLOUD & INFRA", skills.cloud);
    addGroup("OTHER", skills.other);

    return lines;
  },

  contact: () => [
    { text: "", delay: 100 },
    { text: "  > cat /etc/contact.conf", color: DIM_GREEN, delay: 300 },
    { text: "  > Executing...", color: DIM_GREEN, delay: 350 },
    { text: "" },
    { text: "  ┌─────────────────────────────────────────────┐", color: GREEN },
    { text: `  │  Email    :  ${contact.email.padEnd(30)}│`, color: GREEN },
    { text: `  │  GitHub   :  ${contact.github.padEnd(30)}│`, color: GREEN },
    { text: `  │  LinkedIn :  ${contact.linkedin.padEnd(30)}│`, color: GREEN },
    { text: "  └─────────────────────────────────────────────┘", color: GREEN },
    { text: "" },
  ],

  sudo: () => [
    { text: "", delay: 200 },
    { text: "  Elevating privileges...", color: DIM_GREEN, delay: 600 },
    { text: "  sudo access required", color: DIM_GREEN, delay: 400 },
    { text: "  Authenticating...", color: DIM_GREEN, delay: 800 },
    { text: "  Access granted: root privileges enabled", color: GREEN, delay: 500 },
    { text: "" },
    { text: "  [ SECURITY LEVEL: MAXIMUM ]", color: RED },
    { text: "  [ USER PERMISSION: ROOT ]", color: RED },
    { text: "" },
  ],
};

// Permission denied Easter eggs – certain "dangerous" commands
const PERMISSION_DENIED_COMMANDS = ["rm", "shutdown", "reboot", "kill", "passwd", "chmod", "chown"];

export const executeCommand = (
  input: string
): { output: CommandOutput[]; special?: string } => {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "") return { output: [] };
  if (trimmed === "clear") return { output: [], special: "clear" };
  if (trimmed === "exit")
    return {
      output: [{ text: "  Switching to Normal Mode...", color: GREEN, delay: 200 }],
      special: "exit",
    };
  if (trimmed === "sudo")
    return { output: commands.sudo(), special: "sudo" };

  // Permission denied for dangerous commands
  const firstWord = trimmed.split(/\s+/)[0];
  if (PERMISSION_DENIED_COMMANDS.includes(firstWord)) {
    return {
      output: [
        { text: "", delay: 100 },
        { text: `  bash: ${trimmed}: Permission denied`, color: RED },
        { text: "  Operation requires elevated privileges.", color: DIM_GREEN },
        { text: "" },
      ],
    };
  }

  const handler = commands[trimmed];
  if (handler) return { output: handler() };

  return {
    output: [
      { text: `  bash: ${trimmed}: command not found`, color: RED },
      { text: "  Type 'help' for available commands.", color: DIM_GREEN },
      { text: "" },
    ],
  };
};
