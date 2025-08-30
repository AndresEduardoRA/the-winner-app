import React from "react";
import { ViewStyle } from "react-native";
import { Button } from "@/components/ui/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/lib/theme";


export function BottomBarButton({ title, subtitle, disabled, onPress, style }: { title: string; subtitle?: string; disabled?: boolean; onPress?: () => void; style?: ViewStyle; }) {
    const insets = useSafeAreaInsets();
    return (
        <Button
            title={title}
            subtitle={subtitle}
            onPress={onPress}
            style={[{ position: "absolute", left: theme.spacing.lg, right: theme.spacing.lg, bottom: theme.spacing.lg + insets.bottom, opacity: disabled ? 0.7 : 1 }, style]}
            variant="primary"
        />
    );
}