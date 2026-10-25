
import { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CampoNombre from "../components/ui/CampoNombre";
import BotonSaludar from "../components/ui/BotonSaludar";
import TarjetaAnimada from "../components/ui/TarjetaAnimada";

import styles from "../styles/indexStyles";

type Abono = {
  id: string;
  monto: number;
  fecha: string;
};

type Prestamo = {
  id: string;
  nombre: string;
  monto: number;
  abonado: number;
  fecha: string;
  historialAbonos: Abono[];
};

export default function Index() {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [prestamoSeleccionado, setPrestamoSeleccionado] =
    useState<string | null>(null);
  const [montoAbono, setMontoAbono] = useState("");

  function registrarPrestamo() {
    const montoNumerico = Number(monto);

    if (nombre.trim() === "") {
      setMensaje("Escribe el nombre del cliente");
      return;
    }

    if (
      monto.trim() === "" ||
      !Number.isFinite(montoNumerico) ||
      montoNumerico <= 0
    ) {
      setMensaje("Escribe un monto válido");
      return;
    }

    const nuevoPrestamo: Prestamo = {
      id: `${Date.now()}-${Math.random()}`,
      nombre: nombre.trim(),
      monto: montoNumerico,
      abonado: 0,
      fecha: new Date().toLocaleDateString("es-DO"),
      historialAbonos: [],
    };

    setPrestamos((actuales) => [...actuales, nuevoPrestamo]);

    setMensaje(`Préstamo registrado para ${nombre.trim()}`);
    setNombre("");
    setMonto("");
  }

  function registrarAbono() {
    if (!prestamoSeleccionado) {
      setMensaje("Selecciona primero una tarjeta");
      return;
    }

    const abono = Number(montoAbono);

    if (
      montoAbono.trim() === "" ||
      !Number.isFinite(abono) ||
      abono <= 0
    ) {
      setMensaje("Escribe un monto de abono válido");
      return;
    }

    const prestamo = prestamos.find(
      (item) => item.id === prestamoSeleccionado
    );

    if (!prestamo) {
      setMensaje("No se encontró el préstamo seleccionado");
      return;
    }

    const saldoPendiente = prestamo.monto - prestamo.abonado;

    if (abono > saldoPendiente) {
      setMensaje(
        `El abono no puede superar el saldo pendiente de RD$ ${saldoPendiente.toLocaleString("es-DO")}`
      );
      return;
    }

    const nuevoAbono: Abono = {
      id: `${Date.now()}-${Math.random()}`,
      monto: abono,
      fecha: new Date().toLocaleDateString("es-DO"),
    };

    setPrestamos((actuales) =>
      actuales.map((item) =>
        item.id === prestamoSeleccionado
          ? {
              ...item,
              abonado: item.abonado + abono,
              historialAbonos: [
                ...item.historialAbonos,
                nuevoAbono,
              ],
            }
          : item
      )
    );

    setMensaje(
      `Abono de RD$ ${abono.toLocaleString("es-DO")} registrado el ${nuevoAbono.fecha}`
    );

    setMontoAbono("");
  }

  function cancelarAbono() {
    setPrestamoSeleccionado(null);
    setMontoAbono("");
    setMensaje("");
  }

  function confirmarEliminarPrestamo() {
    if (!prestamoSeleccionado) {
      return;
    }

    const prestamo = prestamos.find(
      (item) => item.id === prestamoSeleccionado
    );

    if (!prestamo) {
      setPrestamoSeleccionado(null);
      return;
    }

    Alert.alert(
      "Eliminar préstamo",
      `¿Seguro que quieres eliminar el préstamo de ${prestamo.nombre}? Esta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setPrestamos((actuales) =>
              actuales.filter(
                (item) => item.id !== prestamoSeleccionado
              )
            );

            setPrestamoSeleccionado(null);
            setMontoAbono("");
            setMensaje(
              `Préstamo de ${prestamo.nombre} eliminado`
            );
          },
        },
      ]
    );
  }

  const prestamoActual = prestamos.find(
    (item) => item.id === prestamoSeleccionado
  );

  return (
    <SafeAreaView style={styles.areaSegura}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contenedor}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>
          Control de préstamos
        </Text>

        <Text style={styles.descripcion}>
          Registra préstamos y controla los abonos
        </Text>

        <CampoNombre
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre del cliente"
        />

        <CampoNombre
          value={monto}
          onChangeText={setMonto}
          placeholder="Monto del préstamo"
          keyboardType="decimal-pad"
        />

        <BotonSaludar onPress={registrarPrestamo} />

        <Text style={styles.resultado}>
          {mensaje}
        </Text>

        <Text style={styles.subtitulo}>
          Préstamos registrados: {prestamos.length}
        </Text>

        {prestamos.length === 0 ? (
          <Text style={styles.vacio}>
            Todavía no hay préstamos registrados
          </Text>
        ) : (
          prestamos.map((prestamo) => (
            <TarjetaAnimada
              key={prestamo.id}
              nombre={prestamo.nombre}
              monto={prestamo.monto}
              abonado={prestamo.abonado}
              fecha={prestamo.fecha}
              seleccionada={
                prestamoSeleccionado === prestamo.id
              }
              onPress={() => {
                setPrestamoSeleccionado(prestamo.id);
                setMontoAbono("");
                setMensaje("");
              }}
            />
          ))
        )}

        {prestamoActual && (
          <View style={styles.seccionAbono}>
            <Text style={styles.subtituloAbono}>
              Gestionar préstamo
            </Text>

            <Text style={styles.descripcion}>
              Cliente: {prestamoActual.nombre}
            </Text>

            <Text style={styles.subtituloAbono}>
              Registrar un abono
            </Text>

            <CampoNombre
              value={montoAbono}
              onChangeText={setMontoAbono}
              placeholder="¿Cuánto abonó el cliente?"
              keyboardType="decimal-pad"
            />

            <Pressable
              style={styles.botonAbono}
              onPress={registrarAbono}
            >
              <Text style={styles.textoBoton}>
                Registrar abono
              </Text>
            </Pressable>

            <Text style={styles.subtituloAbono}>
              Historial de abonos
            </Text>

            {prestamoActual.historialAbonos.length === 0 ? (
              <Text style={styles.vacio}>
                Este préstamo todavía no tiene abonos
              </Text>
            ) : (
              [...prestamoActual.historialAbonos]
                .reverse()
                .map((abono) => (
                  <View
                    key={abono.id}
                    style={styles.registroAbono}
                  >
                    <Text style={styles.textoHistorial}>
                      Fecha: {abono.fecha}
                    </Text>

                    <Text style={styles.textoHistorial}>
                      Abono: RD$ {abono.monto.toLocaleString("es-DO")}
                    </Text>
                  </View>
                ))
            )}

            <Pressable
              style={styles.botonCancelar}
              onPress={cancelarAbono}
            >
              <Text style={styles.textoCancelar}>
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              style={styles.botonEliminar}
              onPress={confirmarEliminarPrestamo}
            >
              <Text style={styles.textoBoton}>
                Eliminar préstamo
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
