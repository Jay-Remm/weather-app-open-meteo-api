export const ICON_MAP = new Map()

// map codes are from the open-meteo api documentation
addMapping([0, 1], 'sun')
addMapping([2], 'cloud-sun')
addMapping([3], 'cloud')
addMapping([45, 48], 'smog')
addMapping([51, 53, 56, 61, 63, 66, 80, 81], 'cloud-rain')
addMapping([55, 57, 65, 67, 82], 'cloud-showers-heavy')
addMapping([71, 73, 75, 77, 85, 86], 'snowflake')
addMapping([95, 96, 99], 'cloud-bolt')

// helper function because alot of our map indexes are going to have the same icon value
function addMapping(values, icon) {
    values.forEach(value => {
        ICON_MAP.set(value, icon)
    })
}