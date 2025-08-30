import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { theme } from "@/lib/theme";
import { ChevronRight } from "lucide-react-native";


export function MethodRow({ title, subtitle, icon, chevron, selected, onPress }: { title: string; subtitle?: string; icon?: React.ReactNode; chevron?: boolean; selected?: boolean; onPress?: () => void; }) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.row, selected && styles.rowSelected]}
            android_ripple={{ color: "rgba(0,0,0,0.06)" }}
            accessibilityRole="button"
            accessibilityLabel={title}
            accessibilityState={{ selected: !!selected }}
        >
            <View style={styles.iconBox}>{typeof icon === "string" ? <Text style={{ fontSize: 18 }}>{icon}</Text> : icon}</View>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{title}</Text>
                {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            {chevron && <ChevronRight size={18} color={theme.colors.muted} />}
        </Pressable>
    );
}


const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: theme.radius.md,
        marginHorizontal: theme.spacing.lg,
        marginTop: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    rowSelected: { borderColor: theme.colors.primary },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: "#F6F7F9",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    title: { fontSize: 15, fontWeight: "600", color: theme.colors.text },
    subtitle: { fontSize: 12, color: theme.colors.muted, marginTop: 2 },
});