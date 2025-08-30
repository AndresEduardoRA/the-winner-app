import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";


export type BadgeTone = "success" | "warning" | "error";


const toneStyles: Record<BadgeTone, { bg: string; fg: string }> = {
    success: { bg: "#EAF7ED", fg: "#1B7F3A" },
    warning: { bg: "#FFF7E6", fg: "#A15C00" },
    error: { bg: "#FEECEC", fg: "#B00020" },
};


export function Badge({ tone, label, icon }: { tone: BadgeTone; label: string; icon?: React.ReactNode }) {
    const { bg, fg } = toneStyles[tone];
    return (
        <View style={[styles.badge, { backgroundColor: bg }]}>
            {icon}
            <Text style={[styles.txt, { color: fg }]}>{label}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    badge: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
    txt: { fontSize: 11, fontWeight: "700" },
});