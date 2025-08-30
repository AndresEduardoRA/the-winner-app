import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { theme } from "@/lib/theme";


export function AmountCard({ label, caption, selected, onPress }: { label: string; caption?: string; selected?: boolean; onPress?: () => void; }) {
    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: "rgba(0,0,0,0.06)" }}
            style={[styles.card, selected && styles.cardSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected: !!selected }}
        >
            <Text style={[styles.amount, selected && styles.amountSelected]}>{label}</Text>
            {!!caption && <Text style={styles.caption}>{caption}</Text>}
        </Pressable>
    );
}


const styles = StyleSheet.create({
    card: {
        width: "31%",
        backgroundColor: "#fff",
        borderRadius: theme.radius.md,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    cardSelected: {
        borderColor: theme.colors.primary,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },
    amount: { fontSize: 16, fontWeight: "700", color: theme.colors.text, textAlign: "center" },
    amountSelected: { color: theme.colors.primary },
    caption: { marginTop: 2, fontSize: 12, color: theme.colors.muted },
});