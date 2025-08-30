import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { theme } from "@/lib/theme";


type IconButtonProps = {
    onPress: () => void;
    icon: React.ReactNode;
    disabled?: boolean;
    accessibilityLabel?: string;
};


export function IconButton({ onPress, icon, disabled, accessibilityLabel }: IconButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={!!disabled}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            style={[styles.roundBtn, disabled && { opacity: 0.5 }]}
        >
            {icon}
        </Pressable>
    );
}


const styles = StyleSheet.create({
    roundBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
});