import { theme } from "@/lib/theme";
import React from "react";
import { Text as RNText, Pressable, RootTagContext, ViewStyle, StyleSheet } from "react-native";


type Variant = "primary" | "secondary";


type ButtonProps = {
title: string;
subtitle?: string;
onPress?: () => void;
variant?: Variant;
style?: ViewStyle;
accessibilityLabel?: string;
};


export function Button({ title, subtitle, onPress, variant = "primary", style, accessibilityLabel }: ButtonProps) {
const isPrimary = variant === "primary";
return (
<Pressable
onPress={onPress}
accessibilityRole="button"
accessibilityLabel={accessibilityLabel || title}
style={[baseStyles.container, isPrimary ? baseStyles.primary : baseStyles.secondary, style]}
>
<RNText style={[baseStyles.title, isPrimary && { color: "#fff" }]}>{title}</RNText>
{subtitle ? (
<RNText style={[baseStyles.subtitle, isPrimary && { color: "#fff", opacity: 0.9 }]}>{subtitle}</RNText>
) : null}
</Pressable>
);
}


const baseStyles = StyleSheet.create({
container: {
borderRadius: theme.radius.lg,
alignItems: "center",
justifyContent: "center",
paddingVertical: 14,
...theme.shadow.raised,
},
primary: { backgroundColor: theme.colors.primary },
secondary: {
backgroundColor: "#fff",
borderWidth: 1,
borderColor: theme.colors.border,
},
title: { fontSize: 16, fontWeight: "800", color: theme.colors.text, lineHeight: 18 },
subtitle: { marginTop: 2, fontWeight: "600", color: theme.colors.text },
});