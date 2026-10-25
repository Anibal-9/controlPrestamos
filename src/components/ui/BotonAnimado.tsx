
import { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type BotonAnimadoProps = {
  titulo: string;
  onPress: () => void;
  color?: string;
};

export default function BotonAnimado({
  titulo,
  onPress,
  color = "#2563eb",
}: BotonAnimadoProps) {
  const escala = useRef(new Animated.Value(1)).current;

  function presionar() {
    Animated.spring(escala, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  }

  function soltar() {
    Animated.spring(escala, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  }

  return (
    <Animated.View
      style={[
        styles.contenedor,
        { transform: [{ scale: escala }] },
      ]}
    >
      <Pressable
        style={[styles.boton, { backgroundColor: color }]}
        onPress={onPress}
        onPressIn={presionar}
        onPressOut={soltar}
      >
        <Text style={styles.texto}>{titulo}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: "100%",
    marginTop: 10,
  },

  boton: {
    minHeight: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },

  texto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
