import { Dex } from '@pkmn/dex';
import fs from 'node:fs';


console.log(Dex.forGen(9).species.all()[Math.floor(Math.random() * 1024)])

const formByGender = ["Nidoran-F", "Nidoran-M"]
const genders = ["fE", "mA"]
const genders2 = ["female", "male"]
const formByType = ["Silvally", "Arceus"]
const types = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"]
const rotom = {
    "Rotom-Heat": "ROTOM_1",
    "Rotom-Wash": "ROTOM_2",
    "Rotom-Frost": "ROTOM_3",
    "Rotom-Fan": "ROTOM_4",
    "Rotom-Mow": "ROTOM_5",
}
/**
 * Nombres que el '-' forma parte del nombre y no de una forma
 */
const specialNames = {
    "Wo-Chien": "WOCHIEN",
    "Chien-Pao": "CHIENPAO",
    "Ting-Lu": "TINGLU",
    "Chi-Yu": "CHIYU",
}
const pikachus = {
    'Pikachu-Cosplay': 'PIKACHU_2', 'Pikachu-Rock-Star': 'PIKACHU_7',
    'Pikachu-Belle': 'PIKACHU_3', 'Pikachu-Pop-Star': 'PIKACHU_6',
    'Pikachu-PhD': 'PIKACHU_5', 'Pikachu-Libre': 'PIKACHU_4',
    'Pikachu-Original': 'PIKACHU_8', 'Pikachu-Hoenn': 'PIKACHU_9',
    'Pikachu-Sinnoh': 'PIKACHU_10', 'Pikachu-Unova': 'PIKACHU_11',
    'Pikachu-Kalos': 'PIKACHU_12', 'Pikachu-Alola': 'PIKACHU_13',
    'Pikachu-Partner': 'PIKACHU_14', 'Pikachu-Starter': 'PIKACHU_15',
    'Pikachu-World': 'PIKACHU', 'Pikachu': 'PIKACHU', 'Pikachu-Gmax': 'PIKACHU_17',
}
const dex = {}
function set(key, value) {
    dex[key] = value
}
for (const pkmn of Dex.forGen(9).species.all()) { /* TODO: añadir todos los pikachus */
    if (pkmn.forme !== '' || pkmn.num < 1) continue // ignorar formas y fakepokemons
    let { name, otherFormes, canGigantamax, formeOrder } = pkmn

    if (pkmn.name === 'Pikachu') {
        Object.keys(pikachus).forEach(key => set(key, pikachus[key]))
        continue
    }
    const essetialName = parse(name)
    set(name, essetialName)
    if (!otherFormes || !essetialName) continue
    otherFormes.forEach((form, index) => {
        const val = parse(form)
        if (form.includes('Ogerpon')) set(form, `${essetialName}_${index + 4}`) // para salterse las formas sin mascara de ogerpon
        else val ? set(form, val) : set(form, `${essetialName}_${index + 1}`)
    })
    if (canGigantamax) set(`${name}_Gmax`, `${essetialName}_${otherFormes.length + 1}`)
}

fs.writeFileSync('data/dex.json', JSON.stringify(dex, null, 2))
function parse(name) {

    /// if (name.inclues("'")) name.replace("'", "") Oricorio-Pa'u
    if (name.includes("’")) name = name.replace("’", "")
    if (name.includes(" ")) name = name.replace(" ", "")
    if (!name.includes("-")) { return name.toUpperCase() }

    //gender
    if (name == 'Nidoran-F') return name.toUpperCase().replace('-F', 'fE')
    else if (name == 'Nidoran-M') return name.toUpperCase().replace('-M', 'mA')

    //forme
    let _formByType = false
    for (const species of formByType) {
        if (name.includes(species)) {
            _formByType = true
            break
        }
    }

    for (const type of _formByType ? types : []) {
        if (name.includes(type)) {
            name = name.replace(`-${type}`, "")
            name = name.toUpperCase()
            return `${name}_${types.indexOf(type)}`
        }

    }
    if (specialNames[name] != undefined) return specialNames[name]
    //rotom
    if (name.includes("Rotom")) return rotom[name]
    return null
}