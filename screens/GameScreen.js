import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Button, Text, Alert } from 'react-native'
import NumberContainer from '../components/numberContainer';
import Card from '../components/card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum
  }
}


const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))  
  const [rounds, setRounds] = useState(0);
  // useRef hook lets us have a type of state that will not cause the page to rerender on change!
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;

  // Runs AFTER every render cycle for the component.
  // Second argument is an array of dependencies (i.e. if any of these change, rerun effect hook)
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice 
      || direction === 'higher' && currentGuess > props.userChoice)
    ) {
        Alert.alert("Don't lie!", "You know that this is wrong...", [
          {text: 'Sorry!', style: 'cancel'}
      ])
      return;
    }
    
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNum);
    setRounds(curRounds => curRounds + 1)
  }

  return (
    <View style={styles.screen}>
        <Text>Opponent's Guess:</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <Button title="LOWER" onPress={() => {nextGuessHandler('lower')}} />
          <Button title="GREATER" onPress={() => {nextGuessHandler('higher')}} />
        </Card>
    </View>
    )
    
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  }
})

export default GameScreen;