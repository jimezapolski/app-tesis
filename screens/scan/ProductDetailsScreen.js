import React from "react";
import { ScrollView, Text } from "react-native";

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  return (
    <ScrollView contentContainerStyle={{ padding:16 }}>
      <Text style={{ fontSize:18, fontWeight:"700" }}>{product.nombre} — {product.marca}</Text>

      <Text style={{ marginTop:12, fontWeight:"600" }}>Sellos y significados</Text>
      <Text>{product.sellos.length ? product.sellos.join(", ") : "Sin sellos"}</Text>

      <Text style={{ marginTop:12, fontWeight:"600" }}>Nutrientes destacados</Text>
      <Text>Azúcares: {product.tablaResumida.azucares}</Text>
      <Text>Grasas saturadas: {product.tablaResumida.grasasSaturadas}</Text>
      <Text>Calorías: {product.tablaResumida.calorias}</Text>
      <Text>Proteínas: {product.tablaResumida.proteinas}</Text>

      <Text style={{ marginTop:12, fontWeight:"600" }}>Ingrediente positivo</Text>
      <Text>{product.ingredientePositivo}</Text>
    </ScrollView>
  );
}
