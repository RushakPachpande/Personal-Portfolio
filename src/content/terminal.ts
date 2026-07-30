export type TerminalCommand = {
  name: string
  description: string
}

export const terminalCommands: TerminalCommand[] = [
  { name: 'help', description: 'List available commands' },
  { name: 'about', description: 'Who Rushak is and how he works' },
  { name: 'platforms', description: 'List platform case studies' },
  { name: 'infrastructure', description: 'List infrastructure case studies' },
  { name: 'automation', description: 'List automation case studies' },
  { name: 'technologies', description: 'Open technology library' },
  { name: 'experience', description: 'Open experience timeline' },
  { name: 'philosophy', description: 'Open engineering philosophy' },
  { name: 'resume', description: 'Open resume page' },
  { name: 'contact', description: 'Contact details' },
  { name: 'whoami', description: 'Identity check' },
  { name: 'deploy', description: 'Simulate a calm production deploy' },
  { name: 'coffee', description: 'Fuel status' },
  { name: 'clear', description: 'Clear the terminal buffer' },
  { name: 'sudo hire rushak', description: 'The correct production decision' },
]

export function resolveTerminalInput(input: string) {
  return input.trim().toLowerCase().replace(/\s+/g, ' ')
}
