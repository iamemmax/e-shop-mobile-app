import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native"
import HomeStack from "./navigations/stack/Home";
import OnboardingStack from "./navigations/stack/onboarding/onBoardingStack";
import { Poppins_500Medium_Italic, Poppins_400Regular, Poppins_100Thin, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold } from "@expo-google-fonts/poppins"
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useAppSelector } from './redux/hooks';
import { useEffect } from 'react';
import Tabs from './navigations/tab';
import * as SplashScreen from 'expo-splash-screen';



SplashScreen.preventAutoHideAsync();
const App = () => {

  const [fontsLoaded] = useFonts({
    Poppins_500Medium_Italic, Poppins_400Regular, Poppins_100Thin, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])
  if (!fontsLoaded) {
    return undefined
  } else {
    SplashScreen.hideAsync()
  }

  return (

    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Tabs />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
export default App




