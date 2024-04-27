import React from "react";
import { Image } from "react-native"

const Header = () => {
    return (
        <View>
        <Image
            style={styles.logo}
            source={require("../assets/Logo.png")}
          />
      </View>
    )

}

export default Header;