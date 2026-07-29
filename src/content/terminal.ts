export type TerminalCommand = {
  name: string
  description: string
  aliases?: string[]
}

export const terminalCommands: TerminalCommand[] = [
  { name: 'help', description: 'List available commands' },
  { name: 'about', description: 'Who Rushak is and what he owns' },
  { name: 'projects', description: 'List featured systems' },
  { name: 'skills', description: 'Show capability matrix categories' },
  { name: 'resume', description: 'Open resume route / download path' },
  { name: 'contact', description: 'Mission control contact details' },
  { name: 'whoami', description: 'Identity check' },
  { name: 'deploy', description: 'Simulate a calm production deploy' },
  { name: 'coffee', description: 'Fuel status' },
  { name: 'clear', description: 'Clear the terminal buffer' },
  { name: 'sudo hire rushak', description: 'The correct production decision' },
]

export function resolveTerminalInput(input: string) {
  return input.trim().toLowerCase().replace(/\s+/g, ' ')
}
