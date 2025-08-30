import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { theme } from "@/lib/theme";
import { RefreshCcw, ShoppingCart, Wallet, CheckCircle, XCircle, Clock } from "lucide-react-native";
import { Badge } from "@/components/patterns/Badge";
import { formatBs } from "@/lib/format";

export type TxType = "recarga" | "pago" | "transferencia";
export type TxStatus = "exitoso" | "pendiente" | "fallido";
export type Tx = { id: string; title: string; subtitle?: string; type: TxType; status: TxStatus; amount: number; date: string };

function getIcon(t: TxType) {
    switch (t) {
        case "recarga":
            return RefreshCcw;
        case "pago":
            return ShoppingCart;
        case "transferencia":
            return Wallet;
        default:
            return RefreshCcw;
    }
}


export function TxRow({ tx, onPress }: { tx: Tx; onPress?: () => void }) {
    const Icon = getIcon(tx.type);
    const sign = tx.type === "recarga" ? "+" : "-";
    const amountColor = tx.type === "recarga" ? "#16a34a" : tx.status === "fallido" ? "#9CA3AF" : "#ef4444";


    const statusNode =
        tx.status === "exitoso" ? (
            <Badge tone="success" label="Exitoso" icon={<CheckCircle size={12} color="#1B7F3A" />} />
        ) : tx.status === "pendiente" ? (
            <Badge tone="warning" label="Pendiente" icon={<Clock size={12} color="#A15C00" />} />
        ) : (
            <Badge tone="error" label="Fallido" icon={<XCircle size={12} color="#B00020" />} />
        );


    return (
        <Pressable onPress={onPress} android_ripple={{ color: "rgba(0,0,0,0.06)" }} style={({ pressed }) => [styles.row, pressed && { opacity: 0.97 }]}>
            <View style={styles.iconWrap}>
                <Icon size={18} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{tx.title}</Text>
                <Text style={styles.sub} numberOfLines={1}>
                    {tx.subtitle ? `${tx.subtitle} · ` : ""}
                    {new Date(tx.date).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                </Text>
                {statusNode}
            </View>
            <Text style={[styles.amount, { color: amountColor }]}>
                {sign}
                {formatBs(tx.amount)}
            </Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    row: { backgroundColor: "#fff", borderRadius: theme.radius.md, padding: 12, flexDirection: "row", alignItems: "center", gap: 12 },
    iconWrap: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#E8F0FE", alignItems: "center", justifyContent: "center" },
    title: { fontSize: 15, fontWeight: "600", color: theme.colors.text },
    sub: { fontSize: 12, color: theme.colors.muted, marginTop: 2, marginBottom: 6 },
    amount: { fontSize: 16, fontWeight: "700" },
});