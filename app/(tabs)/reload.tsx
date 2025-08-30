import React, { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type PaymentMethod = "agent" | "card" | "bank" | null;

const CURRENT_BALANCE = 47.5;

const QUICK_AMOUNTS = [
  { amount: 10, trips: 4 },
  { amount: 20, trips: 8 },
  { amount: 50, trips: 20 },
  { amount: 100, trips: 40 },
  { amount: 200, trips: 80 },
  { amount: -1, trips: 0, custom: true }, // "Otro monto"
];

export default function ReloadScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);

  // si quisieras pedir un monto personalizado, reemplaza este valor con un modal/input
  const CUSTOM_FAKE_VALUE = 0; // cambia a lo que necesites

  const effectiveAmount = selectedAmount === -1 ? CUSTOM_FAKE_VALUE : selectedAmount;

  const afterBalance = useMemo(
    () => Number((CURRENT_BALANCE + (effectiveAmount || 0)).toFixed(2)),
    [effectiveAmount]
  );

  const canContinue = effectiveAmount > 0 && !!selectedMethod;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.back}>‹</Text>
          <Text style={styles.headerTitle}>Recargar saldo</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Saldo actual */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Saldo actual</Text>
            <Text style={styles.balanceValue}>Bs. {CURRENT_BALANCE.toFixed(2)}</Text>
          </View>

          {/* Montos rápidos */}
          <Text style={styles.sectionTitle}>Montos rápidos</Text>
          <View style={styles.quickGrid}>
            {QUICK_AMOUNTS.map((item, idx) => {
              const isSelected =
                item.custom
                  ? selectedAmount === -1
                  : selectedAmount === item.amount;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.amountCard, isSelected && styles.amountCardSelected]}
                  onPress={() => setSelectedAmount(item.custom ? -1 : item.amount)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.amountText, isSelected && styles.amountTextSelected]}>
                    {item.custom ? "Otro\nmonto" : `Bs. ${item.amount}`}
                  </Text>
                  {!item.custom && (
                    <Text style={styles.tripsText}>{item.trips} viajes</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Resumen de selección */}
          <View style={styles.summaryCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.summaryLabel}>Monto seleccionado</Text>
              <Text style={styles.summaryLabelMuted}>Saldo después de recarga</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.summaryValue}>
                {effectiveAmount > 0 ? `Bs. ${effectiveAmount}` : "Bs. 0"}
              </Text>
              <Text style={styles.summaryAfter}>Bs. {afterBalance.toFixed(2)}</Text>
            </View>
          </View>

          {/* Método de pago */}
          <Text style={styles.sectionTitle}>Método de pago</Text>

          <MethodRow
            title="Agente autorizado"
            subtitle="Pago en efectivo"
            icon="🏪"
            selected={selectedMethod === "agent"}
            onPress={() => setSelectedMethod("agent")}
          />
          <MethodRow
            title="Tarjeta de débito/crédito"
            subtitle="Visa, Mastercard"
            icon="💳"
            chevron
            selected={selectedMethod === "card"}
            onPress={() => setSelectedMethod("card")}
          />
          <MethodRow
            title="Transferencia bancaria"
            subtitle="QR o cuenta"
            icon="🏦"
            chevron
            selected={selectedMethod === "bank"}
            onPress={() => setSelectedMethod("bank")}
          />
        </ScrollView>

        {/* Botón inferior */}
        <Pressable
          style={[styles.bottomButton, !canContinue && styles.bottomButtonDisabled]}
          disabled={!canContinue}
          onPress={() => {
            // aquí navegas o confirmas
            // e.g., navigation.navigate('Confirm', { amount: effectiveAmount, method: selectedMethod })
          }}
        >
          <Text style={[styles.bottomButtonText, !canContinue && { opacity: 0.6 }]}>
            Seleccionar monto y método
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function MethodRow({
  title,
  subtitle,
  icon,
  chevron,
  selected,
  onPress,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
  chevron?: boolean;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.methodRow, selected && styles.methodRowSelected]}>
      <View style={styles.methodIcon}>
        <Text style={{ fontSize: 18 }}>{icon ?? "■"}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.methodTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.methodSubtitle}>{subtitle}</Text>}
      </View>
      <Text style={styles.chevron}>{chevron ? "›" : ""}</Text>
    </Pressable>
  );
}

const BLUE = "#FF6B35";
const BLUE_DARK = "#E55A2B";
const BG = "#F6F7F9";
const CARD = "#FFFFFF";
const TEXT = "#0E1221";
const MUTED = "#7B8193";
const BORDER = "#E6E8EE";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  back: {
    fontSize: 24,
    width: 24,
    textAlign: "left",
    color: TEXT,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: TEXT,
  },

  balanceCard: {
    backgroundColor: BLUE,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  balanceLabel: { color: "#DCE3FF", fontSize: 13, marginBottom: 4 },
  balanceValue: { color: "#fff", fontSize: 24, fontWeight: "800" },

  sectionTitle: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: TEXT,
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 10,
  },
  amountCard: {
    width: "30.5%", // 3 por fila con márgenes
    backgroundColor: CARD,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },
  amountCardSelected: {
    borderColor: BLUE,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  amountText: { fontSize: 16, fontWeight: "700", color: TEXT, textAlign: "center" },
  amountTextSelected: { color: BLUE_DARK },
  tripsText: { marginTop: 2, fontSize: 12, color: MUTED },

  summaryCard: {
    backgroundColor: BG,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
  },
  summaryLabel: { fontSize: 13, color: TEXT, marginBottom: 6 },
  summaryLabelMuted: { fontSize: 13, color: MUTED },
  summaryValue: { fontSize: 16, fontWeight: "800", color: BLUE_DARK, marginBottom: 6 },
  summaryAfter: { fontSize: 13, color: "#4C5370" },

  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },
  methodRowSelected: {
    borderColor: BLUE,
  },
  methodIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: BG,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  methodTitle: { fontSize: 15, fontWeight: "600", color: TEXT },
  methodSubtitle: { fontSize: 12, color: MUTED, marginTop: 2 },
  chevron: { fontSize: 22, color: MUTED, marginLeft: 8 },

  bottomButton: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BLUE,
  },
  bottomButtonDisabled: {
    backgroundColor: "#FFD3C7",
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
