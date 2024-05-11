import { connectToDatabase, createTables } from './db'

export const addMenuItems = async (items) => {
    const db = await connectToDatabase()

    const values = items
        .map(
            (item) => `(
        "${item.name}",
        "${item.price}",
        "${item.image}",
        "${item.description}",
        "${item.category}"
    )`
        )
        .join(',')

    const insertQuery = `
        INSERT OR REPLACE INTO menu (name, price, description, image, category)
        VALUES ${values}`
    try {
        return db.executeSql(insertQuery, values)
    } catch (error) {
        console.error('Failed to add menu item', error)
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
        return menuItems
    } catch (error) {
        console.log('Failed to get Menu items from database', error)
    }
}

export const filterByQueryAndCategories = async (
    searchString,
    activeCategories
) => {
    const db = await connectToDatabase()
    const query = searchString
        ? `SELECT * FROM menu WHERE name LIKE '%${searchString}%' AND category IN (?, ?, ?, ?, ?, ?)`
        : `SELECT * FROM menu WHERE  category IN (?, ?, ?, ?, ?, ?)`

    console.log({ searchString, activeCategories, query })

    try {
        const menuItems = []
        const results = await db.executeSql(query, [...activeCategories])
        results?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                menuItems.push(result.rows.item(index))
            }
        })
        return menuItems
    } catch (error) {
        console.log('Failed to get Menu items from database', error)
    }
}
