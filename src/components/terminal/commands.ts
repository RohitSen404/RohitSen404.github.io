export interface CommandOutput {
  text: string;
  color?: string; // hex color
  delay?: number; // ms delay before this line
}

type CommandHandler = () => CommandOutput[];

const GREEN = "#00FF00";
const DIM_GREEN = "#008F11";
const RED = "#FF0033";
const WHITE = "#CCCCCC";

const commands: Record<string, CommandHandler> = {
  help: () => [
    { text: "", delay: 100 },
    { text: "  Available commands:", color: GREEN },
    { text: "" },
    { text: "  help        Show this help message", color: DIM_GREEN },
    { text: "  whoami      Display identity", color: DIM_GREEN },
    { text: "  about       Read about.txt", color: DIM_GREEN },
    { text: "  projects    List projects directory", color: DIM_GREEN },
    { text: "  skills      Display skill matrix", color: DIM_GREEN },
    { text: "  contact     Show contact information", color: DIM_GREEN },
    { text: "  clear       Clear terminal screen", color: DIM_GREEN },
    { text: "  exit        Switch to Normal Mode", color: DIM_GREEN },
    { text: "" },
  ],

  whoami: () => [
    { text: "", delay: 200 },
    { text: "  Rohit Sen | Developer | Ethical Hacker | Creator", color: GREEN },
    { text: "" },
  ],

  about: () => [
    { text: "", delay: 100 },
    { text: "  > cat about.txt", color: DIM_GREEN, delay: 300 },
    { text: "" },
    { text: "  ┌─────────────────────────────────────────┐", color: GREEN },
    { text: "  │  Name      :  Rohit Sen                  │", color: GREEN },
    { text: "  │  Location  :  India                      │", color: GREEN },
    { text: "  │  Focus     :  Web Development &           │", color: GREEN },
    { text: "  │               Ethical Hacking             │", color: GREEN },
    { text: "  │  Passion   :  Photography, Design,        │", color: GREEN },
    { text: "  │               Creative Technology         │", color: GREEN },
    { text: "  │  Status    :  Available for projects      │", color: GREEN },
    { text: "  └─────────────────────────────────────────┘", color: GREEN },
    { text: "" },
  ],

  projects: () => [
    { text: "", delay: 100 },
    { text: "  > ls -la projects/", color: DIM_GREEN, delay: 300 },
    { text: "" },
    { text: "  drwxr-xr-x  rohit  staff   weather-app/", color: GREEN, delay: 80 },
    { text: "  drwxr-xr-x  rohit  staff   portfolio-site/", color: GREEN, delay: 80 },
    { text: "  drwxr-xr-x  rohit  staff   future-ai-project/", color: GREEN, delay: 80 },
    { text: "  drwxr-xr-x  rohit  staff   ethical-hacking-toolkit/", color: GREEN, delay: 80 },
    { text: "" },
    { text: "  4 directories, 0 files", color: DIM_GREEN },
    { text: "" },
  ],

  skills: () => [
    { text: "", delay: 100 },
    { text: "  > loading skill_matrix...", color: DIM_GREEN, delay: 400 },
    { text: "" },
    { text: "  FRONTEND", color: GREEN },
    { text: "  ├── React         ████████████████░░  90%", color: WHITE },
    { text: "  ├── TypeScript     ███████████████░░░  85%", color: WHITE },
    { text: "  ├── Tailwind CSS   ████████████████░░  90%", color: WHITE },
    { text: "  └── JavaScript     ████████████████░░  92%", color: WHITE },
    { text: "" },
    { text: "  BACKEND", color: GREEN },
    { text: "  ├── Python         ███████████████░░░  85%", color: WHITE },
    { text: "  ├── Node.js        ██████████████░░░░  80%", color: WHITE },
    { text: "  └── SQL            █████████████░░░░░  75%", color: WHITE },
    { text: "" },
    { text: "  SECURITY", color: GREEN },
    { text: "  ├── Ethical Hacking ██████████████░░░░  80%", color: WHITE },
    { text: "  └── Network Sec    █████████████░░░░░  75%", color: WHITE },
    { text: "" },
  ],

  contact: () => [
    { text: "", delay: 100 },
    { text: "  > cat /etc/contact.conf", color: DIM_GREEN, delay: 300 },
    { text: "" },
    { text: "  ┌─────────────────────────────────────────┐", color: GREEN },
    { text: "  │  Email    :  rohitsen@example.com        │", color: GREEN },
    { text: "  │  GitHub   :  github.com/rohitsen          │", color: GREEN },
    { text: "  │  LinkedIn :  linkedin.com/in/rohitsen     │", color: GREEN },
    { text: "  └─────────────────────────────────────────┘", color: GREEN },
    { text: "" },
  ],
};

export const executeCommand = (input: string): { output: CommandOutput[]; special?: string } => {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "") return { output: [] };
  if (trimmed === "clear") return { output: [], special: "clear" };
  if (trimmed === "exit") return { output: [{ text: "  Switching to Normal Mode...", color: GREEN, delay: 200 }], special: "exit" };

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
