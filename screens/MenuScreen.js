import { useState, useEffect } from 'react'
import MenuItemsList from '../components/MenuItemList'
import { menuItems } from '../helper/menuData'

const MenuScreen = () => {
    const [menu, setMenu] = useState(menuItems)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchMenu = async () => {
        try {
            const response = await fetch(
                'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json'
            )
            const json = await response.json()
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

export default MenuScreen
