export const theme = {
    colors: {
        primary: "#f97316",
        text: "#0E1221",
        muted: "#6B7280",
        card: "#FFFFFF",
        border: "#ECECECFF",
        positive: "#10B981",
        negative: "#EF4444",
        background: "#FFFFFF",
    },
    radius: {
        sm: 8,
        md: 12,
        lg: 14,
        xl: 18,
    },
    spacing: {
        xs: 6,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        xxl: 24,
    },
    shadow: {
        card: {
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 2,
        },
        raised: {
            shadowColor: "#000",
            shadowOpacity: 0.12,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
        },
    },
} as const;