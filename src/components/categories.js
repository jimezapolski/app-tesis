import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";



export default function Categories() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.title}>Categorías</Text>
        <TouchableOpacity>
          <Text style={styles.link}>Ver todo</Text>
        </TouchableOpacity>
      </View>
    
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 10 }}
          style={{ marginTop: 10 }}
        >
          <TouchableOpacity>
            <View style={{ marginRight: 20 }}>
              <Text style={styles.link}>Categoría 1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ marginRight: 20 }}>
              <Text style={styles.link}>Categoría 2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ marginRight: 20 }}>
              <Text style={styles.link}>Categoría 3</Text>
            </View>
          </TouchableOpacity>  
          <TouchableOpacity>
            <View style={{ marginRight: 20 }}>
              <Text style={styles.link}>Categoría 4</Text>
            </View>
          </TouchableOpacity>   
          <TouchableOpacity>
            <View style={{ marginRight: 20 }}>
              <Text style={styles.link}>Categoría 5</Text>
            </View>
          </TouchableOpacity>  
          </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.verdeOscuro ,
    fontFamily: FONTS.tituloVerde.fontFamily,
  },
  link: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: FONTS.subtituloTexto.fontFamily,
  },
});
