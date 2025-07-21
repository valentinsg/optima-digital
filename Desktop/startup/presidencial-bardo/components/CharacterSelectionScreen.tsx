"use client";

import type {
	FactionModifier,
	PoliticalMetrics,
	ProvinceModifier,
} from "@/types/political";
import { FactionId, ProvinceId } from "@/types/political";
import {
	Building,
	Landmark,
	Palette,
	Skull,
	SmilePlus,
} from "lucide-react";

type CharacterProfile = {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	modifiers: Partial<PoliticalMetrics>;
	factionModifiers?: Partial<Record<FactionId, FactionModifier>>;
	provinceModifiers?: Partial<Record<ProvinceId, ProvinceModifier>>;
};

const characters: CharacterProfile[] = [
	{
		id: "gaspar",
		name: "📱 Gaspar \"El Streamer\"",
		description:
			"Ganó la presidencia por un sorteo de TikTok. No tiene idea de política, pero le hizo una story a la Casa Rosada y subió +300K seguidores. Gobernar no estaba en sus planes, pero 'algo va a salir'.",
		icon: SmilePlus,
		modifiers: {
			popularidad: 80,
			economia: 45,
			controlMedios: 50,
			corrupcion: 45,
			tecnologia: 75,
			salud: 50
		},
		factionModifiers: {
			[FactionId.LA_CAMPORA]: { support: -25, power: 10 },
			[FactionId.EMPRESARIOS]: { support: 10, power: 10 },
			[FactionId.SINDICALISTAS]: { support: 10, power: 10 },
		},
		provinceModifiers: {
			[ProvinceId.CABA]: { loyalty: 25, discontent: -10 },
		},

	},
	{
		id: "benito_paz",
		name: "💙 Benito Paz \"El Corazón\"",
		description:
			"El único presidente que no miente porque no sabe mentir. Tiene síndrome de Down, es puro corazón y el pueblo lo ama. El Congreso se derrite cada vez que habla.",
		icon: Landmark,
		modifiers: {
			popularidad: 70,
			corrupcion: 45,
			seguridad: 50,
			relacionesInternacionales: 60,
			salud: 65,
			tecnologia: 40
		},
		factionModifiers: {
			[FactionId.SINDICALISTAS]: { support: 20 },
			[FactionId.EMPRESARIOS]: { support: 10 },
		},
		provinceModifiers: {
			[ProvinceId.CABA]: { loyalty: 15 },
			[ProvinceId.SANTA_FE]: { loyalty: 15 },
			[ProvinceId.MENDOZA]: { loyalty: 10 },
			[ProvinceId.CORDOBA]: { loyalty: 10 },

		},
	},
	{
		id: "la_senora_k",
		name: "🪦 La Señora K \"La Medium\"",
		description:
			"Dice que gobierna por orden de Evita, que se le aparece en los sueños. Cierra los ojos y habla con los muertos. Su escritorio tiene velas, estampitas y una urna. No necesita gabinete: tiene espiritismo.",
		icon: Skull,
		modifiers: {
			popularidad: 50,
			corrupcion: 60,
			controlMedios: 85,
			seguridad: 50,
			relacionesInternacionales: 30,
			salud: 40,
			tecnologia: 25,
		},
		factionModifiers: {
			[FactionId.LA_CAMPORA]: { support: 35, power: 20 },
			[FactionId.SINDICALISTAS]: { support: 25 },
			[FactionId.EMPRESARIOS]: { support: -20 },
			[FactionId.ALIENS]: { support: 50 },
		},
		provinceModifiers: {
			[ProvinceId.SANTA_CRUZ]: { loyalty: 25, discontent: -20 },
			[ProvinceId.BUENOS_AIRES]: { loyalty: 15, discontent: -10 },
			[ProvinceId.LA_PAMPA]: { loyalty: 10 },
		},
	},
	{
		id: "la_chola_arias",
		name: "🎤 La Chola Arias \"La Cumbiambera\"",
		description:
			"Estrella de la cumbia ancestral. Arrancó en festivales del norte y terminó cantando en la ONU. Defiende a los pueblos originarios, pero cobra en dólares y viaja en charter.",
		icon: Palette,
		modifiers: {
			popularidad: 80,
			controlMedios: 55,
			relacionesInternacionales: 50,
			economia: 50,
			salud: 55,
			tecnologia: 35
		},
		factionModifiers: {
			[FactionId.SINDICALISTAS]: { support: 15 },
		},
		provinceModifiers: {
			[ProvinceId.SALTA]: { loyalty: 30, discontent: -15 },
			[ProvinceId.TUCUMAN]: { loyalty: 25, discontent: -15 },
			[ProvinceId.JUJUY]: { loyalty: 35, discontent: -10 },
			[ProvinceId.CHACO]: { loyalty: 35, discontent: -10 },
			[ProvinceId.FORMOSA]: { loyalty: 20 },
		},
	},
	{
		id: "chiquito_tapon",
		name: "⚽ Chiquito Tapón \"El Barra\"",
		description:
			"Ex presidente de un club del ascenso. Maneja el país como un vestuario: a los gritos, con asado y apretadas. Tiene a los barras de voceros y al Tesorero como 5 de marca.",
		icon: Building,
		modifiers: {
			corrupcion: 60,
			popularidad: 75,
			seguridad: 70,
			relacionesInternacionales: 40,
			salud: 45,
			tecnologia: 30
		},
		factionModifiers: {
			[FactionId.BARRAS_BRAVAS]: { support: 70, power: 35 },
			[FactionId.TACHEROS]: { support: 25 },
			[FactionId.SINDICALISTAS]: { support: 35 },
			[FactionId.EMPRESARIOS]: { support: -35 },
		},
	},
];

type CharacterSelectionScreenProps = {
	onSelectCharacterAction: (character: CharacterProfile) => void;
};

export function CharacterSelectionScreen({
	onSelectCharacterAction,
}: CharacterSelectionScreenProps) {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 p-8 text-white font-sans">
			<div className="text-center mb-10">
				<h2 className="text-5xl font-extrabold text-white">
					Elige tu Destino
				</h2>
				<p className="text-purple-300 mt-2 max-w-2xl mx-auto">
					Cada líder comienza con una Argentina diferente. Sus fortalezas y
					debilidades iniciales, así como sus alianzas y enemistades,
					definirán tu punto de partida. Elige con sabiduría.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
				{characters.map(character => (
					<div
						key={character.id}
						className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/40 flex flex-col text-center transform hover:scale-105 hover:border-purple-400 transition-all duration-300 shadow-2xl shadow-purple-900/50"
					>
						<div className="bg-purple-600/20 rounded-full p-4 mb-4 border-2 border-purple-500 mx-auto">
							<character.icon className="w-12 h-12 text-purple-300" />
						</div>
						<h3 className="text-xl font-bold text-white mb-2">
							{character.name}
						</h3>
						<p className="text-gray-300 text-sm mb-6 flex-grow">
							{character.description}
						</p>
						<button
							type="button"
							onClick={() => onSelectCharacterAction(character)}
							className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
						>
							Gobernar
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
