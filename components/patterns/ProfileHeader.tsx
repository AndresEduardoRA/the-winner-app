import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { Avatar } from "@/components/patterns/Avatar";
import { theme } from "@/lib/theme";


export function ProfileHeader({ name, email, initials }: { name: string; email: string; initials: string }) {
return (
<View style={styles.header}>
<Avatar initials={initials} />
<Text style={styles.name}>{name}</Text>
<Text style={styles.email}>{email}</Text>
</View>
);
}


const styles = StyleSheet.create({
header: { backgroundColor: "#fff", alignItems: "center", paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
name: { fontSize: 20, fontWeight: "800", color: theme.colors.text, marginTop: 12 },
email: { fontSize: 14, color: theme.colors.muted, marginTop: 4 },
});
