import { useEffect, useState, useCallback, useMemo } from 'react'
import MenuItemsList from './MenuItemList'
import {
    addMenuItems,
    getMenuItems,
    filterByQueryAndCategories,
} from '../database/menu'
import HomeBanner from './HomeBanner'
import { useUpdateEffect, debounce } from '../utils/helper'

const MenuComponent = () => {
    const categories = ['starters', 'mains', 'desserts', 'drinks', 'specials']
    const [menu, setMenu] = useState([])
    const [searchString, setSearchString] = useState('')
    const [selectedCategories, setSelectedCategories] = useState(
        categories.map(() => false)
    )

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

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

    useUpdateEffect(() => {
        ;(async () => {
            const activeCategories = categories.filter((s, i) => {
                if (selectedCategories.every((item) => item === false)) {
                    return true
                }
                return selectedCategories[i]
            })
            try {
                const menuItems = await filterByQueryAndCategories(
                    searchString,
                    activeCategories
                )
                setMenu(menuItems)
            } catch (e) {
                console.log(
                    'Error when trying to fetch filtered menu',
                    e.message
                )
            }
        })()
    }, [selectedCategories, searchString])

    const lookup = useCallback((q) => {
        setSearchString(q)
    }, [])

    const debouncedLookup = useMemo(() => debounce(lookup, 500))

    const searchMenu = async (string) => {
        setSearchString(string.toLowerCase())
        debouncedLookup(string.toLowerCase())
    }

    const filterMenu = async (index) => {
        const arrayCopy = [...selectedCategories]
        arrayCopy[index] = !selectedCategories[index]
        setSelectedCategories(arrayCopy)
    }

    return (
        <>
            <HomeBanner
                searchString={searchString}
                setSearchString={searchMenu}
            />
            <MenuItemsList
                menu={menu}
                categories={categories}
                filterMenu={filterMenu}
                selectedCategories={selectedCategories}
            />
        </>
    )
}

export default MenuComponent
