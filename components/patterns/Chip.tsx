import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { theme } from "@/lib/theme";


export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
return (
<Pressable
onPress={onPress}
android_ripple={{ color: "rgba(0,0,0,0.06)" }}
style={[styles.chip, active && styles.active]}
accessibilityRole="button"
accessibilityState={{ selected: !!active }}
>
<Text style={[styles.text, active && styles.textActive]}>{label}</Text>
</Pressable>
);
}


const styles = StyleSheet.create({
chip: {
paddingHorizontal: 12,
paddingVertical: 8,
borderRadius: 999,
backgroundColor: "#EEF1F4",
},
active: { backgroundColor: theme.colors.primary },
text: { color: theme.colors.text, fontSize: 13, fontWeight: "600" },
textActive: { color: "#fff" },
});
