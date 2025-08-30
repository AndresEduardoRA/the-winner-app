import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { theme } from "@/lib/theme";


export function Text({ style, ...rest }: TextProps) {
return <RNText style={[{ color: theme.colors.text }, style]} {...rest} />;
}


export function Muted({ style, ...rest }: TextProps) {
return <RNText style={[{ color: theme.colors.muted }, style]} {...rest} />;
}


export function Title({ style, ...rest }: TextProps) {
return (
<RNText
style={[{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }, style]}
{...rest}
/>
);
}