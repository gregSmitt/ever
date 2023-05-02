import { useState } from "react"

const useLocalStorage = <T extends string,>(key: string, defaultValue: T)
	: [storedValue: T, setValue: (newValue: T) => void] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const value = localStorage.getItem(key)
			if (value) {
				return JSON.parse(value)
			} else {
				localStorage.setItem(key, JSON.stringify(defaultValue))
				return defaultValue
			}
		} catch (error) {
			return defaultValue
		}
	})

	const setValue = (newValue: T) => {
		try {
			localStorage.setItem(key, JSON.stringify(newValue))
		} catch (error) {
			console.log(error)
		}
		setStoredValue(newValue)
	}

	return [storedValue, setValue]
}
export default useLocalStorage