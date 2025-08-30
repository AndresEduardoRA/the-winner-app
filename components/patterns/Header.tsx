import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { theme } from "@/lib/theme";
import { ChevronLeft } from "lucide-react-native";


export function Header({ title, onBack }: { title: string; onBack?: () => void }) {
    return (
        <View style={styles.header}>
            <Pressable
                hitSlop={10}
                onPress={onBack}
                accessibilityRole="button"
                accessibilityLabel="Volver"
                style={styles.backBtn}
            >
                <ChevronLeft size={24} color={theme.colors.text} />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
            <View style={{ width: 32 }} />
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.sm,
        paddingBottom: 12,
        backgroundColor: theme.colors.background,
    },
    backBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
    title: { flex: 1, textAlign: "center", fontSize: 16, fontWeight: "600", color: theme.colors.text },
});