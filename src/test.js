import fs from 'node:fs';

const dex = JSON.parse(fs.readFileSync('data/dex.json', 'utf8'))
const essSpecies = JSON.parse(fs.readFileSync('data/essSpecies.json', 'utf8'))
const err = { error: [] }
const existendSpecies = Object.values(dex)
for (const species of essSpecies.species) {
    if (!existendSpecies.includes(species)) {
        console.log(species, ' ❌')
        err.error.push(species)
        continue
    } else {
        console.log(species, ' ✅')
    }
}
fs.writeFileSync('data/err.json', JSON.stringify(err, null, 2))