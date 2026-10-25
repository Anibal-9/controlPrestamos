
import { Pressable, StyleSheet, Text } from "react-native";

type BotonSaludarProps = {
  onPress: () => void;
};

export default function BotonSaludar({
  onPress,
}: BotonSaludarProps) {
  return (
    <Pressable
      style={styles.boton}
      onPress={onPress}
    >
      <Text style={styles.textoBoton}>
        Registrar préstamo
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#2563eb",
    width: "90%",
    maxWidth: 350,
    minHeight: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 12,
  },

  textoBoton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
