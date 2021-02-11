import { useContext } from 'react';
import ToastContext from './ToastContext'

export default function useToastContext() {
  return useContext(ToastContext)
}