import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants/theme";
import tw from "twrnc";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-gesture-handler";
import Categories from "../../src/components/categories";

const ios = Platform.OS === "ios";

const topMargin = ios ? 24 : 40;

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal:topMargin,
          paddingTop: 20,
        }}
      >
        {/* titulo */}
        <View style={styles.header}>
          <Text style={styles.tituloHome}>Tu camino {"\n"}inicia ahora</Text>
          <TouchableOpacity>
            <Image
              source={require("../../assets/img/avatar.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* barra de busqueda */}
        <View className='mx-5 mb-4'>
            <View
                style={tw`flex-row items-center bg-neutral-100 rounded-full shadow-xs p-4 space-x-2 pl-6`}
            >
                <MagnifyingGlassIcon size={20} strokeWidth={3} color="#3E5F87" className="m-4"  />
                <TextInput 
                    placeholder="Buscar contenido"
                    placeholderTextColor={'gray'}
                    className="flex-1 text-base ml-4 mb-1 pl-1 tracking-wider "
                />
            </View> 
        </View>
         {/* categorias */}
        <View className="mb-4 mt-4">
          <Categories />
        </View>

         {/* categorias */}
         <View className="mb-4 mt-4">
          <Categories />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  tituloHome: {
    fontSize: FONTS.tituloLogoCeleste.fontSize,
    fontFamily: FONTS.tituloLogoCeleste.fontFamily,
    color: COLORS.logoCeleste,
  },
  avatar: {
    width: wp(14),
    height: wp(14),
    resizeMode: "cover",
    borderRadius: wp(6), // para que sea circular si querés
  },
});

export default HomeScreen;
