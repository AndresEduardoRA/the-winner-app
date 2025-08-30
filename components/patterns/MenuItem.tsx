import React from "react";
import { Pressable, View, StyleSheet, Platform } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { Text } from "@/components/ui/Text";
import { theme } from "@/lib/theme";


export function MenuItem({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress?: () => void }) {
return (
<Pressable
onPress={onPress}
android_ripple={{ color: "rgba(0,0,0,0.06)" }}
style={({ pressed }) => [styles.item, pressed && Platform.OS === "ios" ? { opacity: 0.9 } : null]}
accessibilityRole="button"
accessibilityLabel={label}
>
<View style={styles.left}>
<View style={styles.icon}>{icon}</View>
<Text style={styles.text}>{label}</Text>
</View>
<ChevronRight size={18} color={theme.colors.muted} />
</Pressable>
);
}


const styles = StyleSheet.create({
item: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 14, paddingHorizontal: 14, backgroundColor: theme.colors.card, borderRadius: theme.radius.md, marginBottom: 8, borderWidth: 1, borderColor: theme.colors.border },
left: { flexDirection: "row", alignItems: "center" },
icon: { marginRight: 14 },
text: { fontSize: 15, color: theme.colors.text },
});