import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { theme } from "@/lib/theme";


export function Section({ title, children }: { title: string; children: React.ReactNode }) {
return (
<View style={styles.section}>
<Text style={styles.title}>{title}</Text>
{children}
</View>
);
}


const styles = StyleSheet.create({
section: { marginBottom: 30, paddingHorizontal: theme.spacing.lg },
title: { fontSize: 16, fontWeight: "700", color: theme.colors.text, marginBottom: 12 },
});