import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { theme } from "@/lib/theme";
import { Text } from "@/components/ui/Text";


type Segment = { key: string; label: string; icon?: React.ReactNode };


export function SegmentedControl({
    value,
    onChange,
    segments,
    accessibilityLabel,
}: {
    value: string;
    onChange: (key: string) => void;
    segments: Segment[];
    accessibilityLabel?: string;
}) {
    return (
        <View style={styles.segment} accessibilityRole="tablist" accessibilityLabel={accessibilityLabel}>
            {segments.map((s) => {
                const active = s.key === value;
                return (
                    <Pressable
                        key={s.key}
                        onPress={() => onChange(s.key)}
                        style={[styles.item, active && styles.itemActive]}
                        accessibilityRole="tab"
                        accessibilityState={{ selected: active }}
                    >
                        {s.icon}
                        <Text style={[styles.itemText, active && styles.itemTextActive]}>{s.label}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}


const styles = StyleSheet.create({
    segment: { flexDirection: "row", gap: 10, marginTop: 14 },
    item: {
        flexDirection: "row",
        flex: 1,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        backgroundColor: "#fff",
    },
    itemActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
    itemText: { fontSize: 14, fontWeight: "600", color: theme.colors.text },
    itemTextActive: { color: "#fff" },
});