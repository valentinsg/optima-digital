/**
 * PRESIDENCIAL BARDO - Sistema de Habilidades RPG
 * Habilidades absurdas pero creíbles para el presidente
 */

import { Skill } from '../types/political';

// ===== RAMA COMBATE =====

export const COMBAT_SKILLS: Skill[] = [
  {
    id: 'laser-dolar-blue',
    name: 'Láser de Dólar Blue',
    description: 'Convierte la crisis monetaria en poder destructivo. Proyectiles con daño basado en la inflación.',
    branch: 'combate',
    level: 1,
    cost: 2,
    effects: [
      { type: 'damage', value: 25, description: '+25% daño de proyectiles' }
    ],
    unlockRequirement: { minLevel: 3 }
  },
  {
    id: 'escudo-inflacion',
    name: 'Escudo de Inflación',
    description: 'La inflación te protege literalmente. Absorbe daño proporcional a la tasa inflacionaria.',
    branch: 'combate',
    level: 1,
    cost: 2,
    effects: [
      { type: 'health', value: 50, description: '+50 vida máxima' }
    ],
    unlockRequirement: { minLevel: 2 }
  },
  {
    id: 'rafaga-subsidios',
    name: 'Ráfaga de Subsidios',
    description: 'Dispara subsidios como proyectiles. Más cantidad = más caos.',
    branch: 'combate',
    level: 2,
    cost: 3,
    effects: [
      { type: 'projectileCount', value: 2, description: '+2 proyectiles simultáneos' }
    ],
    unlockRequirement: { minLevel: 5, requiredSkills: ['laser-dolar-blue'] }
  },
  {
    id: 'teleport-dnu',
    name: 'Teleport DNU',
    description: 'Teletransporte instantáneo firmando un DNU. Porque el poder no conoce límites.',
    branch: 'combate',
    level: 1,
    cost: 3,
    effects: [
      { type: 'speed', value: 30, description: '+30% velocidad de movimiento' }
    ],
    unlockRequirement: { minLevel: 4 }
  },
  {
    id: 'modo-berserker-crisis',
    name: 'Modo Berserker Crisis',
    description: 'Más crisis = más poder. El caos alimenta tu furia presidencial.',
    branch: 'combate',
    level: 3,
    cost: 4,
    effects: [
      { type: 'damage', value: 50, description: '+50% daño' },
      { type: 'castRate', value: 40, description: '+40% velocidad de disparo' }
    ],
    unlockRequirement: { minLevel: 8, requiredSkills: ['rafaga-subsidios', 'teleport-dnu'] }
  }
];

// ===== RAMA POLÍTICA =====

export const POLITICAL_SKILLS: Skill[] = [
  {
    id: 'alianza-barras',
    name: 'Alianza con las Barras',
    description: 'Pacto secreto con las barras bravas. Porque el fútbol mueve masas.',
    branch: 'politica',
    level: 1,
    cost: 2,
    effects: [
      { type: 'factionBoost', value: 15, description: '+15% soporte con Barras Bravas' }
    ],
    unlockRequirement: { minLevel: 2 }
  },
  {
    id: 'propaganda-masiva',
    name: 'Propaganda Masiva',
    description: 'Control total de medios. La realidad es lo que vos digas.',
    branch: 'politica',
    level: 2,
    cost: 3,
    effects: [
      { type: 'factionBoost', value: 10, description: '+10% soporte con todas las facciones' }
    ],
    unlockRequirement: { minLevel: 4 }
  },
  {
    id: 'reforma-provincial',
    name: 'Reforma Provincial Express',
    description: 'Cambia leyes provinciales con un chasquido. Federalismo a tu medida.',
    branch: 'politica',
    level: 1,
    cost: 2,
    effects: [
      { type: 'provinceBoost', value: 20, description: '+20% lealtad en provincias aliadas' }
    ],
    unlockRequirement: { minLevel: 3 }
  },
  {
    id: 'pacto-sindical',
    name: 'Pacto Sindical Eterno',
    description: 'Alianza inquebrantable con sindicatos. El poder gremial es tuyo.',
    branch: 'politica',
    level: 2,
    cost: 3,
    effects: [
      { type: 'factionBoost', value: 25, description: '+25% soporte con Sindicatos' }
    ],
    unlockRequirement: { minLevel: 6, requiredSkills: ['alianza-barras'] }
  },
  {
    id: 'dictadura-democratica',
    name: 'Dictadura Democrática',
    description: 'El arte de ser dictador siendo elegido. Combo imposible pero argentino.',
    branch: 'politica',
    level: 3,
    cost: 5,
    effects: [
      { type: 'factionBoost', value: 20, description: '+20% soporte con todas las facciones' },
      { type: 'provinceBoost', value: 15, description: '+15% control en todas las provincias' }
    ],
    unlockRequirement: { minLevel: 10, requiredSkills: ['propaganda-masiva', 'pacto-sindical'] }
  }
];

// ===== RAMA ECONOMÍA =====

export const ECONOMIC_SKILLS: Skill[] = [
  {
    id: 'imprenta-infinita',
    name: 'Imprenta de Billetes Infinita',
    description: 'Más plata = más problemas, pero también más poder.',
    branch: 'economia',
    level: 1,
    cost: 2,
    effects: [
      { type: 'damage', value: 20, description: '+20% daño (pagado con billetes)' }
    ],
    unlockRequirement: { minLevel: 2 }
  },
  {
    id: 'economia-paralela',
    name: 'Economía Paralela',
    description: 'Múltiples dólares, múltiples realidades. El blue es tu amigo.',
    branch: 'economia',
    level: 2,
    cost: 3,
    effects: [
      { type: 'speed', value: 25, description: '+25% velocidad (comprando con blue)' }
    ],
    unlockRequirement: { minLevel: 3 }
  },
  {
    id: 'subsidio-universal',
    name: 'Subsidio Universal Caótico',
    description: 'Subsidios para todo y todos. Incluso para tus enemigos.',
    branch: 'economia',
    level: 1,
    cost: 2,
    effects: [
      { type: 'health', value: 30, description: '+30 vida (subsidio médico)' }
    ],
    unlockRequirement: { minLevel: 4 }
  },
  {
    id: 'exportacion-crisis',
    name: 'Exportación de Crisis',
    description: 'Vendé tu crisis al mundo. Si no podés solucionarla, exportala.',
    branch: 'economia',
    level: 2,
    cost: 4,
    effects: [
      { type: 'projectileCount', value: 3, description: '+3 proyectiles (exportados)' }
    ],
    unlockRequirement: { minLevel: 7, requiredSkills: ['economia-paralela'] }
  },
  {
    id: 'megadevaluacion',
    name: 'Megadevaluación Estratégica',
    description: 'Devaluá tanto que das la vuelta al mundo. Economía cuántica.',
    branch: 'economia',
    level: 3,
    cost: 5,
    effects: [
      { type: 'damage', value: 75, description: '+75% daño' },
      { type: 'castRate', value: 50, description: '+50% velocidad de disparo' }
    ],
    unlockRequirement: { minLevel: 12, requiredSkills: ['imprenta-infinita', 'exportacion-crisis'] }
  }
];

// ===== EXPORTACIONES =====

export const ALL_SKILLS = [
  ...COMBAT_SKILLS,
  ...POLITICAL_SKILLS,
  ...ECONOMIC_SKILLS
];

export function getSkillById(id: string): Skill | undefined {
  return ALL_SKILLS.find(skill => skill.id === id);
}

export function getSkillsByBranch(branch: 'combate' | 'politica' | 'economia'): Skill[] {
  return ALL_SKILLS.filter(skill => skill.branch === branch);
}

export function canUnlockSkill(skill: Skill, playerLevel: number, playerSkills: Record<string, number>): boolean {
  // Verificar nivel mínimo
  if (playerLevel < skill.unlockRequirement.minLevel) {
    return false;
  }

  // Verificar habilidades requeridas
  if (skill.unlockRequirement.requiredSkills) {
    for (const requiredSkillId of skill.unlockRequirement.requiredSkills) {
      if (!playerSkills[requiredSkillId] || playerSkills[requiredSkillId] === 0) {
        return false;
      }
    }
  }

  return true;
}
