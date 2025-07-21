'use client';

import { AlertTriangle, Crown, DollarSign, Mic, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import EventNotification from './EventNotification';
import PoliticalEventSimulator from './PoliticalEventSimulator';
import PressConference from './PressConference';

interface NationalState {
  // Métricas principales
  popularidad: number;
  economia: number;
  inflacion: number;
  dolarBlue: number;
  caos: number;

  // Métricas extendidas
  riesgosPais: number;
  reservas: number;
  desempleo: number;
  pobreza: number;

  // Estado del presidente
  diasEnElCargo: number;
  nivel: number;
  experiencia: number;

  // Eventos activos
  eventosActivos: string[];
  ultimaDecision: {
    tipo: 'evento' | 'conferencia';
    descripcion: string;
    timestamp: Date;
  } | null;
}

interface GameEvent {
  id: string;
  tipo: 'evento-politico' | 'conferencia' | 'crisis-automatica';
  titulo: string;
  descripcion: string;
  disponible: boolean;
  cooldown?: number;
}

const INITIAL_STATE: NationalState = {
  popularidad: 50,
  economia: 45,
  inflacion: 65,
  dolarBlue: 800,
  caos: 30,
  riesgosPais: 1200,
  reservas: 12000,
  desempleo: 8.5,
  pobreza: 35,
  diasEnElCargo: 1,
  nivel: 1,
  experiencia: 0,
  eventosActivos: [],
  ultimaDecision: null
};

const PoliticalGameplayTester: React.FC = () => {
  const [nationalState, setNationalState] = useState<NationalState>(INITIAL_STATE);
  const [activeMode, setActiveMode] = useState<'dashboard' | 'eventos' | 'conferencia'>('dashboard');
  const [gameEvents, setGameEvents] = useState<GameEvent[]>([
    {
      id: 'evento-urgente',
      tipo: 'evento-politico',
      titulo: 'Crisis Política',
      descripcion: 'Evento político estratégico',
      disponible: true
    },
    {
      id: 'conferencia-semanal',
      tipo: 'conferencia',
      titulo: 'Conferencia de Prensa',
      descripcion: 'Sesión de preguntas con periodistas',
      disponible: true,
      cooldown: 0
    }
  ]);
  const [notifications, setNotifications] = useState<{
    id: string;
    message: string;
    type: 'success' | 'warning' | 'error';
    timestamp: Date;
  }[]>([]);

  // Efectos automáticos cada 30 segundos (simulando paso del tiempo)
  useEffect(() => {
    const interval = setInterval(() => {
      setNationalState(prev => {
        const newState = { ...prev };

        // Paso del tiempo
        newState.diasEnElCargo += 1;

        // Efectos automáticos basados en métricas
        if (newState.caos > 80) {
          newState.popularidad = Math.max(0, newState.popularidad - 2);
          addNotification('El caos extremo está afectando tu popularidad', 'error');
        }

        if (newState.economia < 20) {
          newState.desempleo = Math.min(50, newState.desempleo + 0.5);
          newState.pobreza = Math.min(80, newState.pobreza + 1);
        }

        if (newState.inflacion > 80) {
          newState.dolarBlue = Math.min(3000, newState.dolarBlue + 10);
        }

        // Eventos aleatorios
        if (Math.random() < 0.1 && newState.diasEnElCargo % 5 === 0) {
          triggerRandomEvent();
        }

        return newState;
      });
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, []);

  const addNotification = (message: string, type: 'success' | 'warning' | 'error') => {
    const notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev.slice(-4), notification]);

    // Auto-remove después de 5 segundos
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const triggerRandomEvent = () => {
    const events = [
      'Se declaró una tormenta política en redes sociales',
      'Los mercados reaccionan nerviosamente a tus últimas decisiones',
      'Un grupo de economistas cuestiona tu política económica',
      'Los sindicatos amenazan con paro general',
      'La oposición presenta una moción de censura'
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    addNotification(randomEvent, 'warning');
  };

  const handleMetricsChange = (newMetrics: Partial<NationalState>, source: 'evento' | 'conferencia') => {
    setNationalState(prev => {
      const updated = { ...prev, ...newMetrics };

      // Calcular experiencia ganada
      const expGain = source === 'evento' ? 15 : 5;
      updated.experiencia += expGain;

      // Level up cada 100 exp
      if (updated.experiencia >= 100) {
        updated.nivel += 1;
        updated.experiencia = 0;
        addNotification(`¡Subiste a nivel ${updated.nivel}! Más opciones disponibles`, 'success');
      }

      // Registrar última decisión
      updated.ultimaDecision = {
        tipo: source,
        descripcion: `Afectó ${Object.keys(newMetrics).join(', ')}`,
        timestamp: new Date()
      };

      return updated;
    });

    addNotification(
      `Decisión ${source === 'evento' ? 'política' : 'de prensa'} afectó el estado nacional`,
      'success'
    );
  };

  const getMetricColor = (value: number, isPositive: boolean = true) => {
    if (isPositive) {
      if (value >= 70) return 'text-green-400';
      if (value >= 40) return 'text-yellow-400';
      return 'text-red-400';
    } else {
      if (value <= 30) return 'text-green-400';
      if (value <= 60) return 'text-yellow-400';
      return 'text-red-400';
    }
  };

  const getMetricIcon = (value: number, isPositive: boolean = true) => {
    if (isPositive) {
      return value >= 70 ? <TrendingUp className="w-4 h-4" /> :
             value >= 40 ? <Minus className="w-4 h-4" /> :
             <TrendingDown className="w-4 h-4" />;
    } else {
      return value <= 30 ? <TrendingDown className="w-4 h-4" /> :
             value <= 60 ? <Minus className="w-4 h-4" /> :
             <TrendingUp className="w-4 h-4" />;
    }
  };

  const getPresidentialStatus = () => {
    if (nationalState.popularidad >= 70) return { text: 'Presidente Popular', color: 'text-green-400' };
    if (nationalState.popularidad >= 50) return { text: 'Presidente Estable', color: 'text-yellow-400' };
    if (nationalState.popularidad >= 30) return { text: 'Presidente En Crisis', color: 'text-orange-400' };
    return { text: 'Presidente En Peligro', color: 'text-red-400' };
  };

  const presidentialStatus = getPresidentialStatus();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-lg border border-purple-500/30">
      {/* Header con estado presidencial */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Crown className="w-8 h-8 text-yellow-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SIMULADOR PRESIDENCIAL COMPLETO
          </h1>
          <Crown className="w-8 h-8 text-yellow-400" />
        </div>
        <div className="flex items-center justify-center gap-4 text-sm">
          <span className={`font-bold ${presidentialStatus.color}`}>
            {presidentialStatus.text}
          </span>
          <span className="text-purple-300">•</span>
          <span className="text-purple-300">
            Día {nationalState.diasEnElCargo} en el cargo
          </span>
          <span className="text-purple-300">•</span>
          <span className="text-purple-300">
            Nivel {nationalState.nivel} ({nationalState.experiencia}/100 XP)
          </span>
        </div>
      </div>

      {/* Dashboard de métricas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 p-4 bg-black/20 rounded-lg border border-purple-500/20">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className={getMetricColor(nationalState.popularidad)}>
              {getMetricIcon(nationalState.popularidad)}
            </span>
            <span className="text-sm font-medium text-purple-300">Popularidad</span>
          </div>
          <div className={`text-2xl font-bold ${getMetricColor(nationalState.popularidad)}`}>
            {nationalState.popularidad}%
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className={getMetricColor(nationalState.economia)}>
              {getMetricIcon(nationalState.economia)}
            </span>
            <span className="text-sm font-medium text-purple-300">Economía</span>
          </div>
          <div className={`text-2xl font-bold ${getMetricColor(nationalState.economia)}`}>
            {nationalState.economia}%
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className={getMetricColor(nationalState.inflacion, false)}>
              {getMetricIcon(nationalState.inflacion, false)}
            </span>
            <span className="text-sm font-medium text-purple-300">Inflación</span>
          </div>
          <div className={`text-2xl font-bold ${getMetricColor(nationalState.inflacion, false)}`}>
            {nationalState.inflacion}%
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-purple-300">Dólar Blue</span>
          </div>
          <div className={`text-2xl font-bold ${nationalState.dolarBlue > 1000 ? 'text-red-400' : 'text-yellow-400'}`}>
            ${nationalState.dolarBlue}
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className={getMetricColor(nationalState.caos, false)}>
              {getMetricIcon(nationalState.caos, false)}
            </span>
            <span className="text-sm font-medium text-purple-300">Caos</span>
          </div>
          <div className={`text-2xl font-bold ${getMetricColor(nationalState.caos, false)}`}>
            {nationalState.caos}%
          </div>
        </div>
      </div>

      {/* Métricas extendidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-3 bg-black/10 rounded-lg border border-purple-500/10">
        <div className="text-center">
          <div className="text-xs text-purple-400 mb-1">Riesgo País</div>
          <div className="text-lg font-bold text-white">{nationalState.riesgosPais}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-purple-400 mb-1">Reservas (M USD)</div>
          <div className="text-lg font-bold text-white">{nationalState.reservas}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-purple-400 mb-1">Desempleo</div>
          <div className="text-lg font-bold text-white">{nationalState.desempleo.toFixed(1)}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-purple-400 mb-1">Pobreza</div>
          <div className="text-lg font-bold text-white">{nationalState.pobreza}%</div>
        </div>
      </div>

      {/* Navegación de modos */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveMode('dashboard')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeMode === 'dashboard'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
          }`}
        >
          📊 Dashboard
        </button>
        <button
          onClick={() => setActiveMode('eventos')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeMode === 'eventos'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
          }`}
        >
          🏛️ Eventos Políticos
        </button>
        <button
          onClick={() => setActiveMode('conferencia')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeMode === 'conferencia'
              ? 'bg-pink-600 text-white shadow-lg'
              : 'bg-pink-600/20 text-pink-300 hover:bg-pink-600/30'
          }`}
        >
          🎤 Conferencia de Prensa
        </button>
      </div>

      {/* Contenido según modo activo */}
      {activeMode === 'dashboard' && (
        <div className="space-y-6">
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">
              🎮 Centro de Comando Presidencial
            </h3>
            <p className="text-purple-400 mb-6">
              Desde acá podés manejar todos los aspectos de tu presidencia
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-purple-700/30 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                  <h4 className="text-xl font-bold text-white">Eventos Estratégicos</h4>
                </div>
                <p className="text-purple-300 mb-4">
                  Decisiones importantes que moldean el destino del país. Sin prisa, analizá bien.
                </p>
                <button
                  onClick={() => setActiveMode('eventos')}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200"
                >
                  Gestionar Eventos
                </button>
              </div>

              <div className="p-6 bg-pink-700/30 rounded-lg border border-pink-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <Mic className="w-6 h-6 text-pink-400" />
                  <h4 className="text-xl font-bold text-white">Conferencias de Prensa</h4>
                </div>
                <p className="text-purple-300 mb-4">
                  Respondé preguntas bizarras de periodistas en tiempo real. ¡Estás en vivo!
                </p>
                <button
                  onClick={() => setActiveMode('conferencia')}
                  className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-all duration-200"
                >
                  Ir a Conferencia
                </button>
              </div>
            </div>
          </div>

          {/* Última decisión */}
          {nationalState.ultimaDecision && (
            <div className="p-4 bg-black/20 rounded-lg border border-purple-500/20">
              <h4 className="text-lg font-bold text-purple-300 mb-2">📋 Última Decisión</h4>
              <div className="text-sm text-purple-400">
                <span className="capitalize">{nationalState.ultimaDecision.tipo}</span> - {nationalState.ultimaDecision.descripcion}
              </div>
              <div className="text-xs text-purple-500">
                {nationalState.ultimaDecision.timestamp.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      )}

      {activeMode === 'eventos' && (
        <PoliticalEventSimulator
          onMetricsChange={(metrics) => handleMetricsChange(metrics, 'evento')}
          initialMetrics={nationalState}
        />
      )}

      {activeMode === 'conferencia' && (
        <PressConference
          onMetricsChange={(metrics) => handleMetricsChange(metrics, 'conferencia')}
          initialMetrics={nationalState}
        />
      )}

      {/* Notificaciones flotantes */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <EventNotification
            key={notification.id}
            title="Estado Nacional"
            message={notification.message}
            type={notification.type === 'success' ? 'Oportunidad' : 'Crisis'}
            urgencyLevel={notification.type === 'error' ? 5 : 3}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            autoCloseAfter={5000}
            position="top"
            compact={true}
          />
        ))}
      </div>
    </div>
  );
};

export default PoliticalGameplayTester;
