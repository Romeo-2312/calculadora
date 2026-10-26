import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

const buttonWidth = Dimensions.get('window').width / 4;

const styles = StyleSheet.create({
  button: {
    height: '19%',
    width: buttonWidth,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#8a8a8a',
  },
  label: {
    fontSize: 24,
    textAlign: 'center',
  },
  operationButton: {
    color: '#fff',
    backgroundColor: '#fa8131',
  },
  buttonDouble: {
    width: buttonWidth * 2,
  },
  buttonTriple: {
    width: buttonWidth * 3,
  },
});

export default function Button({ label, onClick, double, triple, operation }) {
  const buttonStyles = [styles.button];
  if (double) buttonStyles.push(styles.buttonDouble);
  if (triple) buttonStyles.push(styles.buttonTriple);
  if (operation) buttonStyles.push(styles.operationButton);

  return (
    <TouchableHighlight
      style={buttonStyles}
      onPress={() => onClick(label)}
      underlayColor="#d6d6d6">
      <Text style={styles.label}>{label}</Text>
    </TouchableHighlight>
  );
}