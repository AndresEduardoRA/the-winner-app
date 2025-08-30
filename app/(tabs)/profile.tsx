import React from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { ProfileHeader } from "@/components/patterns/ProfileHeader";
import { Section } from "@/components/patterns/Section";
import { MenuItem } from "@/components/patterns/MenuItem";
import { Text } from "@/components/ui/Text";
import { theme } from "@/lib/theme";
import { User, Smartphone, CreditCard, Lock, Phone, Mail, Eye } from "lucide-react-native";


export default function SettingsScreen() {
    return (
        <ScrollView style={screen.container} contentContainerStyle={{ paddingBottom: 24 }}>
            <ProfileHeader initials="JD" name="Juan Doe" email="juan.doe@email.com" />


            <View style={screen.sections}>
                <Section title="Información Personal">
                    <MenuItem icon={<User size={20} color={theme.colors.text} />} label="Editar Perfil" />
                    <MenuItem icon={<Smartphone size={20} color={theme.colors.text} />} label="Número de Teléfono" />
                </Section>


                <Section title="Pagos y Seguridad">
                    <MenuItem icon={<CreditCard size={20} color={theme.colors.text} />} label="Métodos de Pago" />
                    <MenuItem icon={<Lock size={20} color={theme.colors.text} />} label="Cambiar Contraseña" />
                </Section>


                <Section title="Soporte y Ayuda">
                    <MenuItem icon={<Phone size={20} color={theme.colors.text} />} label="Contactar Soporte" />
                    <MenuItem icon={<Mail size={20} color={theme.colors.text} />} label="Enviar Feedback" />
                </Section>


                <Section title="Privacidad">
                    <MenuItem icon={<Eye size={20} color={theme.colors.text} />} label="Privacidad" />
                </Section>


                <View style={screen.container}>
                    <Pressable style={screen.logoutBtn} android_ripple={{ color: "rgba(0,0,0,0.08)" }}>
                        <Text style={screen.logoutTxt}>Cerrar Sesión</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}


const screen = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    sections: { paddingTop: 20 },
    section: { marginBottom: 30 },
    logoutBtn: { backgroundColor: theme.colors.negative, paddingVertical: 14, marginHorizontal: theme.spacing.lg, borderRadius: theme.radius.md, alignItems: "center" },
    logoutTxt: { color: "#fff", fontSize: 15, fontWeight: "700" },
});