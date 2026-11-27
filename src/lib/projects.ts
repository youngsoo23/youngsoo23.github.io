import { getIcon, type IconSource } from '@/lib/icons';

export type ProjectLinkKind = 'github' | 'demo';

export interface ProjectLink {
  kind: ProjectLinkKind;
  url: string;
}

interface ProjectLinkDefinition {
  label: string;
  icon: IconSource;
  getAriaLabel: (projectName: string) => string;
}

export const PROJECT_LINK_DEFINITIONS: Record<ProjectLinkKind, ProjectLinkDefinition> = {
  github: {
    label: 'GitHub',
    icon: getIcon('brand-github'),
    getAriaLabel: (projectName: string): string => `${projectName} GitHub 저장소`,
  },
  demo: {
    label: 'Demo',
    icon: getIcon('external-link'),
    getAriaLabel: (projectName: string): string => `${projectName} 데모`,
  },
};
