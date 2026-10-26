import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './components/Button';
import Display from './components/Display';

export default class App extends Component {
  state = {
    displayValue: '0',
    storedValue: null,
    operation: null,
    waitingForOperand: false,
  };

  addDigit = digit => {
    this.setState(state => {
      if (digit === '.' && !state.waitingForOperand && state.displayValue.includes('.')) {
        return null;
      }

      const displayValue = state.waitingForOperand
        ? digit === '.' ? '0.' : digit
        : digit === '.'
          ? `${state.displayValue}.`
          : state.displayValue === '0'
            ? digit
            : `${state.displayValue}${digit}`;

      return { displayValue, waitingForOperand: false };
    });
  };

  cleanMemory = () => {
    this.setState({
      displayValue: '0',
      storedValue: null,
      operation: null,
      waitingForOperand: false,
    });
  };

  setOperation = operation => {
    if (operation === '=') {
      this.setState(state => {
        if (state.operation === null || state.storedValue === null) {
          return null;
        }

        const left = state.storedValue;
        const right = Number(state.displayValue);
        let result;

        switch (state.operation) {
          case '+':
            result = left + right;
            break;
          case '-':
            result = left - right;
            break;
          case '*':
            result = left * right;
            break;
          case '/':
            if (right === 0) {
              return {
                displayValue: 'Erro',
                storedValue: null,
                operation: null,
                waitingForOperand: true,
              };
            }
            result = left / right;
            break;
          default:
            return null;
        }

        return {
          displayValue: String(Number(result.toPrecision(12))),
          storedValue: null,
          operation: null,
          waitingForOperand: true,
        };
      });
      return;
    }

    this.setState(state => ({
      storedValue: Number(state.displayValue),
      operation,
      waitingForOperand: true,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label="AC" triple onClick={this.cleanMemory} />
          <Button label="/" operation onClick={this.setOperation} />
          <Button label="7" onClick={this.addDigit} />
          <Button label="8" onClick={this.addDigit} />
          <Button label="9" onClick={this.addDigit} />
          <Button label="*" operation onClick={this.setOperation} />
          <Button label="4" onClick={this.addDigit} />
          <Button label="5" onClick={this.addDigit} />
          <Button label="6" onClick={this.addDigit} />
          <Button label="-" operation onClick={this.setOperation} />
          <Button label="1" onClick={this.addDigit} />
          <Button label="2" onClick={this.addDigit} />
          <Button label="3" onClick={this.addDigit} />
          <Button label="+" operation onClick={this.setOperation} />
          <Button label="0" double onClick={this.addDigit} />
          <Button label="." onClick={this.addDigit} />
          <Button label="=" operation onClick={this.setOperation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttons: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});