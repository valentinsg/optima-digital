import type { Metadata, Viewport } from "next";

const siteUrl = "https://presidencial-bardo.vercel.app";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "PRESIDENCIAL BARDO - Parodia Política Argentina",
		template: "%s | PRESIDENCIAL BARDO",
	},
	description:
		"¡Una parodia jugable de Argentina! Sobrevive en un contexto político absurdo como un bardo poderoso contra oleadas infinitas de trolls, ministros y ovnis. Mide inflación, caos, poder popular y dólar blue en esta experiencia satírica única.",
	keywords: [
		"presidencial bardo",
		"parodia argentina",
		"juego político",
		"pixel art",
		"bardo game",
		"survival game",
		"trolls políticos",
		"defensa satírica",
		"hechizos políticos",
		"shooter político",
		"supervivencia argentina",
		"browser game",
		"web game",
		"indie game",
		"retro game",
		"action game",
		"aventura política",
		"reino político",
		"oleadas infinitas",
	],
	authors: [
		{ name: "Valentín Sánchez Guevara", url: "https://github.com/tuusuario" },
	],
	creator: "Valentín Sánchez Guevara",
	publisher: "Presidencial Bardo",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	alternates: {
		canonical: "/",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	category: "games",
	classification: "Game",
	openGraph: {
		type: "website",
		locale: "es_AR",
		url: siteUrl,
		title: "🎭 PRESIDENCIAL BARDO - Parodia Política Argentina!",
		description:
			"¡Entra al reino político y desata tus poderes satíricos! Batalla contra oleadas infinitas de trolls, ministros y ovnis, domina hechizos políticos y conviértete en el defensor definitivo del reino en este cautivador juego de pixel art político.",
		siteName: "PRESIDENCIAL BARDO",
		images: [
			{
				url: "/og.png",
				width: 1536,
				height: 1024,
				alt: "PRESIDENCIAL BARDO - Gameplay Político Satírico",
				type: "image/png",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "🎭 PRESIDENCIAL BARDO - Parodia Política Argentina!",
		description:
			"¡Desata tus poderes satíricos y defiende el reino político! Experimenta el juego de supervivencia político de pixel art definitivo.",
		images: ["/og.png"],
		creator: "@tuusuario",
	},

	other: {
		"game:credits":
			"Descubre al apasionado desarrollador detrás de PRESIDENCIAL BARDO: Valentín Sánchez Guevara. Nacido de la creatividad y la sátira política argentina.",
		"game:credits:title":
			"🎭 El Bardo Detrás de la Magia - PRESIDENCIAL BARDO",
		"game:credits:description":
			"Conoce al talentoso desarrollador que dio vida a este reino político durante una épica aventura de parodia argentina.",
		"game:leaderboard": `${siteUrl}/leaderboard`,
		"game:leaderboard:title": "🏆 Salón de Leyendas - PRESIDENCIAL BARDO",
		"game:leaderboard:description":
			"¡Asciende al estatus legendario! Compite con bardos de todo el mundo y graba tu nombre en el salón de la fama político.",
		"apple-mobile-web-app-capable": "yes",
		"apple-mobile-web-app-status-bar-style": "black-translucent",
		"apple-mobile-web-app-title": "PRESIDENCIAL BARDO",
		"mobile-web-app-capable": "yes",
		"application-name": "PRESIDENCIAL BARDO",
		"msapplication-TileColor": "#8A2BE2",
		"theme-color": "#8A2BE2",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	// Specific configuration for mobile browsers with navigation bars
	viewportFit: "cover",
	interactiveWidget: "resizes-content",
};

export const jsonLd = {
	"@context": "https://schema.org",
	"@type": "VideoGame",
	name: "PRESIDENCIAL BARDO",
	description:
		"¡Una parodia jugable de Argentina! Sobrevive en un contexto político absurdo como un bardo poderoso contra oleadas infinitas de trolls, ministros y ovnis en esta experiencia satírica única.",
	genre: ["Action", "Political", "Survival", "Arcade", "Adventure"],
	gamePlatform: "Web Browser",
	operatingSystem: "Any",
	applicationCategory: "Game",
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "USD",
	},
	author: {
		"@type": "Person",
		name: "Valentín Sánchez Guevara",
	},
};
