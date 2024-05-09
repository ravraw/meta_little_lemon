import { enablePromise, openDatabase } from 'react-native-sqlite-storage'

// Enable promise for SQLite
enablePromise(true)

export const connectToDatabase = async () => {
    return openDatabase(
        { name: 'littleLemon', location: 'default' },
        () => {},
        (error) => {
            console.error(error)
            throw Error('Could not connect to database')
        }
    )
}
