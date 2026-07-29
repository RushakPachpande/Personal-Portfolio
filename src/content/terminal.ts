export type TerminalCommand = {
  name: string
  description: string
}

export const terminalCommands: TerminalCommand[] = [
  { name: 'help', description: 'List available commands' },
  { name: 'about', description: 'Who Rushak is and how he works' },
  { name: 'work', description: 'List software products' },
  { name: 'infrastructure', description: 'List infrastructure initiatives' },
  { name: 'automation', description: 'Open automation section' },
  { name: 'experience', description: 'Open experience timeline' },
  { name: 'philosophy', description: 'Open engineering philosophy' },
  { name: 'resume', description: 'Resume download path' },
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
