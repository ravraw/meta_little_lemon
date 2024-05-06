import { useState, useEffect } from 'react'
import MenuItemsList from './MenuItemList'

const MenuComponent = () => {
    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchMenu = async () => {
        try {
            const response = await fetch(
                'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
            )
            const { menu } = await response.json()
            setMenu(menu)
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
