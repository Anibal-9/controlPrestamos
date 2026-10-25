
import { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type TarjetaAnimadaProps = {
  nombre: string;
  monto: number;
  abonado: number;
  fecha: string;
  seleccionada: boolean;
  onPress: () => void;
};

function formatoMoneda(cantidad: number) {
  return cantidad.toLocaleString("es-DO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function TarjetaAnimada({
  nombre,
  monto,
  abonado,
  fecha,
  seleccionada,
  onPress,
}: TarjetaAnimadaProps) {
  const escala = useRef(new Animated.Value(1)).current;

  function animarTarjeta() {
    Animated.sequence([
      Animated.spring(escala, {
        toValue: 1.03,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.spring(escala, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  }

  const saldoPendiente = Math.max(0, monto - abonado);
  const pagado = saldoPendiente === 0;

  return (
    <Animated.View
      style={[
        styles.tarjeta,
        seleccionada && styles.tarjetaSeleccionada,
        { transform: [{ scale: escala }] },
      ]}
    >
      <Pressable
        onPress={animarTarjeta}
        accessibilityRole="button"
        accessibilityLabel={`Seleccionar préstamo de ${nombre}`}
      >
        <Text style={styles.nombreTarjeta}>
          {nombre}
        </Text>

        <Text style={styles.fecha}>
          Fecha del préstamo: {fecha}
        </Text>

        <Text style={styles.etiqueta}>
          Monto prestado
        </Text>
        <Text style={styles.monto}>
          RD$ {formatoMoneda(monto)}
        </Text>

        <Text style={styles.etiqueta}>
          Total abonado
        </Text>
        <Text style={styles.abonado}>
          RD$ {formatoMoneda(abonado)}
        </Text>

        <Text style={styles.etiqueta}>
          Saldo pendiente
        </Text>
        <Text style={styles.saldo}>
          RD$ {formatoMoneda(saldoPendiente)}
        </Text>

        <Text style={styles.estado}>
          {pagado
            ? "Préstamo pagado"
            : seleccionada
              ? "Seleccionado para abonos"
              : "Toca para seleccionar"}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: 350,
    padding: 20,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  tarjetaSeleccionada: {
    backgroundColor: "#eff6ff",
    borderColor: "#2563eb",
    borderWidth: 2,
  },

  nombreTarjeta: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1e293b",
  },

  fecha: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 8,
    marginBottom: 15,
  },

  etiqueta: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 10,
  },

  monto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 3,
  },

  abonado: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16a34a",
    marginTop: 3,
  },

  saldo: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#2563eb",
    marginTop: 3,
  },

  estado: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 15,
  },
});
