
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  scroll: {
    flex: 1,
  },

  contenedor: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
  },

  descripcion: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },

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

  resultado: {
    fontSize: 14,
    color: "#166534",
    textAlign: "center",
    marginTop: 15,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginTop: 25,
    marginBottom: 5,
    alignSelf: "flex-start",
  },

  vacio: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginTop: 15,
  },

  seccionAbono: {
    width: "100%",
    maxWidth: 350,
    marginTop: 30,
    padding: 18,
    backgroundColor: "#e2e8f0",
    borderRadius: 12,
  },

  subtituloAbono: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
  },

  botonAbono: {
    backgroundColor: "#16a34a",
    width: "100%",
    minHeight: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    padding: 12,
  },

  textoBoton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  botonCancelar: {
    backgroundColor: "#ffffff",
    width: "100%",
    minHeight: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },

  textoCancelar: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "bold",
  },

  botonEliminar: {
    backgroundColor: "#dc2626",
    width: "100%",
    minHeight: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 12,
  },

  
  registroAbono: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },

  textoHistorial: {
    fontSize: 14,
    color: "#334155",
    marginVertical: 3,
  },

});

export default styles;
