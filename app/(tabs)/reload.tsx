import React, { useMemo, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { theme } from "@/lib/theme";
import { formatBs } from "@/lib/format";
import { Header } from "@/components/patterns/Header";
import { AmountCard } from "@/components/patterns/AmountCard";
import { MethodRow } from "@/components/patterns/MethodRow";
import { Text, Title } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { BottomBarButton } from "@/components/patterns/BottomBarButton";

// Tipos y datos
type PaymentMethod = "agent" | "card" | "bank" | null;
type QuickAmount = { amount: number; trips: number; custom?: boolean };
const CURRENT_BALANCE = 47.5;
const QUICK_AMOUNTS: QuickAmount[] = [
  { amount: 10, trips: 4 },
  { amount: 20, trips: 8 },
  { amount: 50, trips: 20 },
  { amount: 100, trips: 40 },
  { amount: 200, trips: 80 },
  { amount: -1, trips: 0, custom: true },
];

export default function ReloadScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount] = useState<number>(0); // TODO: abrir CustomModal
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);

  const effectiveAmount = selectedAmount === -1 ? customAmount : selectedAmount;
  const afterBalance = useMemo(() => Number((CURRENT_BALANCE + (effectiveAmount || 0)).toFixed(2)), [effectiveAmount]);
  const canContinue = effectiveAmount > 0 && !!selectedMethod;

  return (
    <View style={screen.container}>
      <Header title="Recargar saldo" onBack={() => { /* navigation.goBack?.() */ }} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={screen.content} showsVerticalScrollIndicator={false}>
        {/* Saldo actual */}
        <Card style={screen.balanceCard}>
          <Text style={screen.balanceLabel}>Saldo actual</Text>
          <Title style={screen.balanceValue}>{formatBs(CURRENT_BALANCE)}</Title>
        </Card>

        {/* Montos rápidos */}
        <Text style={screen.sectionTitle}>Montos rápidos</Text>
        <View style={screen.quickGrid}>
          {QUICK_AMOUNTS.map((item, idx) => {
            const isSelected = item.custom ? selectedAmount === -1 : selectedAmount === item.amount;
            return (
              <AmountCard
                key={`${item.amount}-${idx}`}
                label={item.custom ? "Otro monto" : `Bs. ${item.amount}`}
                caption={!item.custom ? `${item.trips} viajes` : undefined}
                selected={isSelected}
                onPress={() => {
                  setSelectedAmount(item.custom ? -1 : item.amount);
                }}
              />
            );
          })}
        </View>

        {/* Resumen */}
        <View style={screen.summaryCard}>
          <View style={{ flex: 1 }}>
            <Text style={screen.summaryLabel}>Monto seleccionado</Text>
            <Text style={screen.summaryLabelMuted}>Saldo después de recarga</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Title style={screen.summaryValue}>{effectiveAmount > 0 ? formatBs(effectiveAmount) : "Bs. 0.00"}</Title>
            <Text style={screen.summaryAfter}>{formatBs(afterBalance)}</Text>
          </View>
        </View>

        {/* Método de pago */}
        <Text style={screen.sectionTitle}>Método de pago</Text>
        <MethodRow title="Agente autorizado" subtitle="Pago en efectivo" icon={"🏪"} selected={selectedMethod === "agent"} onPress={() => setSelectedMethod("agent")} />
        <MethodRow title="Tarjeta de débito/crédito" subtitle="Visa, Mastercard" icon={"💳"} chevron selected={selectedMethod === "card"} onPress={() => setSelectedMethod("card")} />
        <MethodRow title="Transferencia bancaria" subtitle="QR o cuenta" icon={"🏦"} chevron selected={selectedMethod === "bank"} onPress={() => setSelectedMethod("bank")} />
      </ScrollView>

      <BottomBarButton title="Seleccionar monto y método" disabled={!canContinue} onPress={() => { /* navigate */ }} />
    </View>
  );
}

const screen = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { paddingBottom: 120 },
  sectionTitle: { marginTop: theme.spacing.lg, marginHorizontal: theme.spacing.lg, marginBottom: 8, fontSize: 14, fontWeight: "600", color: theme.colors.text },
  /* Balance */
  balanceCard: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.md },
  balanceLabel: { color: "#FBEDE7", fontSize: 13, marginBottom: 4 },
  balanceValue: { color: "#fff", fontSize: 24, fontWeight: "800" },
  /* Grid montos */
  quickGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12, gap: 10 },
  /* Resumen */
  summaryCard: { backgroundColor: "#F6F7F9", borderRadius: theme.radius.md, marginHorizontal: theme.spacing.lg, marginTop: 14, padding: 12, borderWidth: 1, borderColor: theme.colors.border, flexDirection: "row", alignItems: "center" },
  summaryLabel: { fontSize: 13, color: theme.colors.text, marginBottom: 6 },
  summaryLabelMuted: { fontSize: 13, color: theme.colors.muted },
  summaryValue: { fontSize: 16, fontWeight: "800", color: theme.colors.primary, marginBottom: 6 },
  summaryAfter: { fontSize: 13, color: "#4C5370" },
});
