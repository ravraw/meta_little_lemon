import { View, StyleSheet } from 'react-native'
import HomeBanner from '../components/HomeBanner'
import MenuComponet from '../components/MenuComponent'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HomeBanner />
            <MenuComponet />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
})

export default HomeScreen
