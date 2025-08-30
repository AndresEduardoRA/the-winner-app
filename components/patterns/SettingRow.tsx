import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { theme } from "@/lib/theme";
import { ChevronRight } from "lucide-react-native";


export function SettingRow({ icon, label, onPress, testID }: { icon: React.ReactNode; label: string; onPress?: () => void; testID?: string }) {
return (
<Pressable
testID={testID}
onPress={onPress}
android_ripple={{ color: "rgba(0,0,0,0.06)" }}
style={styles.row}
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
row: {
flexDirection: "row",
alignItems: "center",
justifyContent: "space-between",
paddingVertical: 14,
paddingHorizontal: 14,
backgroundColor: "#fff",
borderRadius: theme.radius.md,
marginBottom: 8,
borderWidth: 1,
borderColor: theme.colors.border,
},
left: { flexDirection: "row", alignItems: "center" },
icon: { marginRight: 12 },
text: { fontSize: 16, color: theme.colors.text },
});
