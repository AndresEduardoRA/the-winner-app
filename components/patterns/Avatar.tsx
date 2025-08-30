import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { theme } from "@/lib/theme";


export function Avatar({ initials, size = 80 }: { initials: string; size?: number }) {
const radius = size / 2;
return (
<View style={[styles.circle, { width: size, height: size, borderRadius: radius }]}>
<Text style={[styles.initials, { fontSize: Math.round(size / 3) }]}>{initials}</Text>
</View>
);
}


const styles = StyleSheet.create({
circle: { backgroundColor: theme.colors.primary, alignItems: "center", justifyContent: "center" },
initials: { color: "#fff", fontWeight: "800" },
});