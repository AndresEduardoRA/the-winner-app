
import React, { useMemo, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Pressable } from "react-native";
import { theme } from "@/lib/theme";
import { Header } from "@/components/patterns/Header";
import { SearchBar } from "@/components/patterns/SearchBar";
import { Chip } from "@/components/patterns/Chip";
import { TxRow, Tx } from "@/components/patterns/TxRow";
import { Text } from "@/components/ui/Text";
import { ArrowUpDown } from "lucide-react-native";

const SAMPLE: Tx[] = [
  { id: "1", title: "Recarga celular", subtitle: "Tigo 705****", type: "recarga", status: "exitoso", amount: 30, date: "2025-08-30T10:35:00" },
  { id: "2", title: "Pago supermercado", subtitle: "Hipermaxi", type: "pago", status: "exitoso", amount: 120.5, date: "2025-08-29T18:22:00" },
  { id: "3", title: "Transferencia", subtitle: "a Juan Pérez", type: "transferencia", status: "pendiente", amount: 200, date: "2025-08-29T14:10:00" },
  { id: "4", title: "Pago suscripción", subtitle: "Netflix", type: "pago", status: "fallido", amount: 50, date: "2025-08-28T09:00:00" },
];

type Category = "todo" | "recarga" | "pago" | "transferencia";

export default function HistoryScreen() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("todo");
  const [sortDesc, setSortDesc] = useState(true);

  const data = useMemo(() => {
    let d = SAMPLE.filter((tx) => `${tx.title} ${tx.subtitle ?? ""}`.toLowerCase().includes(query.toLowerCase()));
    if (category !== "todo") d = d.filter((tx) => tx.type === category);
    d.sort((a, b) => (sortDesc ? +new Date(b.date) - +new Date(a.date) : +new Date(a.date) - +new Date(b.date)));
    return d;
  }, [query, category, sortDesc]);

  return (
    <SafeAreaView style={screen.safe}>
      <View style={screen.container}>
        <Header title="Historial" />
        <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar en historial" />

        {/* Filtros + orden */}
        <View style={screen.filtersRow}>
          <Chip label="Todo" active={category === "todo"} onPress={() => setCategory("todo")} />
          <Chip label="Recargas" active={category === "recarga"} onPress={() => setCategory("recarga")} />
          <Chip label="Pagos" active={category === "pago"} onPress={() => setCategory("pago")} />
          <Chip label="Transferencias" active={category === "transferencia"} onPress={() => setCategory("transferencia")} />
          <PressableOrder sortDesc={sortDesc} onToggle={() => setSortDesc((s) => !s)} />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: theme.spacing.lg }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item, index }) => {
            const showDateHeader = index === 0 || formatDate(data[index - 1].date) !== formatDate(item.date);
            return (
              <View>
                {showDateHeader && (
                  <Text style={screen.dateHeader}>{formatDate(item.date)}</Text>
                )}
                <TxRow tx={item} />
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={screen.empty}>
              <Text style={screen.emptyTitle}>Sin movimientos</Text>
              <Text style={screen.emptySub}>No encontramos resultados con esos filtros.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

function PressableOrder({ sortDesc, onToggle }: { sortDesc: boolean; onToggle: () => void }) {
  return (
    <Pressable onPress={onToggle} android_ripple={{ color: "rgba(0,0,0,0.06)" }} style={screen.sortBtn} accessibilityRole="button" accessibilityLabel="Ordenar">
      <ArrowUpDown size={16} color={theme.colors.text} />
      <Text style={screen.sortTxt}>{sortDesc ? "Nuevas" : "Antiguas"}</Text>
    </Pressable>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });
}

const screen = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1, backgroundColor: theme.colors.background },
  filtersRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 8, marginTop: 12, marginBottom: 8, paddingHorizontal: theme.spacing.lg },
  sortBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#fff", borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, marginLeft: "auto" },
  sortTxt: { fontSize: 12, color: theme.colors.text, fontWeight: "600" },
  dateHeader: { fontSize: 12, color: theme.colors.muted, marginTop: 10, marginBottom: 6 },
  empty: { alignItems: "center", paddingVertical: 40, gap: 6 },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: theme.colors.text },
  emptySub: { fontSize: 13, color: theme.colors.muted },
});
