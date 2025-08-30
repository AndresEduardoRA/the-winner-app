import React from "react";
import { View } from "react-native";
import { theme } from "@/lib/theme";


export function Divider({ marginTop = 12, marginBottom = 12 }: { marginTop?: number; marginBottom?: number }) {
return <View style={{ height: 1, backgroundColor: theme.colors.border, marginTop, marginBottom }} />;
}