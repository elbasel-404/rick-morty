import { cva, type VariantProps } from "class-variance-authority";

/**
 * Cyber status variants using CVA
 */

export const cyberStatusBgVariants = cva("", {
	variants: {
		status: {
			alive: "bg-cyan-400",
			dead: "bg-red-500",
			unknown: "bg-yellow-400",
		},
	},
	defaultVariants: {
		status: "unknown",
	},
});

export const cyberStatusGlowVariants = cva("", {
	variants: {
		status: {
			alive: "shadow-[0_0_20px_rgba(34,211,238,0.6)]",
			dead: "shadow-[0_0_20px_rgba(239,68,68,0.6)]",
			unknown: "shadow-[0_0_20px_rgba(250,204,21,0.6)]",
		},
	},
	defaultVariants: {
		status: "unknown",
	},
});

export const cyberStatusTextVariants = cva("", {
	variants: {
		status: {
			alive: "text-cyan-400",
			dead: "text-red-500",
			unknown: "text-yellow-400",
		},
	},
	defaultVariants: {
		status: "unknown",
	},
});

/**
 * Combined cyber status variant
 */
export const cyberStatusVariants = cva("", {
	variants: {
		status: {
			alive: "bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] text-cyan-400",
			dead: "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] text-red-500",
			unknown:
				"bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)] text-yellow-400",
		},
		element: {
			bg: "",
			glow: "",
			text: "",
		},
	},
	compoundVariants: [
		{
			status: "alive",
			element: "bg",
			className: "bg-cyan-400",
		},
		{
			status: "alive",
			element: "glow",
			className: "shadow-[0_0_20px_rgba(34,211,238,0.6)]",
		},
		{
			status: "alive",
			element: "text",
			className: "text-cyan-400",
		},
		{
			status: "dead",
			element: "bg",
			className: "bg-red-500",
		},
		{
			status: "dead",
			element: "glow",
			className: "shadow-[0_0_20px_rgba(239,68,68,0.6)]",
		},
		{
			status: "dead",
			element: "text",
			className: "text-red-500",
		},
		{
			status: "unknown",
			element: "bg",
			className: "bg-yellow-400",
		},
		{
			status: "unknown",
			element: "glow",
			className: "shadow-[0_0_20px_rgba(250,204,21,0.6)]",
		},
		{
			status: "unknown",
			element: "text",
			className: "text-yellow-400",
		},
	],
	defaultVariants: {
		status: "unknown",
	},
});

/**
 * Legacy helper for backward compatibility
 * @deprecated Use cyberStatusBgVariants, cyberStatusGlowVariants, cyberStatusTextVariants instead
 */
export const getCyberStatusConfig = (status: string) => {
	const configs = {
		Alive: {
			bg: "bg-cyan-400",
			glow: "shadow-[0_0_20px_rgba(34,211,238,0.6)]",
			text: "text-cyan-400",
		},
		Dead: {
			bg: "bg-red-500",
			glow: "shadow-[0_0_20px_rgba(239,68,68,0.6)]",
			text: "text-red-500",
		},
		unknown: {
			bg: "bg-yellow-400",
			glow: "shadow-[0_0_20px_rgba(250,204,21,0.6)]",
			text: "text-yellow-400",
		},
	};

	return (
		configs[status as keyof typeof configs] || {
			bg: "bg-gray-500",
			glow: "shadow-[0_0_20px_rgba(107,114,128,0.6)]",
			text: "text-gray-500",
		}
	);
};

export type CyberStatusVariants = VariantProps<typeof cyberStatusVariants>;
export type CyberStatusBgVariants = VariantProps<typeof cyberStatusBgVariants>;
export type CyberStatusGlowVariants = VariantProps<
	typeof cyberStatusGlowVariants
>;
export type CyberStatusTextVariants = VariantProps<
	typeof cyberStatusTextVariants
>;
