import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

// DismissKeyboard serve para fechar o teclado numérico ao clicar na tela
export default function DismissKeyboard({ children }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}
