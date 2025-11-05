import { cva, type VariantProps } from "class-variance-authority";

/**
 * Card Content Component Variants
 * Replaces classes like .card-content, .card-title-section, .character-name, etc.
 */

export const cardContentVariants = cva("relative z-[2]", {
	variants: {
		padding: {
			default: "px-6 pb-6",
			compact: "px-4 pb-4",
			spacious: "px-8 pb-8",
		},
	},
	defaultVariants: {
		padding: "default",
	},
});

export const cardTitleSectionVariants = cva("text-center", {
	variants: {
		spacing: {
			default: "mb-5",
			compact: "mb-3",
			spacious: "mb-7",
		},
	},
	defaultVariants: {
		spacing: "default",
	},
});

export const characterNameVariants = cva(
	[
		"font-black text-transparent bg-clip-text",
		"bg-linear-to-br from-purple-400 via-pink-500 to-violet-600",
		"transition-all duration-300 ease-out",
		"text-shadow-[0_0_30px_rgba(168,85,247,0.3)]",
	],
	{
		variants: {
			size: {
				sm: "text-2xl tracking-tight",
				default: "text-[28px] tracking-wide",
				lg: "text-3xl tracking-wider",
			},
			hover: {
				true: "tracking-widest text-shadow-[0_0_40px_rgba(168,85,247,0.6)]",
				false: "",
			},
		},
		defaultVariants: {
			size: "default",
			hover: false,
		},
	},
);

export const statusBadgeVariants = cva(
	[
		"inline-flex items-center gap-2 px-4 py-2",
		"bg-white/5 backdrop-blur-md border rounded-[20px]",
		"transition-all duration-300 ease-out",
	],
	{
		variants: {
			status: {
				alive: "border-green-500/40",
				dead: "border-red-500/40",
				unknown: "border-gray-500/40",
			},
			hover: {
				true: "scale-105 bg-white/8",
				false: "",
			},
		},
		defaultVariants: {
			status: "unknown",
			hover: false,
		},
	},
);

export const statusDotVariants = cva(
	"w-2 h-2 rounded-full motion-safe:animate-[pulse-glow_2s_ease-in-out_infinite]",
	{
		variants: {
			status: {
				alive: "bg-green-500",
				dead: "bg-red-500",
				unknown: "bg-gray-500",
			},
		},
		defaultVariants: {
			status: "unknown",
		},
	},
);

export const statusTextVariants = cva(
	"text-[13px] font-bold uppercase tracking-wider",
	{
		variants: {
			status: {
				alive: "text-green-400",
				dead: "text-red-400",
				unknown: "text-gray-400",
			},
		},
		defaultVariants: {
			status: "unknown",
		},
	},
);

export const infoGridVariants = cva("grid gap-3", {
	variants: {
		columns: {
			1: "grid-cols-1",
			2: "grid-cols-2",
			3: "grid-cols-3",
		},
		spacing: {
			default: "mb-5",
			compact: "mb-3",
			spacious: "mb-7",
		},
	},
	defaultVariants: {
		columns: 2,
		spacing: "default",
	},
});

export const infoItemVariants = cva(
	[
		"flex items-center gap-3 p-3.5 cursor-pointer",
		"bg-linear-to-br from-indigo-500/8 to-purple-600/8",
		"backdrop-blur-md border border-white/8 rounded-2xl",
		"transition-all duration-300 motion-ease-spring-smooth",
	],
	{
		variants: {
			hover: {
				true: [
					"bg-linear-to-br from-indigo-500/15 to-purple-600/15",
					"border-purple-600/30 -translate-y-1",
					"shadow-[0_8px_16px_rgba(99,102,241,0.2),0_0_20px_rgba(168,85,247,0.15)]",
				],
				false: "",
			},
		},
		defaultVariants: {
			hover: false,
		},
	},
);

export const infoIconVariants = cva(
	[
		"flex items-center justify-center shrink-0",
		"w-8 h-8 text-2xl rounded-xl",
		"bg-linear-to-br from-indigo-500/20 to-purple-600/20",
	],
);

export const infoContentVariants = cva("flex flex-col gap-0.5 min-w-0");

export const infoLabelVariants = cva(
	"text-[10px] font-bold text-purple-400/90 uppercase tracking-wider",
);

export const infoTextVariants = cva(
	"text-sm font-semibold text-white/95 whitespace-nowrap overflow-hidden text-ellipsis",
);

export const cardIdBadgeVariants = cva(
	[
		"text-center p-2.5 rounded-xl",
		"bg-linear-to-r from-indigo-500/10 via-purple-600/15 to-indigo-500/10",
		"border border-purple-600/20",
		"text-[13px] font-extrabold text-purple-300 tracking-[2px]",
		"text-shadow-[0_0_10px_rgba(168,85,247,0.4)]",
		"transition-all duration-300 ease-out",
	],
	{
		variants: {
			hover: {
				true: [
					"border-purple-600/40",
					"text-shadow-[0_0_20px_rgba(168,85,247,0.6)]",
					"bg-linear-to-r from-indigo-500/15 via-purple-600/20 to-indigo-500/15",
				],
				false: "",
			},
		},
		defaultVariants: {
			hover: false,
		},
	},
);

export const imageGradientOverlayVariants = cva(
	[
		"absolute bottom-0 left-0 right-0 pointer-events-none",
		"bg-linear-to-t from-slate-900/95 via-slate-900/70 to-transparent",
	],
	{
		variants: {
			height: {
				sm: "h-24",
				default: "h-[150px]",
				lg: "h-48",
			},
		},
		defaultVariants: {
			height: "default",
		},
	},
);

export type CardContentVariants = VariantProps<typeof cardContentVariants>;
export type CardTitleSectionVariants = VariantProps<
	typeof cardTitleSectionVariants
>;
export type CharacterNameVariants = VariantProps<typeof characterNameVariants>;
export type StatusBadgeVariants = VariantProps<typeof statusBadgeVariants>;
export type StatusDotVariants = VariantProps<typeof statusDotVariants>;
export type StatusTextVariants = VariantProps<typeof statusTextVariants>;
export type InfoGridVariants = VariantProps<typeof infoGridVariants>;
export type InfoItemVariants = VariantProps<typeof infoItemVariants>;
export type CardIdBadgeVariants = VariantProps<typeof cardIdBadgeVariants>;
export type ImageGradientOverlayVariants = VariantProps<
	typeof imageGradientOverlayVariants
>;
