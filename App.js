import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/Store';
import AppNavigator from './src/navigation/Navigation';
import { ThemeProvider } from './src/theme/ThemeContext'; // Use the custom ThemeProvider

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
}
