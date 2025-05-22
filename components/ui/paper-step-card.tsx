import { IconType } from "react-icons"

type Props = {
  step: {
    number: string
    title: string
    description: string
    icon: IconType
  }
  isLeft: boolean
}

export default function PaperStepCard({ step, isLeft }: Props) {
  const Icon = step.icon

  return (
    <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'} relative`}>

      {/* Card estilo papel mejorado */}
      <div className={`max-w-md group hover:scale-[1.03] transition-all duration-500 ${isLeft ? 'ml-8' : 'mr-8'}`}>
        <div className="relative">

          {/* Número flotante */}
          <div className={`absolute ${isLeft ? '-left-5' : '-right-5'} w-12 h-12 bg-white text-[#004ba0] rounded-full flex items-center justify-center font-bold text-lg shadow-xl z-20 group-hover:rotate-[10deg] transition-transform duration-300`}>
            {step.number}
          </div>

          {/* Card */}
          <div
            className="rounded-xl p-10 border border-white/30 shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
            style={{
              clipPath: `polygon(0 10%, 6% 9%, 14% 12%, 20% 6%, 28% 14%, 34% 9%, 41% 13%, 50% 10%, 58% 11%, 65% 7%, 71% 10%, 79% 6%, 85% 9%, 92% 12%, 100% 8%, 100% 100%, 0 100%)`,
              backgroundImage: `
      linear-gradient(#3f87a6 1px, transparent 1px),
      linear-gradient(to right, #ebf8e100 10%, #c73030 10% 10.2%, #ebf8e100 10.5%)
    `,
              backgroundSize: '100% 25px, 100% 100%',
              backgroundColor: '#ebf8e1',
              backgroundBlendMode: 'multiply',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {/* Icono y título */}
            <div className="flex items-center gap-4 mb-4 ml-4">
              <div className="w-12 h-12 border mt-2border-primary bg-primary rounded-xl flex items-center justify-center transition-colors duration-300 shadow-inner">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary leading-snug">
                {step.title}
              </h3>
            </div>

            {/* Descripción */}
            <p className="text-black/80 font-semibold  text-lg tracking-wider ml-4">
              {step.description}
            </p>

            {/* Detalle de cinta opcional */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-white/50 rounded-sm rotate-[-6deg] shadow-md"></div>
          </div>
        </div>
      </div>
    </div >
  )
}
