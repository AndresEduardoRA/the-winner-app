import React from "react";
import { View, TextInput, Platform, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";
import { theme } from "@/lib/theme";


export function SearchBar({ value, onChangeText, placeholder = "Buscar" }: { value: string; onChangeText: (t: string) => void; placeholder?: string; }) {
    return (
        <View style={styles.wrap}>
            <Search size={18} color={theme.colors.muted} />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === "ios" ? 10 : 6,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginHorizontal: theme.spacing.lg,
    },
    input: { flex: 1, color: theme.colors.text, paddingVertical: Platform.OS === "ios" ? 6 : 2 },
});
