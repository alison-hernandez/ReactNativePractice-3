import React, { useState } from 'react'
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'

import Card from '../components/card'
import Colors from '../constants/colors'
import Input from '../components/input'
import NumberContainer from '../components/numberContainer'

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const numberInputHandler = inputText => {
        // Input Validation: drop anything that's not a number
        // Our solution for Android
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be between 1 and 99.',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            Keyboard.dismiss();
            return;
        } 
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = 
        <Card style={styles.startContainer}>
            <Text>You selected:</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <View style={styles.startButton}>
                <Button 
                    title="START GAME!" 
                    onPress={() => {props.onStartGame(selectedNumber)}} 
                    color={Colors.primary} 
                />
            </View>
        </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}
        >
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input 
                    style={styles.input} 
                    blurOnSubmit 
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    keyboardType="number-pad" // Only removes the decimal from iOS keypad
                    maxLength={2} 
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                />
                <View style={styles.buttonContainer} >
                    <View style={styles.button}><Button title="Reset" onPress={() => {resetInputHandler()}} color={Colors.accent} /></View>
                    <View style={styles.button}><Button title="Confirm" onPress={() => {confirmInputHandler()}} color={Colors.primary} /></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        // The width is hardcoded, but maxWidth says if 300 is too big, don't take up more than 80% of the device screen 
        // (responsive-ish design)
        width: 300,
        maxWidth: "80%",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    startContainer: {
        // width: 300,
        maxWidth: "80%",
        alignItems: "center",
        marginTop: 20
    },
    startButton: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: Colors.lightAccent,
        // marginTop: 10
    }
})

export default StartGameScreen;