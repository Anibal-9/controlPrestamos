
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";

type CampoAnimadoProps = {
  value: string;
  onChangeText: (texto: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
};

export default function CampoNombre({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: CampoAnimadoProps) {
  const [enfocado, setEnfocado] = useState(false);

  return (
    <TextInput
      style={[
        styles.campo,
        enfocado && styles.campoActivo,
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      onFocus={() => setEnfocado(true)}
      onBlur={() => setEnfocado(false)}
    />
  );
}

const styles = StyleSheet.create({
  campo: {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    width: "90%",
    maxWidth: 350,
    minHeight: 50,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginTop: 15,
  },

  campoActivo: {
    borderColor: "#2563eb",
    borderWidth: 2,
    backgroundColor: "#eff6ff",
  },
});
