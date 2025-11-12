import React from "react"; import { ScrollView, Text, View } from "react-native"; import { HOME } from "../../constants/theme";
export default function LabelsGuideScreen(){ return (
  <ScrollView contentContainerStyle={{ padding: HOME.spacing.xl }}>
    <Text style={HOME.type.section20}>Guía para leer etiquetas</Text>
    <Text style={[HOME.type.quickBody12, { marginTop: 8 }]}>
      (Acá pegamos el contenido resumido del paper: cómo leer sellos, tabla nutricional y lista de ingredientes…)
    </Text>
  </ScrollView>
);}