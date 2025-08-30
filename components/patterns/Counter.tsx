import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { IconButton } from "@/components/ui/IconButton";
import { theme } from "@/lib/theme";
import { Minus, Plus } from "lucide-react-native";


export function Counter({
    label,
    value,
    min = 0,
    onChange,
}: {
    label: string;
    value: number;
    min?: number;
    onChange: (next: number) => void;
}) {
    const decDisabled = value <= min;
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.controls}>
                <IconButton
                    onPress={() => !decDisabled && onChange(value - 1)}
                    disabled={decDisabled}
                    icon={<Minus size={18} color={decDisabled ? "#c7c7c7" : theme.colors.text} />}
                    accessibilityLabel={`Disminuir ${label}`}
                />
                <Text style={styles.value}>{value}</Text>
                <IconButton
                    onPress={() => onChange(value + 1)}
                    icon={<Plus size={18} color={theme.colors.text} />}
                    accessibilityLabel={`Aumentar ${label}`}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    label: { color: theme.colors.text, fontSize: 14, fontWeight: "600" },
    controls: { flexDirection: "row", alignItems: "center", gap: 12 },
    value: { minWidth: 20, textAlign: "center", fontSize: 16, fontWeight: "700", color: theme.colors.text },
});