'use client';

import { Mic, Minus, TrendingDown, TrendingUp, Users } from 'lucide-react';
import React, { useState } from 'react';
import { DecisionTimer } from './DecisionTimer';

interface PressQuestion {
  id: string;
  journalist: string;
  media: string;
  question: string;
  responses: {
    text: string;
    effects: {
      popularidad?: number;
      economia?: number;
      caos?: number;
      humor?: string;
    };
  }[];
  timeLimit: number;
}

interface PoliticalMetrics {
  popularidad: number;
  economia: number;
  inflacion: number;
  dolarBlue: number;
  caos: number;
}

// Banco de preguntas ampliado con efectos reducidos
const ALL_PRESS_QUESTIONS: PressQuestion[] = [
  // === ECONOMÍA ===
  {
    id: 'asado-crisis',
    journalist: 'Mirtha Legrand Jr.',
    media: 'Canal del Pueblo',
    question: '¿Es verdad que usted desayuna caviar mientras los argentinos no pueden comprar asado?',
    timeLimit: 20,
    responses: [
      {
        text: 'Yo como polenta como todos los argentinos de bien',
        effects: { popularidad: 1, humor: 'La gente aplaude tu humildad' }
      },
      {
        text: 'El caviar es un invento de la derecha, yo como empanadas',
        effects: { popularidad: 2, humor: 'Los memes se vuelven virales' }
      },
      {
        text: 'No respondo preguntas estúpidas, siguiente',
        effects: { popularidad: -1, caos: 1, humor: 'Los periodistas se ofenden' }
      }
    ]
  },
  {
    id: 'dolar-explanation',
    journalist: 'Eduardo Feinmann Clon',
    media: 'Radio Golpe',
    question: '¿Por qué el dólar blue está más caro que un asado en Puerto Madero?',
    timeLimit: 25,
    responses: [
      {
        text: 'Es culpa del gobierno anterior y de los especuladores',
        effects: { popularidad: 1, humor: 'Respuesta clásica política' }
      },
      {
        text: 'Vamos a crear el peso quantum que vale más que el dólar',
        effects: { caos: 1, humor: 'Los economistas se confunden' }
      },
      {
        text: 'El dólar blue es una construcción social, no existe',
        effects: { popularidad: -1, caos: 2, humor: 'Twitter explota con memes' }
      }
    ]
  },
  {
    id: 'inflacion-pregunta',
    journalist: 'Alfredo Casero Bot',
    media: 'Radio La Red',
    question: '¿Cuándo va a bajar la inflación que está matando a las familias?',
    timeLimit: 22,
    responses: [
      {
        text: 'Ya está bajando, solo que no se nota',
        effects: { popularidad: -1, humor: 'Nadie le cree' }
      },
      {
        text: 'Vamos a crear inflación negativa',
        effects: { caos: 1, humor: 'Los economistas explotan' }
      },
      {
        text: 'Es responsabilidad de los formadores de precios',
        effects: { popularidad: 1, humor: 'Culpar a otros funciona' }
      }
    ]
  },

  // === CORRUPCIÓN ===
  {
    id: 'corruption-scandal',
    journalist: 'Jorge Rial 2.0',
    media: 'Intrusos Políticos',
    question: '¿Es cierto que su primo compró 47 departamentos con planes sociales?',
    timeLimit: 18,
    responses: [
      {
        text: 'Mi primo es un emprendedor nato del sector inmobiliario',
        effects: { popularidad: -2, humor: 'La explicación no convence a nadie' }
      },
      {
        text: 'Esos departamentos son para familias humildes, obvio',
        effects: { popularidad: 1, humor: 'Algunos creen, otros dudan' }
      },
      {
        text: '¿Y vos cuántos departamentos tiene tu primo?',
        effects: { popularidad: 1, humor: 'Contraataque exitoso' }
      }
    ]
  },
  {
    id: 'sobres-ministerio',
    journalist: 'Luis Majul Virtual',
    media: 'La Nación +',
    question: '¿Puede explicar los sobres que entran y salen del ministerio a las 3 AM?',
    timeLimit: 20,
    responses: [
      {
        text: 'Son expedientes urgentes de obras públicas',
        effects: { popularidad: -1, humor: 'Explicación dudosa' }
      },
      {
        text: 'Trabajamos 24/7 para la gente',
        effects: { popularidad: 1, humor: 'Dedicación extrema' }
      },
      {
        text: 'Eso es fake news de la oposición',
        effects: { caos: 1, humor: 'Negación total' }
      }
    ]
  },

  // === DEPORTES ===
  {
    id: 'football-crisis',
    journalist: 'Marcelo Tinelli Hologram',
    media: 'ShowMatch News',
    question: '¿Va a prohibir el fútbol porque River y Boca no lo apoyan políticamente?',
    timeLimit: 22,
    responses: [
      {
        text: 'El fútbol es sagrado, jamás tocaría eso',
        effects: { popularidad: 2, humor: 'Los hinchas aplauden' }
      },
      {
        text: 'Voy a crear la Liga Nacional Peronista con equipos nuevos',
        effects: { popularidad: -1, caos: 3, humor: 'El país se divide en dos' }
      },
      {
        text: 'Solo prohibiría el VAR porque es antidemocrático',
        effects: { popularidad: 3, humor: 'Unión nacional contra el VAR' }
      }
    ]
  },
  {
    id: 'messi-presidente',
    journalist: 'Alejandro Fantino Clone',
    media: 'ESPN Argentina',
    question: '¿Es verdad que le ofreció la vicepresidencia a Messi?',
    timeLimit: 18,
    responses: [
      {
        text: 'Messi ya es presidente de todos los corazones',
        effects: { popularidad: 2, humor: 'Respuesta emotiva' }
      },
      {
        text: 'Estamos evaluando su candidatura',
        effects: { caos: 1, humor: 'Posibilidad real?' }
      },
      {
        text: 'Prefiero a Maradona, pero está ocupado en el cielo',
        effects: { popularidad: 1, humor: 'Homenaje emotivo' }
      }
    ]
  },

  // === SEGURIDAD ===
  {
    id: 'inseguridad-palermo',
    journalist: 'Viviana Canosa AI',
    media: 'A24',
    question: '¿Qué va a hacer con la inseguridad en Palermo que afecta a la clase media?',
    timeLimit: 24,
    responses: [
      {
        text: 'Vamos a poner un policía en cada esquina',
        effects: { popularidad: 1, humor: 'Propuesta imposible' }
      },
      {
        text: 'La inseguridad es culpa de la desigualdad',
        effects: { popularidad: -1, humor: 'Análisis sociológico' }
      },
      {
        text: 'Palermo tiene que defenderse solo',
        effects: { popularidad: -2, caos: 1, humor: 'Abandono total' }
      }
    ]
  },

  // === INTERNACIONAL ===
  {
    id: 'relaciones-brasil',
    journalist: 'Nelson Castro Bot',
    media: 'Radio Rivadavia',
    question: '¿Por qué Lula no le contesta los WhatsApp?',
    timeLimit: 20,
    responses: [
      {
        text: 'Está muy ocupado salvando la Amazonía',
        effects: { popularidad: 1, humor: 'Excusa ecológica' }
      },
      {
        text: 'Me tiene bloqueado por mandarle memes',
        effects: { popularidad: 2, humor: 'Honestidad brutal' }
      },
      {
        text: 'Prefiero hablar con Bolsonaro igual',
        effects: { popularidad: -1, caos: 2, humor: 'Declaración polémica' }
      }
    ]
  },

  // === BIZARRO/HUMOR ===
  {
    id: 'alien-question',
    journalist: 'Chiche Gelblung Android',
    media: 'Canal Paranormal',
    question: '¿Es verdad que los extraterrestres le dijeron cómo arreglar la economía?',
    timeLimit: 15,
    responses: [
      {
        text: 'Los ovnis solo me enseñaron a hacer empanadas',
        effects: { popularidad: 2, humor: 'La gente ama la honestidad bizarra' }
      },
      {
        text: 'No puedo revelar secretos de estado galácticos',
        effects: { caos: 1, humor: 'Conspiranóicos enloquecen' }
      },
      {
        text: 'Los aliens son trolos y me mintieron',
        effects: { popularidad: 2, humor: 'Meme instantáneo' }
      }
    ]
  },
  {
    id: 'tango-policy',
    journalist: 'Susana Giménez AI',
    media: 'Telefe Eterno',
    question: '¿Por qué obligó a todos los ministerios a bailar tango en las reuniones?',
    timeLimit: 20,
    responses: [
      {
        text: 'El tango mejora la productividad estatal en un 300%',
        effects: { popularidad: 1, humor: 'Algunos lo creen' }
      },
      {
        text: 'Es para que los funcionarios no se duerman',
        effects: { popularidad: 2, humor: 'Aplauso general' }
      },
      {
        text: 'Era eso o la cumbia, elegí el mal menor',
        effects: { popularidad: 1, caos: 1, humor: 'Los cumbieros protestan' }
      }
    ]
  },

  // === SALUD ===
  {
    id: 'hospitales-publicos',
    journalist: 'Mónica Gutiérrez Clone',
    media: 'Canal 13',
    question: '¿Cuándo van a arreglar los hospitales públicos que se están cayendo a pedazos?',
    timeLimit: 25,
    responses: [
      {
        text: 'Ya están en proceso las licitaciones',
        effects: { popularidad: 1, humor: 'Promesa eterna' }
      },
      {
        text: 'Los hospitales están bien, solo les falta pintura',
        effects: { popularidad: -2, humor: 'Negación de la realidad' }
      },
      {
        text: 'Vamos a crear hospitales virtuales en el metaverso',
        effects: { caos: 2, humor: 'Innovación cuestionable' }
      }
    ]
  },

  // === TECNOLOGÍA ===
  {
    id: 'internet-gratis',
    journalist: 'Baby Etchecopar 2.0',
    media: 'Radio 10',
    question: '¿Es verdad que va a dar internet gratis pero solo para ver TikTok?',
    timeLimit: 18,
    responses: [
      {
        text: 'TikTok es el futuro de la educación argentina',
        effects: { popularidad: 1, humor: 'Visión futurista' }
      },
      {
        text: 'Primero TikTok, después YouTube, después nada',
        effects: { caos: 1, humor: 'Plan progresivo' }
      },
      {
        text: 'Internet gratis solo para estudiar y trabajar',
        effects: { popularidad: 2, humor: 'Propuesta seria' }
      }
    ]
  }
];

// Función para seleccionar preguntas aleatorias para la conferencia
const getRandomPressQuestions = (count: number): PressQuestion[] => {
  const shuffled = [...ALL_PRESS_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

interface PressConferenceProps {
  onMetricsChange?: (metrics: Partial<PoliticalMetrics>) => void;
  initialMetrics?: PoliticalMetrics;
  isRequired?: boolean;
  urgencyLevel?: number;
}

const PressConference: React.FC<PressConferenceProps> = ({
  onMetricsChange,
  initialMetrics = {
    popularidad: 50,
    economia: 45,
    inflacion: 65,
    dolarBlue: 800,
    caos: 30
  },
  isRequired = false,
  urgencyLevel = 1
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<PressQuestion | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<PressQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [conferenceActive, setConferenceActive] = useState(false);
  const [metrics, setMetrics] = useState<PoliticalMetrics>(initialMetrics);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'warning' | 'error';
  } | null>(null);

  const startConference = () => {
    setConferenceActive(true);
    setQuestionIndex(0);
    setAnsweredQuestions(0);
    // Seleccionar 2-5 preguntas aleatorias para esta conferencia
    const questionCount = Math.floor(Math.random() * 4) + 2; // 2-5 preguntas
    const questions = getRandomPressQuestions(questionCount);
    setSelectedQuestions(questions);
    setCurrentQuestion(questions[0]);
  };

  const endConference = () => {
    setConferenceActive(false);
    setCurrentQuestion(null);
    setNotification({
      message: `¡Conferencia completada! Respondiste ${answeredQuestions} preguntas`,
      type: 'success'
    });
  };

  const handleResponse = (responseIndex: number) => {
    if (!currentQuestion) return;

    const response = currentQuestion.responses[responseIndex];
    const newMetrics = { ...metrics };

    // Aplicar efectos (con efectos muy reducidos)
    Object.entries(response.effects).forEach(([key, value]) => {
      if (key !== 'humor' && typeof value === 'number') {
        if (key in newMetrics) {
          (newMetrics as any)[key] += value;
          // Mantener límites realistas
          if (key === 'dolarBlue') {
            (newMetrics as any)[key] = Math.max(300, Math.min(2000, (newMetrics as any)[key]));
          } else {
            (newMetrics as any)[key] = Math.max(0, Math.min(100, (newMetrics as any)[key]));
          }
        }
      }
    });

    setMetrics(newMetrics);
    onMetricsChange?.(newMetrics);

    // Mostrar notificación del efecto
    if (response.effects.humor) {
      setNotification({
        message: response.effects.humor,
        type: 'success'
      });
    }

    // Siguiente pregunta
    const nextIndex = questionIndex + 1;
    setAnsweredQuestions(prev => prev + 1);

    if (nextIndex < selectedQuestions.length) {
      setTimeout(() => {
        setQuestionIndex(nextIndex);
        setCurrentQuestion(selectedQuestions[nextIndex]);
      }, 2000);
    } else {
      setTimeout(() => {
        endConference();
      }, 2000);
    }
  };

  const handleTimeUp = () => {
    // Auto-respuesta: siempre la más evasiva/política
    if (currentQuestion) {
      const safeResponseIndex = Math.floor(Math.random() * currentQuestion.responses.length);
      handleResponse(safeResponseIndex);

      setNotification({
        message: '¡Se acabó el tiempo! Respondiste automáticamente.',
        type: 'warning'
      });
    }
  };

  const getMetricIcon = (value: number, isPositive: boolean = true) => {
    if (isPositive) {
      return value >= 70 ? <TrendingUp className="text-green-500" /> :
             value >= 40 ? <Minus className="text-yellow-500" /> :
             <TrendingDown className="text-red-500" />;
    } else {
      return value <= 30 ? <TrendingDown className="text-green-500" /> :
             value <= 60 ? <Minus className="text-yellow-500" /> :
             <TrendingUp className="text-red-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-lg border border-purple-500/30">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Mic className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CONFERENCIA DE PRENSA
          </h2>
          <Users className="w-8 h-8 text-purple-400" />
        </div>
        <p className="text-purple-300">
          🎤 Respondé preguntas bizarras de periodistas en tiempo real
        </p>
      </div>

      {/* Métricas actuales */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 p-4 bg-black/20 rounded-lg border border-purple-500/20">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            {getMetricIcon(metrics.popularidad)}
            <span className="text-sm font-medium text-purple-300">Popularidad</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.popularidad}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            {getMetricIcon(metrics.economia)}
            <span className="text-sm font-medium text-purple-300">Economía</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.economia}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            {getMetricIcon(metrics.inflacion, false)}
            <span className="text-sm font-medium text-purple-300">Inflación</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.inflacion}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            {getMetricIcon(metrics.dolarBlue > 1000 ? 80 : metrics.dolarBlue > 600 ? 50 : 20, false)}
            <span className="text-sm font-medium text-purple-300">Dólar Blue</span>
          </div>
          <div className="text-2xl font-bold text-white">${metrics.dolarBlue}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            {getMetricIcon(metrics.caos, false)}
            <span className="text-sm font-medium text-purple-300">Caos</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.caos}%</div>
        </div>
      </div>

      {!conferenceActive ? (
        /* Pantalla inicial */
        <div className="text-center py-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">
              🎬 ¿Listo para enfrentar a la prensa?
            </h3>
            <p className="text-purple-400 mb-2">
              • {ALL_PRESS_QUESTIONS.length} preguntas bizarras de periodistas argentinos
            </p>
            <p className="text-purple-400 mb-2">
              • 15-25 segundos por respuesta (estás EN VIVO)
            </p>
            <p className="text-purple-400 mb-2">
              • 2-5 preguntas aleatorias por conferencia
            </p>
            <p className="text-purple-400 mb-6">
              • Cada respuesta tiene efectos mínimos en las métricas
            </p>
          </div>

          <button
            onClick={startConference}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
                     text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105
                     shadow-lg shadow-purple-500/25"
          >
            🎤 COMENZAR CONFERENCIA
          </button>
        </div>
      ) : (
        /* Conferencia activa */
        <div className="space-y-6">
          {/* Progress */}
          <div className="flex items-center justify-between text-purple-300 text-sm">
            <span>Pregunta {questionIndex + 1} de {selectedQuestions.length}</span>
            <span>Respondidas: {answeredQuestions}</span>
          </div>

          {/* Pregunta actual */}
          {currentQuestion && (
            <div className="space-y-4">
              {/* Info del periodista */}
              <div className="bg-black/30 p-4 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-purple-300">{currentQuestion.journalist}</div>
                    <div className="text-sm text-purple-400">{currentQuestion.media}</div>
                  </div>
                </div>

                <div className="text-lg text-white font-medium">
                  "{currentQuestion.question}"
                </div>
              </div>

              {/* Timer */}
              <DecisionTimer
                timeLimit={currentQuestion.timeLimit}
                onTimeUp={handleTimeUp}
                urgency={currentQuestion.timeLimit <= 15 ? 5 : currentQuestion.timeLimit <= 20 ? 4 : 3}
                isCompact={false}
              />

              {/* Opciones de respuesta */}
              <div className="space-y-3">
                {currentQuestion.responses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleResponse(index)}
                    className="w-full p-4 text-left bg-gradient-to-r from-purple-700/50 to-purple-600/50
                             hover:from-purple-600/70 hover:to-purple-500/70 border border-purple-500/30
                             rounded-lg transition-all duration-200 transform hover:scale-[1.02] text-white"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span>{response.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Botón para terminar anticipadamente */}
          <div className="flex justify-center">
            <button
              onClick={endConference}
              className="px-6 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30
                       text-red-300 rounded-lg transition-all duration-200"
            >
              🚪 Terminar Conferencia
            </button>
          </div>
        </div>
      )}

      {/* Notificaciones */}
      {notification && (
        <div className="mt-4 p-3 bg-purple-900/50 border border-purple-500/50 rounded-lg">
          <p className="text-purple-200">{notification.message}</p>
        </div>
      )}
    </div>
  );
};

export default PressConference;
