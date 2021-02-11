import React from 'react';
import { useState } from 'react';
import useToastContext from './useToastContext'
import {
  TextInput,
  View,
  Button
} from 'react-native';
export default function Foo() {
  const [text, setText] = useState('Test');
  const addToast = useToastContext();

  function handleClick() {
    addToast(text);
  }
  return (
      <View>
      <TextInput
        onChangeText={text => setText(text)}
        defaultValue={text}
        editable
        maxLength={40}
      />
      <Button
        onPress={handleClick}
        title="Click"
        color="#841584"
      />
      </View>
  )
}