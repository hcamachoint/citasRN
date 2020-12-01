import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native'
import DateTimePickerModal from "@react-native-community/datetimepicker"
import shortid from 'shortid'

export default function Formulario({citas, setCitas, setMostrarform}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [paciente, setPaciente] = useState('')
    const [propietario, setPropietario] = useState('')
    const [telefono, setTelefono] = useState('')
    const [sintomas, setSintomas] = useState('')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = {year: 'numeric', month: 'long', day: '2-digit'}
        setFecha(date.toLocaleDateString('es-ES', opciones))
        hideDatePicker();
    };

    //MUESTRA / OCULTAR EL TIMEPICKER
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (hora) => {
        const opciones = {hour: 'numeric', minute:'2-digits', hour12: false}
        setHora(hora.toLocaleString('en-US', opciones))
        hideTimePicker();
    };

    const crearNuevaCita = () => {
        //FALLA LA VALIDACION
        if (paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || sintomas.trim() === '') {
            mostrarAlerta()
            console.log("algo fallo")
        }else{
            const cita = {paciente, propietario, telefono, fecha, hora, sintomas}
            cita.id = shortid.generate();
            
            const citasNuevas = [...citas, cita]
            setCitas(citasNuevas)
    
            setMostrarform(false)
        }        
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'OK'
            }]
        )
    }

    return (
        <ScrollView style={styles.formulario}>
            <View>
                <Text style={styles.label}>Paciente:</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={texto => setPaciente(texto)} />
            </View>
            <View>
                <Text style={styles.label}>Dueño:</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={texto => setPropietario(texto)} />
            </View>
            <View>
                <Text style={styles.label}>Telefono Contacto:</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={texto => setTelefono(texto)}
                    keyboardType='number-pad' />
            </View>
            <View>
                <Text style={styles.label}>Fecha:</Text>
                <Button title="Seleccionar fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={confirmarFecha}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                    headerTextIOS="Elige una fecha"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                />
                <Text>{fecha}</Text>
            </View>
            <View>
                <Text style={styles.label}>Hora:</Text>
                <Button title="Seleccionar hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={confirmarHora}
                    onCancel={hideTimePicker}
                    locale='es_ES'
                    headerTextIOS="Elige una hora"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                />
                <Text>{hora}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sintomas:</Text>
                <TextInput 
                    multiline
                    style={styles.input} 
                    onChangeText={texto => setSintomas(texto)} />
            </View>
            <View>
                <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.btnSubmit}>
                    <Text style={styles.txtSubmit}>Agregar</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: 'green',
        marginVertical: 10
    },
    txtSubmit: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})