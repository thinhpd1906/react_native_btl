import { Stack } from "expo-router";
import { useFonts } from "expo-font";


export const unstable_settings = {
  initialRouteName: "home",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    'Poppins-SemiBold': require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return <Stack 
    screenOptions={{
      headerTitle: '',
      headerStyle: {
          backgroundColor: '#f0f2f5',
      },
      headerTitleStyle: {
        marginLeft: 0,
        paddingLeft: 0,
      },
    }}
  />;
};

export default Layout;
