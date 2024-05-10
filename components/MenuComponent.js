import { useState, useEffect, useContext } from 'react'
import MenuItemsList from './MenuItemList'
import { SignedInContext } from '../App'
import { addMenuItem, addMenuItems, getMenuItems } from '../database/menu'
import { connectToDatabase } from '../database/db'

const MenuComponent = () => {
    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const db = connectToDatabase()

    const fetchMenu = async () => {
        try {
            let menuItems = await getMenuItems()
            if (menuItems.length < 10) {
                const response = await fetch(
                    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
                )
                const { menu } = await response.json()
                menuItems = menu
                await addMenuItems(menuItems)
            }
            setMenu(menuItems)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMenu()
    }, [])

    return <MenuItemsList menu={menu} />
}

export default MenuComponent
