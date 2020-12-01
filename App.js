import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Cita from './components/Cita'
import Formulario from './components/Formulario'

export default function App() {

  const [mostrarform, setMostrarform] = useState(false)

  const [citas, setCitas] = useState([]);

  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
        return citasActuales.filter( cita => cita.id !== id)
    })
  }
  
  const mostrarFormulario = () => {
    setMostrarform(!mostrarform)
  }

  const cerrarTeclado = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas</Text>
        <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
          <Text style={styles.txtMostrarForm}>{mostrarform ? 'Cancelar nueva cita' : 'Agregar nueva cita'}</Text>
        </TouchableHighlight>

        <View style={styles.contenido}>
          {mostrarform ? (
            <>
              <Text style={styles.titulo}>Crear nueva cita</Text>
            <Formulario citas={citas} setCitas={setCitas} setMostrarform={setMostrarform} />
            </>
          ):(
            <>
              <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas'}</Text>
              <FlatList 
                style={styles.listado}
                data={citas}
                renderItem={({item}) => <Cita item={item} eliminarPaciente={eliminarPaciente} /> } 
                keyExtractor={cita => cita.id} />
              
            </>
          )}        
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: 'gray',
    marginVertical: 10
  },
  txtMostrarForm: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center'
  }
});
