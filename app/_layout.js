import { Stack } from "expo-router";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  // return (
  //   <Stack initialRouteName="index">
  //     <Stack.Screen name="index" />
  //   </Stack>
  // )
  return <Stack />;
};

export default Layout;
