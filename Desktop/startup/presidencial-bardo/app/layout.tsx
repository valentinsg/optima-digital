import {
    metadata as gameMetadata,
    viewport as gameViewport,
} from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-pixel",
	display: "swap",
});

export const metadata: Metadata = gameMetadata;
export const viewport: Viewport = gameViewport;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							// Suprimir advertencias de hidratación para extensiones conocidas
							const originalConsoleError = console.error;
							console.error = function(...args) {
								const errorMessage = args.join(' ');

								// Lista de atributos de extensiones conocidas que causan hydration warnings
								const knownExtensionAttributes = [
									'data-wgscriptallow',
									'cz-shortcut-listen',
									'data-extension-id',
									'data-testid',
									'autocomplete="off"'
								];

								// Si el error es sobre hydration y contiene atributos de extensiones, no lo mostramos
								const isExtensionHydrationError = errorMessage.includes('Hydration failed') &&
									knownExtensionAttributes.some(attr => errorMessage.includes(attr));

								if (!isExtensionHydrationError) {
									originalConsoleError.apply(console, args);
								}
							};
						`,
					}}
				/>
			</head>
			<body
				className={`${pressStart2P.variable} h-full overflow-hidden`}
				suppressHydrationWarning
			>
				{children}
			</body>
			<Analytics />
		</html>
	);
}
