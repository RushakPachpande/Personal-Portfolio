import { defaultNavStructure } from '@/components/layout/navItems';
import {
  computeEngineeringStats,
  getCaseStudiesByCategory,
  getCaseStudy,
  getCaseStudyPath,
} from '@/lib/portfolio';
import type { PortfolioData } from '@/types/portfolio';
import type { NavItem } from '@/types/site-config';

export type TerminalCommand = {
  name: string;
  description: string;
  aliases?: string[];
};

export type TerminalLineType =
  'input' | 'output' | 'system' | 'success' | 'error';

export type TerminalLine = {
  type: TerminalLineType;
  text: string;
};

export type TerminalExecution = {
  lines: TerminalLine[];
  navigate?: string;
  clear?: boolean;
};

export type TerminalContext = {
  pathname: string;
  portfolio: PortfolioData;
};

export const terminalCommands: TerminalCommand[] = [
  { name: 'help', description: 'List available commands' },
  { name: 'home', description: 'Return to the homepage' },
  { name: 'about', description: 'Who Rushak is and how he works' },
  {
    name: 'platforms',
    description: 'List platform case studies',
    aliases: ['work', 'projects'],
  },
  { name: 'infrastructure', description: 'List infrastructure case studies' },
  { name: 'automation', description: 'List automation case studies' },
  {
    name: 'technologies',
    description: 'Open technology library',
    aliases: ['tech', 'stack'],
  },
  { name: 'experience', description: 'Open experience timeline' },
  { name: 'philosophy', description: 'Open engineering philosophy' },
  { name: 'resume', description: 'Open full resume preview + PDF download' },
  { name: 'contact', description: 'Contact details and message form' },
  {
    name: 'certs',
    description: 'List certifications and learning paths',
    aliases: ['certifications'],
  },
  { name: 'education', description: 'Show academic background' },
  {
    name: 'highlights',
    description: 'Professional highlights from shipped work',
  },
  {
    name: 'stats',
    description: 'Engineering metrics from verified initiatives',
    aliases: ['metrics'],
  },
  { name: 'skills', description: 'Core competencies and focus areas' },
  {
    name: 'nav',
    description: 'Show site navigation map (Work / Profile groups)',
  },
  { name: 'ls', description: 'List navigable routes' },
  { name: 'pwd', description: 'Print current route' },
  {
    name: 'open',
    description: 'Open a case study by slug (e.g. open navdrishti)',
  },
  { name: 'download', description: 'Get resume PDF path' },
  {
    name: 'socials',
    description: 'GitHub, LinkedIn, and email links',
    aliases: ['links'],
  },
  { name: 'version', description: 'Portfolio build version' },
  { name: 'whoami', description: 'Identity check' },
  { name: 'deploy', description: 'Simulate a calm production deploy' },
  { name: 'coffee', description: 'Fuel status' },
  { name: 'clear', description: 'Clear the terminal buffer' },
  { name: 'sudo hire rushak', description: 'The correct production decision' },
];

export const terminalQuickCommands = [
  'help',
  'resume',
  'platforms',
  'certs',
  'stats',
  'contact',
] as const;

export function buildTerminalWelcome(portfolio: PortfolioData) {
  const configured = portfolio.siteConfig.terminal.welcomeLines;
  if (configured.length > 0) {
    return [
      ...configured,
      '',
      `Portfolio v${portfolio.siteVersion} · ${portfolio.profile.resumeTitle}`,
      'Type `help` for commands · `nav` for site map · Ctrl+K to close',
    ].join('\n');
  }
  return [
    '+------------------------------------------+',
    '|  rushak@platform - portfolio terminal    |',
    '+------------------------------------------+',
    '',
    `Portfolio v${portfolio.siteVersion} · ${portfolio.profile.resumeTitle}`,
    'Type `help` for commands · `nav` for site map · Ctrl+K to close',
  ].join('\n');
}

function commandLookup(commands: TerminalCommand[]) {
  const map = new Map<string, string>();
  for (const command of commands) {
    map.set(command.name, command.name);
    command.aliases?.forEach((alias) => map.set(alias, command.name));
  }
  return map;
}

export function resolveTerminalInput(input: string) {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function getTerminalCommandNames(commands: TerminalCommand[]) {
  return commands.flatMap((command) => [
    command.name,
    ...(command.aliases ?? []),
  ]);
}

export function completeTerminalInput(
  value: string,
  commands: TerminalCommand[]
) {
  const trimmed = value.trimStart().toLowerCase();
  if (!trimmed) return null;

  const [command, ...rest] = trimmed.split(' ');
  const candidates = getTerminalCommandNames(commands).filter((name) =>
    name.startsWith(command)
  );
  if (candidates.length !== 1) return null;

  const resolved = candidates[0]!;
  if (rest.length > 0 && resolved === 'open') return null;
  return rest.length > 0 ? `${resolved} ${rest.join(' ')}` : resolved;
}

function out(text: string, type: TerminalLineType = 'output'): TerminalLine {
  return { type, text };
}

function formatCertifications(portfolio: PortfolioData) {
  return portfolio.resume.certifications
    .map((group) => {
      const header = `${group.provider} (${group.items.length})`;
      const preview =
        group.items.length > 6
          ? [...group.items.slice(0, 4), `… +${group.items.length - 4} more`]
          : group.items;
      return `${header}\n${preview.map((item) => `  ▹ ${item}`).join('\n')}`;
    })
    .join('\n\n');
}

function formatNavStructure(nav: NavItem[]) {
  return nav
    .map((item) => {
      if (item.type === 'link')
        return `  ${item.label.padEnd(12)} → ${item.to}`;
      const children = item.items
        .map((route) => `      ${route.label.padEnd(18)} ${route.to}`)
        .join('\n');
      return `  ${item.label}\n${children}`;
    })
    .join('\n');
}

export function executeTerminalCommand(
  raw: string,
  context: TerminalContext
): TerminalExecution | null {
  const { portfolio } = context;
  const { profile, caseStudies, technologies, resume, siteConfig } = portfolio;
  const nav = siteConfig.nav.length > 0 ? siteConfig.nav : defaultNavStructure;
  const commands =
    portfolio.terminalCommands.length > 0
      ? portfolio.terminalCommands
      : terminalCommands;
  const lookup = commandLookup(commands);
  const input = resolveTerminalInput(raw);
  if (!input) return null;

  const [commandToken, ...args] = input.split(' ');
  const command = lookup.get(commandToken) ?? commandToken;

  if (command === 'clear') {
    return { lines: [], clear: true };
  }

  if (command === 'help') {
    const help = commands
      .map((entry) => {
        const aliases = entry.aliases?.length
          ? ` (${entry.aliases.join(', ')})`
          : '';
        return `  ${entry.name.padEnd(20)} ${entry.description}${aliases}`;
      })
      .join('\n');
    return { lines: [out(`Available commands:\n${help}`)] };
  }

  if (command === 'home') {
    return { lines: [out('Navigating to homepage…')], navigate: '/' };
  }

  if (command === 'about') {
    return {
      lines: [
        out(
          [
            profile.name,
            profile.resumeTitle,
            profile.location,
            '',
            profile.about.whoIAm,
            '',
            profile.about.approach,
          ].join('\n')
        ),
      ],
      navigate: '/about',
    };
  }

  if (command === 'platforms') {
    const list = getCaseStudiesByCategory(caseStudies, 'platform')
      .map(
        (study) =>
          `  • ${study.name}${study.status ? ` — ${study.status}` : ''}`
      )
      .join('\n');
    return {
      lines: [out(`Platform case studies:\n${list}`)],
      navigate: '/platforms',
    };
  }

  if (command === 'infrastructure') {
    const list = getCaseStudiesByCategory(caseStudies, 'infrastructure')
      .map(
        (study) =>
          `  • ${study.name}${study.status ? ` — ${study.status}` : ''}`
      )
      .join('\n');
    return {
      lines: [out(`Infrastructure initiatives:\n${list}`)],
      navigate: '/infrastructure',
    };
  }

  if (command === 'automation') {
    const list = getCaseStudiesByCategory(caseStudies, 'automation')
      .map(
        (study) =>
          `  • ${study.name}${study.status ? ` — ${study.status}` : ''}`
      )
      .join('\n');
    return {
      lines: [out(`Automation workflows:\n${list}`)],
      navigate: '/automation',
    };
  }

  if (command === 'technologies') {
    const preview = technologies
      .slice(0, 8)
      .map((tech) => tech.name)
      .join(', ');
    return {
      lines: [
        out(
          `Technology library — ${technologies.length} tools across frontend, cloud, automation, and enterprise.\nPreview: ${preview}…`
        ),
      ],
      navigate: '/technology-library',
    };
  }

  if (command === 'experience') {
    return {
      lines: [
        out(
          'Opening experience timeline — career, education, and major deployments.'
        ),
      ],
      navigate: '/experience',
    };
  }

  if (command === 'philosophy') {
    return {
      lines: [
        out(
          'Opening engineering philosophy — ownership, production mindset, and learning.'
        ),
      ],
      navigate: '/philosophy',
    };
  }

  if (command === 'resume') {
    return {
      lines: [
        out(
          [
            'Full resume preview available on-site.',
            profile.resumeUrl
              ? `PDF download: ${profile.resumeUrl}`
              : 'No resume PDF is published yet.',
            '',
            'Sections: summary · highlights · competencies · expertise · experience · projects · education · certifications',
            '',
            `Key projects: ${resume.keyProjects.map((project) => project.name).join(', ')}`,
          ].join('\n')
        ),
      ],
      navigate: '/resume',
    };
  }

  if (command === 'contact') {
    return {
      lines: [
        out(
          [
            `Email:   ${profile.email}`,
            `Phone:   ${profile.phone}`,
            `LinkedIn ${profile.socials.linkedin}`,
            `GitHub:  ${profile.socials.github}`,
            '',
            'Opening contact page…',
          ].join('\n')
        ),
      ],
      navigate: '/contact',
    };
  }

  if (command === 'certs') {
    const total = resume.certifications.reduce(
      (sum, group) => sum + group.items.length,
      0
    );
    return {
      lines: [
        out(
          `Certifications & learning paths (${total} total):\n\n${formatCertifications(portfolio)}\n\nFull list on /resume`
        ),
      ],
      navigate: '/resume',
    };
  }

  if (command === 'education') {
    return {
      lines: [
        out(
          resume.education
            .map(
              (entry) =>
                `${entry.degree}\n  ${entry.institution} · ${entry.period}\n  ${entry.detail}`
            )
            .join('\n\n')
        ),
      ],
    };
  }

  if (command === 'highlights') {
    return {
      lines: [
        out(
          resume.highlights
            .map(
              (item) =>
                `  ▹ ${item.label}${item.detail ? ` — ${item.detail}` : ''}`
            )
            .join('\n')
        ),
      ],
    };
  }

  if (command === 'stats') {
    const stats = computeEngineeringStats(
      caseStudies,
      technologies,
      siteConfig
    );
    return {
      lines: [
        out(
          stats
            .map(
              (stat) =>
                `  ${stat.label.padEnd(24)} ${stat.value}${stat.suffix ?? ''}  — ${stat.description}`
            )
            .join('\n')
        ),
      ],
    };
  }

  if (command === 'skills') {
    return {
      lines: [
        out(
          [
            'Focus areas:',
            ...profile.focusAreas.map((area) => `  • ${area}`),
            '',
            'Core competencies:',
            ...resume.coreCompetencies.map((skill) => `  • ${skill}`),
          ].join('\n')
        ),
      ],
    };
  }

  if (command === 'nav') {
    return { lines: [out(`Site navigation:\n${formatNavStructure(nav)}`)] };
  }

  if (command === 'ls') {
    const routes = nav.flatMap((item) =>
      item.type === 'link' ? [item.to] : item.items.map((route) => route.to)
    );
    return {
      lines: [
        out(`Routes:\n${routes.map((route) => `  ${route}`).join('\n')}`),
      ],
    };
  }

  if (command === 'pwd') {
    return { lines: [out(context.pathname || '/')] };
  }

  if (command === 'open') {
    const slug = args[0];
    if (!slug) {
      return {
        lines: [
          out(
            'Usage: open <slug>\nExamples: open navdrishti · open self-hosted-n8n · open brainpulses',
            'error'
          ),
        ],
      };
    }
    const study = getCaseStudy(caseStudies, slug);
    if (!study) {
      return { lines: [out(`Case study not found: ${slug}`, 'error')] };
    }
    return {
      lines: [out(`Opening ${study.name} (${study.category})…`)],
      navigate: getCaseStudyPath(study),
    };
  }

  if (command === 'download') {
    return {
      lines: [
        out(
          profile.resumeUrl
            ? `Resume PDF: ${profile.resumeUrl}\nOpening resume page for preview + download.`
            : 'No resume PDF is published yet.\nOpening resume page for preview.'
        ),
      ],
      navigate: '/resume',
    };
  }

  if (command === 'socials') {
    return {
      lines: [
        out(
          [
            `GitHub:   ${profile.socials.github}`,
            `LinkedIn: ${profile.socials.linkedin}`,
            `Email:    ${profile.email}`,
          ].join('\n')
        ),
      ],
    };
  }

  if (command === 'version') {
    return {
      lines: [
        out(
          `rushak-portfolio v${portfolio.siteVersion}\nReact · TypeScript · Vite · Tailwind · Framer Motion`
        ),
      ],
    };
  }

  if (command === 'whoami') {
    return {
      lines: [
        out(
          `${profile.shortName.toLowerCase()} — ${profile.role.toLowerCase()}\nOwns business problems through architecture, delivery, automation, and production.`
        ),
      ],
    };
  }

  if (command === 'deploy') {
    return {
      lines: [
        out(
          [
            'deploy@platform:~$ initiating rollout',
            '  ✓ health checks passed',
            '  ✓ migrations verified',
            '  ✓ staging validated',
            '  ✓ progressive traffic shift',
            '  ✓ monitors green',
            'status: deployed with calm confidence.',
          ].join('\n'),
          'success'
        ),
      ],
    };
  }

  if (command === 'coffee') {
    return {
      lines: [
        out(
          'Brewing… productivity +1. Platform ownership remains caffeinated. ☕'
        ),
      ],
    };
  }

  if (input === 'sudo hire rushak') {
    return {
      lines: [
        out(
          [
            'Permission granted.',
            'Recommendation: schedule a conversation.',
            'Expected outcome: someone who owns engineering outcomes end-to-end.',
          ].join('\n'),
          'success'
        ),
      ],
      navigate: '/contact',
    };
  }

  return {
    lines: [
      out(
        `Command not found: ${raw}\nType \`help\` for available commands.`,
        'error'
      ),
    ],
  };
}
