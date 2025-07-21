import { FactionId, MetricType, ProvinceId } from './political';

/**
 * Tipos de Decretos de Necesidad y Urgencia (DNU)
 */
export enum DNUType {
  ECONOMICO = 'economico',
  SOCIAL = 'social',
  SEGURIDAD = 'seguridad',
  SALUD = 'salud',
  TECNOLOGIA = 'tecnologia',
  INTERNACIONAL = 'internacional',
  EMERGENCIA = 'emergencia'
}

/**
 * Niveles de urgencia de un DNU
 */
export enum DNUUrgency {
  BAJA = 'baja',           // Urgencia baja - menos consecuencias
  MEDIA = 'media',         // Urgencia media - consecuencias moderadas
  ALTA = 'alta',           // Urgencia alta - consecuencias severas
  CRITICA = 'critica'      // Urgencia crítica - consecuencias extremas
}

/**
 * Estado de un DNU
 */
export enum DNUStatus {
  ACTIVO = 'activo',       // DNU en vigor
  SUSPENDIDO = 'suspendido', // DNU suspendido por la justicia
  REVOCADO = 'revocado',   // DNU revocado por el congreso
  EXPIRADO = 'expirado'    // DNU expirado por tiempo
}

/**
 * Decreto de Necesidad y Urgencia
 */
export interface DNU {
  id: string;
  title: string;
  description: string;
  type: DNUType;
  urgency: DNUUrgency;
  status: DNUStatus;

  // Efectos del DNU
  effects: {
    nationalMetrics: Partial<Record<MetricType, number>>;
    factionEffects: {
      factionId: FactionId;
      supportChange: number;
      description: string;
    }[];
    provincialEffects?: {
      provinceId: ProvinceId;
      effects: {
        loyalty: number;
        discontent: number;
        economicLevel: number;
      };
    }[];
  };

  // Costos y requisitos
  costs: {
    politicalCost: number; // Costo en popularidad
    economicCost: number;  // Costo en economía
    legalRisk: number;     // Riesgo de ser suspendido (0-100)
  };

  // Duración y condiciones
  duration: number; // Días que dura el DNU
  createdAt: number; // Timestamp de creación
  expiresAt: number; // Timestamp de expiración

  // Condiciones para activar
  requirements: {
    minMetrics?: Partial<Record<MetricType, number>>;
    maxMetrics?: Partial<Record<MetricType, number>>;
    minCrisisLevel?: number;
    maxActiveDNUs?: number;
  };

  // Consecuencias de revocación
  revocationEffects: {
    nationalMetrics: Partial<Record<MetricType, number>>;
    factionEffects: {
      factionId: FactionId;
      supportChange: number;
      description: string;
    }[];
  };

  // Opciones de respuesta
  responseOptions: {
    id: string;
    name: string;
    description: string;
    effects: {
      nationalMetrics: Partial<Record<MetricType, number>>;
      factionEffects: {
        factionId: FactionId;
        supportChange: number;
        description: string;
      }[];
    };
    requirements?: {
      minMetrics?: Partial<Record<MetricType, number>>;
      maxMetrics?: Partial<Record<MetricType, number>>;
    };
  }[];
}

/**
 * DNUs predefinidos del sistema
 */
export const SYSTEM_DNUS: DNU[] = [
  // ===== DNUs ECONÓMICOS =====
  {
    id: 'dnu-austeridad-economica',
    title: 'DNU de Austeridad Económica',
    description: 'Decreto que implementa medidas de austeridad drásticas: recorte de gastos públicos, congelamiento de salarios y aumento de impuestos. Es impopular pero mejora las finanzas.',
    type: DNUType.ECONOMICO,
    urgency: DNUUrgency.ALTA,
    status: DNUStatus.ACTIVO,
    effects: {
      nationalMetrics: {
        economia: 15,
        popularidad: -20,
        seguridad: -5
      },
      factionEffects: [
        {
          factionId: FactionId.EMPRESARIOS,
          supportChange: 25,
          description: 'Los empresarios valoran la disciplina fiscal'
        },
        {
          factionId: FactionId.SINDICALISTAS,
          supportChange: -30,
          description: 'Los sindicatos se oponen ferozmente'
        },
        {
          factionId: FactionId.LA_CAMPORA,
          supportChange: -15,
          description: 'La Cámpora ve traición a los trabajadores'
        }
      ]
    },
    costs: {
      politicalCost: 25,
      economicCost: 0,
      legalRisk: 30
    },
    duration: 90,
    createdAt: 0,
    expiresAt: 0,
    requirements: {
      minMetrics: { economia: 30 },
      maxActiveDNUs: 3
    },
    revocationEffects: {
      nationalMetrics: {
        economia: -10,
        popularidad: 15
      },
      factionEffects: [
        {
          factionId: FactionId.SINDICALISTAS,
          supportChange: 20,
          description: 'Los sindicatos celebran la revocación'
        },
        {
          factionId: FactionId.EMPRESARIOS,
          supportChange: -15,
          description: 'Los empresarios ven irresponsabilidad'
        }
      ]
    },
    responseOptions: [
      {
        id: 'defender-austeridad',
        name: 'Defender la austeridad',
        description: 'Defender las medidas de austeridad como necesarias',
        effects: {
          nationalMetrics: { economia: 5, popularidad: -5 },
          factionEffects: [
            {
              factionId: FactionId.EMPRESARIOS,
              supportChange: 10,
              description: 'Los empresarios valoran la consistencia'
            }
          ]
        }
      },
      {
        id: 'flexibilizar-medidas',
        name: 'Flexibilizar las medidas',
        description: 'Suavizar algunas medidas de austeridad',
        effects: {
          nationalMetrics: { economia: -5, popularidad: 10 },
          factionEffects: [
            {
              factionId: FactionId.SINDICALISTAS,
              supportChange: 15,
              description: 'Los sindicatos celebran la flexibilización'
            }
          ]
        }
      }
    ]
  },

  // ===== DNUs SOCIALES =====
  {
    id: 'dnu-emergencia-social',
    title: 'DNU de Emergencia Social',
    description: 'Decreto que declara emergencia social y aumenta el gasto en programas sociales, subsidios y ayudas. Es popular pero costoso.',
    type: DNUType.SOCIAL,
    urgency: DNUUrgency.MEDIA,
    status: DNUStatus.ACTIVO,
    effects: {
      nationalMetrics: {
        popularidad: 25,
        economia: -15,
        salud: 10
      },
      factionEffects: [
        {
          factionId: FactionId.SINDICALISTAS,
          supportChange: 30,
          description: 'Los sindicatos celebran el gasto social'
        },
        {
          factionId: FactionId.LA_CAMPORA,
          supportChange: 20,
          description: 'La Cámpora valora la preocupación social'
        },
        {
          factionId: FactionId.EMPRESARIOS,
          supportChange: -20,
          description: 'Los empresarios ven irresponsabilidad fiscal'
        }
      ]
    },
    costs: {
      politicalCost: 0,
      economicCost: 20,
      legalRisk: 15
    },
    duration: 120,
    createdAt: 0,
    expiresAt: 0,
    requirements: {
      minMetrics: { popularidad: 30 },
      maxActiveDNUs: 2
    },
    revocationEffects: {
      nationalMetrics: {
        popularidad: -20,
        economia: 10
      },
      factionEffects: [
        {
          factionId: FactionId.SINDICALISTAS,
          supportChange: -25,
          description: 'Los sindicatos se enojan por la revocación'
        },
        {
          factionId: FactionId.EMPRESARIOS,
          supportChange: 15,
          description: 'Los empresarios celebran la responsabilidad fiscal'
        }
      ]
    },
    responseOptions: [
      {
        id: 'expandir-programas',
        name: 'Expandir los programas sociales',
        description: 'Aumentar aún más el gasto social',
        effects: {
          nationalMetrics: { popularidad: 10, economia: -10 },
          factionEffects: [
            {
              factionId: FactionId.SINDICALISTAS,
              supportChange: 15,
              description: 'Los sindicatos celebran la expansión'
            }
          ]
        }
      },
      {
        id: 'optimizar-gasto',
        name: 'Optimizar el gasto social',
        description: 'Mejorar la eficiencia del gasto social',
        effects: {
          nationalMetrics: { economia: 5, popularidad: 5 },
          factionEffects: [
            {
              factionId: FactionId.EMPRESARIOS,
              supportChange: 10,
              description: 'Los empresarios valoran la eficiencia'
            }
          ]
        }
      }
    ]
  },

  // ===== DNUs DE SEGURIDAD =====
  {
    id: 'dnu-estado-emergencia',
    title: 'DNU de Estado de Emergencia',
    description: 'Decreto que declara estado de emergencia y otorga poderes especiales a las fuerzas de seguridad. Es efectivo pero muy impopular.',
    type: DNUType.SEGURIDAD,
    urgency: DNUUrgency.CRITICA,
    status: DNUStatus.ACTIVO,
    effects: {
      nationalMetrics: {
        seguridad: 25,
        popularidad: -30,
        relacionesInternacionales: -15
      },
      factionEffects: [
        {
          factionId: FactionId.MILITARES,
          supportChange: 40,
          description: 'Los militares ganan poder significativo'
        },
        {
          factionId: FactionId.OPOSICION,
          supportChange: 35,
          description: 'La oposición gana mucho terreno'
        },
        {
          factionId: FactionId.BARRAS_BRAVAS,
          supportChange: -20,
          description: 'Las barras bravas ven restricciones'
        }
      ]
    },
    costs: {
      politicalCost: 40,
      economicCost: 10,
      legalRisk: 60
    },
    duration: 30,
    createdAt: 0,
    expiresAt: 0,
    requirements: {
      minMetrics: { seguridad: 20 },
      minCrisisLevel: 4,
      maxActiveDNUs: 1
    },
    revocationEffects: {
      nationalMetrics: {
        seguridad: -15,
        popularidad: 20,
        relacionesInternacionales: 10
      },
      factionEffects: [
        {
          factionId: FactionId.MILITARES,
          supportChange: -25,
          description: 'Los militares ven pérdida de poder'
        },
        {
          factionId: FactionId.OPOSICION,
          supportChange: -10,
          description: 'La oposición pierde algo de apoyo'
        }
      ]
    },
    responseOptions: [
      {
        id: 'intensificar-seguridad',
        name: 'Intensificar las medidas de seguridad',
        description: 'Aumentar aún más las medidas de seguridad',
        effects: {
          nationalMetrics: { seguridad: 10, popularidad: -15 },
          factionEffects: [
            {
              factionId: FactionId.MILITARES,
              supportChange: 20,
              description: 'Los militares ganan más poder'
            }
          ]
        }
      },
      {
        id: 'suavizar-medidas',
        name: 'Suavizar las medidas de seguridad',
        description: 'Reducir algunas medidas de seguridad',
        effects: {
          nationalMetrics: { seguridad: -10, popularidad: 15 },
          factionEffects: [
            {
              factionId: FactionId.OPOSICION,
              supportChange: -15,
              description: 'La oposición pierde apoyo'
            }
          ]
        }
      }
    ]
  },

  // ===== DNUs DE SALUD =====
  {
    id: 'dnu-emergencia-sanitaria',
    title: 'DNU de Emergencia Sanitaria',
    description: 'Decreto que declara emergencia sanitaria y otorga poderes especiales al ministerio de salud. Es necesario pero costoso.',
    type: DNUType.SALUD,
    urgency: DNUUrgency.ALTA,
    status: DNUStatus.ACTIVO,
    effects: {
      nationalMetrics: {
        salud: 20,
        economia: -10,
        popularidad: 15
      },
      factionEffects: [
        {
          factionId: FactionId.SINDICALISTAS,
          supportChange: 20,
          description: 'Los sindicatos de salud celebran'
        },
        {
          factionId: FactionId.EMPRESARIOS,
          supportChange: -10,
          description: 'Los empresarios ven costos adicionales'
        }
      ]
    },
    costs: {
      politicalCost: 5,
      economicCost: 15,
      legalRisk: 20
    },
    duration: 60,
    createdAt: 0,
    expiresAt: 0,
    requirements: {
      minMetrics: { salud: 40 },
      maxActiveDNUs: 2
    },
    revocationEffects: {
      nationalMetrics: {
        salud: -10,
        popularidad: -5
      },
      factionEffects: [
        {
          factionId: FactionId.SINDICALISTAS,
          supportChange: -15,
          description: 'Los sindicatos de salud se enojan'
        }
      ]
    },
    responseOptions: [
      {
        id: 'expandir-medidas',
        name: 'Expandir las medidas sanitarias',
        description: 'Aumentar las medidas de emergencia sanitaria',
        effects: {
          nationalMetrics: { salud: 10, economia: -5 },
          factionEffects: [
            {
              factionId: FactionId.SINDICALISTAS,
              supportChange: 15,
              description: 'Los sindicatos de salud celebran'
            }
          ]
        }
      },
      {
        id: 'optimizar-recursos',
        name: 'Optimizar recursos sanitarios',
        description: 'Mejorar la eficiencia del gasto sanitario',
        effects: {
          nationalMetrics: { economia: 5, salud: 5 },
          factionEffects: [
            {
              factionId: FactionId.EMPRESARIOS,
              supportChange: 10,
              description: 'Los empresarios valoran la eficiencia'
            }
          ]
        }
      }
    ]
  },

  // ===== DNUs DE TECNOLOGÍA =====
  {
    id: 'dnu-emergencia-tecnologica',
    title: 'DNU de Emergencia Tecnológica',
    description: 'Decreto que declara emergencia tecnológica y otorga poderes especiales para modernizar el país. Es visionario pero costoso.',
    type: DNUType.TECNOLOGIA,
    urgency: DNUUrgency.MEDIA,
    status: DNUStatus.ACTIVO,
    effects: {
      nationalMetrics: {
        tecnologia: 25,
        economia: -20,
        popularidad: 10
      },
      factionEffects: [
        {
          factionId: FactionId.EMPRESARIOS,
          supportChange: 25,
          description: 'Los empresarios tecnológicos prosperan'
        },
        {
          factionId: FactionId.LA_CAMPORA,
          supportChange: -10,
          description: 'La Cámpora ve gasto innecesario'
        }
      ]
    },
    costs: {
      politicalCost: 10,
      economicCost: 25,
      legalRisk: 25
    },
    duration: 90,
    createdAt: 0,
    expiresAt: 0,
    requirements: {
      minMetrics: { tecnologia: 30 },
      maxActiveDNUs: 2
    },
    revocationEffects: {
      nationalMetrics: {
        tecnologia: -15,
        economia: 10
      },
      factionEffects: [
        {
          factionId: FactionId.EMPRESARIOS,
          supportChange: -20,
          description: 'Los empresarios tecnológicos se enojan'
        },
        {
          factionId: FactionId.LA_CAMPORA,
          supportChange: 10,
          description: 'La Cámpora celebra el ahorro'
        }
      ]
    },
    responseOptions: [
      {
        id: 'expandir-tecnologia',
        name: 'Expandir la modernización tecnológica',
        description: 'Aumentar la inversión en tecnología',
        effects: {
          nationalMetrics: { tecnologia: 10, economia: -10 },
          factionEffects: [
            {
              factionId: FactionId.EMPRESARIOS,
              supportChange: 15,
              description: 'Los empresarios tecnológicos celebran'
            }
          ]
        }
      },
      {
        id: 'optimizar-inversion',
        name: 'Optimizar la inversión tecnológica',
        description: 'Mejorar la eficiencia de la inversión tecnológica',
        effects: {
          nationalMetrics: { economia: 5, tecnologia: 5 },
          factionEffects: [
            {
              factionId: FactionId.LA_CAMPORA,
              supportChange: 5,
              description: 'La Cámpora valora la eficiencia'
            }
          ]
        }
      }
    ]
  }
];

/**
 * Gestor de DNUs
 */
export class DNUManager {
  private activeDNUs: Map<string, DNU> = new Map();
  private dnuHistory: DNU[] = [];

  /**
   * Emite un nuevo DNU
   */
  emitDNU(dnuId: string, metrics: Record<MetricType, number>): DNU | null {
    const dnuTemplate = SYSTEM_DNUS.find(d => d.id === dnuId);
    if (!dnuTemplate) return null;

    // Verificar requisitos
    if (!this.checkDNURequirements(dnuTemplate, metrics)) {
      return null;
    }

    const now = Date.now();
    const dnu: DNU = {
      ...dnuTemplate,
      createdAt: now,
      expiresAt: now + (dnuTemplate.duration * 24 * 60 * 60 * 1000),
      status: DNUStatus.ACTIVO
    };

    this.activeDNUs.set(dnu.id, dnu);
    this.dnuHistory.push(dnu);

    return dnu;
  }

  /**
   * Revoca un DNU activo
   */
  revokeDNU(dnuId: string): boolean {
    const dnu = this.activeDNUs.get(dnuId);
    if (!dnu) return false;

    dnu.status = DNUStatus.REVOCADO;
    this.activeDNUs.delete(dnuId);

    return true;
  }

  /**
   * Suspende un DNU por la justicia
   */
  suspendDNU(dnuId: string): boolean {
    const dnu = this.activeDNUs.get(dnuId);
    if (!dnu) return false;

    dnu.status = DNUStatus.SUSPENDIDO;
    return true;
  }

  /**
   * Verifica si un DNU ha expirado
   */
  checkExpiredDNUs(): string[] {
    const now = Date.now();
    const expiredIds: string[] = [];

    this.activeDNUs.forEach((dnu, id) => {
      if (dnu.expiresAt <= now) {
        dnu.status = DNUStatus.EXPIRADO;
        expiredIds.push(id);
      }
    });

    expiredIds.forEach(id => this.activeDNUs.delete(id));
    return expiredIds;
  }

  /**
   * Obtiene todos los DNUs activos
   */
  getActiveDNUs(): DNU[] {
    return Array.from(this.activeDNUs.values());
  }

  /**
   * Obtiene el historial de DNUs
   */
  getDNUHistory(): DNU[] {
    return [...this.dnuHistory];
  }

  /**
   * Verifica los requisitos para emitir un DNU
   */
  private checkDNURequirements(dnu: DNU, metrics: Record<MetricType, number>): boolean {
    const { requirements } = dnu;

    // Verificar métricas mínimas
    if (requirements.minMetrics) {
      for (const [metric, condition] of Object.entries(requirements.minMetrics)) {
        if (metrics[metric as MetricType] < condition) {
          return false;
        }
      }
    }

    // Verificar métricas máximas
    if (requirements.maxMetrics) {
      for (const [metric, condition] of Object.entries(requirements.maxMetrics)) {
        if (metrics[metric as MetricType] > condition) {
          return false;
        }
      }
    }

    // Verificar número máximo de DNUs activos
    if (requirements.maxActiveDNUs && this.activeDNUs.size >= requirements.maxActiveDNUs) {
      return false;
    }

    return true;
  }

  /**
   * Aplica los efectos de todos los DNUs activos
   */
  applyDNUEffects(): {
    metricModifiers: Partial<Record<MetricType, number>>;
    factionEffects: Array<{
      factionId: FactionId;
      supportChange: number;
      description: string;
    }>;
  } {
    const metricModifiers: Partial<Record<MetricType, number>> = {};
    const factionEffects: Array<{
      factionId: FactionId;
      supportChange: number;
      description: string;
    }> = [];

    this.activeDNUs.forEach(dnu => {
      // Aplicar efectos en métricas nacionales
      Object.entries(dnu.effects.nationalMetrics).forEach(([metric, value]) => {
        metricModifiers[metric as MetricType] = (metricModifiers[metric as MetricType] || 0) + value;
      });

      // Aplicar efectos en facciones
      dnu.effects.factionEffects.forEach(effect => {
        factionEffects.push(effect);
      });
    });

    return { metricModifiers, factionEffects };
  }

  /**
   * Obtiene DNUs disponibles según el estado actual
   */
  getAvailableDNUs(metrics: Record<MetricType, number>, crisisLevel: number): DNU[] {
    return SYSTEM_DNUS.filter(dnu => {
      // Verificar requisitos básicos
      if (!this.checkDNURequirements(dnu, metrics)) {
        return false;
      }

      // Verificar nivel de crisis si es requerido
      if (dnu.requirements.minCrisisLevel && crisisLevel < dnu.requirements.minCrisisLevel) {
        return false;
      }

      // Verificar que no esté ya activo
      if (this.activeDNUs.has(dnu.id)) {
        return false;
      }

      return true;
    });
  }
}
