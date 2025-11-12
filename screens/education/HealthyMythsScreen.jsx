import React from "react"; import { ScrollView, Text, View } from "react-native"; import { HOME } from "../../constants/theme";
export default function HealthyMythsScreen(){ return (
  <ScrollView contentContainerStyle={{ padding: HOME.spacing.xl }}>
    <Text style={HOME.type.section20}>Desmitificando lo saludable</Text>
    <Text style={[HOME.type.quickBody12, { marginTop: 8 }]}>
      (Acá pegamos el contenido resumido del paper: …)
    </Text>
  </ScrollView>
);}