import { useState, useEffect, useContext } from 'react'
import MenuItemsList from './MenuItemList'
import {
    addMenuItem,
    addMenuItems,
    getByCategory,
    getBySearchString,
    getMenuItems,
} from '../database/menu'
import { connectToDatabase } from '../database/db'
import HomeBanner from './HomeBanner'

const MenuComponent = () => {
    const [menu, setMenu] = useState([])
    const [searchString, setSearchString] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const db = connectToDatabase()
    const categories = ['all', 'starters', 'mains', 'desserts'].map((title) => {
        return { id: title, title }
    })

    const fetchMenu = async () => {
        try {
            let menuItems = await getMenuItems()
            if (menuItems.length) {
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

    const searchMenu = async (string) => {
        setSearchString(string.toLowerCase())
        let menuItems = []
        if (string) {
            menuItems = await getBySearchString(string)
            setMenu(menuItems)
        } else {
            menuItems = await getMenuItems()
            setMenu(menuItems)
        }
    }

    const filterMenu = async (categoryName) => {
        let menuItems = []
        if (categoryName === 'all' || '') {
            menuItems = await getMenuItems()
        } else {
            menuItems = await getByCategory(categoryName)
        }
        setMenu(menuItems)
    }

    const updateSearchString = (string) => {
        setSearchString(string.toLowerCase())
    }

    return (
        <>
            <HomeBanner
                searchString={searchString}
                setSearchString={updateSearchString}
            />
            <MenuItemsList
                menu={menu}
                categories={categories}
                filterMenu={filterMenu}
            />
        </>
    )
}

export default MenuComponent
