import { connectToDatabase, createTables } from './db'

export const addMenuItems = async (items) => {
    console.log(items[1])
    const db = await connectToDatabase()

    const values = [items[1]]
        .map(
            (item) => `(
        ${item.name},
        ${item.price},
        ${item.image},
        ${item.description},
        ${item.category}
    )`
        )
        .join(',')

    const insertQuery = `
        INSERT INTO menu (name, price, description, image, category)
        VALUES ${values}`
    try {
        return db.executeSql(insertQuery, values)
    } catch (error) {
        console.error(error)
        // throw Error('Failed to add menu item')
    }
}

export const getMenuItems = async () => {
    const db = await connectToDatabase()
    try {
        const menuItems = []
        const results = await db.executeSql('SELECT * FROM menu')
        results?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                menuItems.push(result.rows.item(index))
            }
        })
        console.log({ menuItems })
        return menuItems
    } catch (error) {
        console.error(error)
        // throw Error('Failed to get Menu items from database')
        console.log('Failed to get Menu items from database')
    }
}
