import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { theme } from "@/lib/theme";
import { Title } from "./Text";


export function Card({ style, ...rest }: ViewProps) {
return <View style={[styles.base, style]} {...rest} />;
}


export function CardTitle({ children }: { children: React.ReactNode }) {
return <Title>{children}</Title>;
}


const styles = StyleSheet.create({
base: {
backgroundColor: theme.colors.card,
marginTop: theme.spacing.lg,
marginHorizontal: theme.spacing.lg,
borderRadius: theme.radius.lg,
borderWidth: 1,
borderColor: theme.colors.border,
padding: theme.spacing.lg,
...theme.shadow.card,
},
});