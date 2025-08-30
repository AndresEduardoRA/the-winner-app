import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { theme } from "@/lib/theme";
import { formatBs } from "@/lib/format";
import { Card, CardTitle } from "@/components/ui/Card";
import { Text, Title, Muted } from "@/components/ui/Text";
import { SegmentedControl } from "@/components/patterns/SegmentedControl";
import { Counter } from "@/components/patterns/Counter";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import CustomModal from "@/components/customModal"; // tu componente existente
import { UserIcon, Users } from "lucide-react-native";

export default function ProfileScreen() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"individual" | "grupal">("individual");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const balance = 47.25;
  const fare = 2.5;

  const passengers = mode === "individual" ? 1 : Math.max(0, adults) + Math.max(0, children);
  const total = useMemo(() => fare * passengers, [fare, passengers]);

  const groupLabel = useMemo(() => {
    if (mode === "individual") return "1 Pasajero (adulto)";
    const parts: string[] = [];
    if (adults > 0) parts.push(`${adults} ${adults === 1 ? "adulto" : "adultos"}`);
    if (children > 0) parts.push(`${children} ${children === 1 ? "niño" : "niños"}`);
    return parts.length ? `Grupo (${parts.join(", ")})` : "Grupo (0)";
  }, [mode, adults, children]);

  const handleSetMode = (m: "individual" | "grupal") => {
    setMode(m);
    if (m === "individual") {
      setAdults(1);
      setChildren(0);
    } else {
      setAdults((prev) => (prev < 1 ? 1 : prev));
      setChildren((prev) => (prev < 0 ? 0 : prev));
    }
  };

  const handleConfirm = () => {
    console.log("Pago confirmado:", { mode, adults, children, passengers, fare, total });
    setOpen(false);
  };

  return (
    <SafeAreaView style={screen.safe}>
      <View style={screen.container}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          {/* Saldo */}
          <Card style={screen.balanceCard}>
            <View style={{ flex: 1 }}>
              <Muted style={screen.balanceLabel}>Tu saldo</Muted>
              <Text style={screen.balanceValue}>{formatBs(balance)}</Text>
            </View>
          </Card>

          {/* Modalidad de pago */}
          <Card>
            <CardTitle>Modalidad de pago</CardTitle>
            <SegmentedControl
              value={mode}
              onChange={(key) => handleSetMode(key as "individual" | "grupal")}
              segments={[
                {
                  key: "individual",
                  label: "Individual",
                  icon: (
                    <UserIcon size={20} color={mode === "individual" ? "#fff" : theme.colors.text} />
                  ),
                },
                {
                  key: "grupal",
                  label: "Grupal",
                  icon: <Users size={20} color={mode === "grupal" ? "#fff" : theme.colors.text} />,
                },
              ]}
            />
          </Card>

          {/* Controles grupales */}
          {mode === "grupal" && (
            <Card>
              <CardTitle>Detalle del grupo</CardTitle>
              <View style={{ marginTop: 12, gap: 14 }}>
                <Counter label="Adultos" value={adults} min={0} onChange={(v) => setAdults(Math.max(0, v))} />
                <Counter label="Niños" value={children} min={0} onChange={(v) => setChildren(Math.max(0, v))} />
              </View>
            </Card>
          )}

          {/* Detalle del pago */}
          <Card>
            <View style={row.between}>
              <View>
                <Muted style={{ fontSize: 13, marginBottom: 6 }}>Pagarás por</Muted>
                <Title>{groupLabel}</Title>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Title>{formatBs(fare)}</Title>
              </View>
            </View>

            <Divider marginTop={16} />

            <View style={row.between}>
              <Title style={{ fontWeight: "800" }}>Total</Title>
              <Title style={{ fontWeight: "800" }}>{formatBs(total)}</Title>
            </View>
            {mode === "grupal" && (
              <Muted style={{ marginTop: 6 }}>
                {passengers} {passengers === 1 ? "pasajero" : "pasajeros"} × {formatBs(fare)}
              </Muted>
            )}
          </Card>
        </ScrollView>

        {/* CTA inferior */}
        <Button
          title="Tocar"
          subtitle="Para pagar pasaje"
          onPress={() => setOpen(true)}
          style={screen.fabCTA}
          accessibilityLabel="Pagar pasaje"
        />

        {/* Modal de confirmación */}
        <CustomModal
          visible={open}
          onClose={() => setOpen(false)}
          title="Confirmar pago"
          actions={[
            { label: "Cancelar", variant: "secondary", onPress: () => setOpen(false) },
            { label: "Pagar", onPress: handleConfirm },
          ]}
        >
          <View style={{ gap: 8 }}>
            <Title>{formatBs(total)}</Title>
            <Muted>
              {mode === "individual"
                ? `Se cobrará ${formatBs(fare)} para 1 pasajero (adulto).`
                : `Se cobrará ${formatBs(fare)} por pasajero. Detalle: ${adults} ${adults === 1 ? "adulto" : "adultos"}, ${children} ${children === 1 ? "niño" : "niños"} (${passengers} en total).`}
            </Muted>
          </View>
        </CustomModal>
      </View>
    </SafeAreaView>
  );
}

const row = StyleSheet.create({
  between: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});

const screen = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1, backgroundColor: theme.colors.background },
  balanceCard: { ...theme.shadow.card },
  balanceLabel: { fontSize: 16, textAlign: "center" },
  balanceValue: { fontSize: 32, fontWeight: "800", textAlign: "center" },
  fabCTA: {
    position: "absolute",
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
  },
});
