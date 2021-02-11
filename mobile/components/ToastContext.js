import React, { 
  useState, 
  useEffect,
  createContext,
  useCallback
 } from 'react';
import {
  View,
  FlatList,
  Text,
} from 'react-native';

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    if(toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts(toasts => toasts.slice(1)),
        3000
      )
      return () => clearTimeout(timer);
    }
  }, [toasts])

  const addToast = useCallback(
    function(toast) {
      setToasts(toasts => [...toasts, toast]);
    },
    [setToasts]
  )

  return (
    <ToastContext.Provider value={addToast}>
      <View>
        <View>
          {children}
        </View>
        <FlatList 
              keyExtractor={(item, index) => index.toString()} 
              data={toasts} 
              renderItem={({ item }) => {
                return (<View>
                  <Text>{item}</Text>
                </View>)
              }}
              />
      </View>
    </ToastContext.Provider>
  );
}
