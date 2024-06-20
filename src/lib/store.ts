import {CharacterMaterials} from "@/data/character-materials";
import {ExpLevels} from "@/data/exp-levels";

export default class Store {
    characters: { [key: string]: { status: { [key: string]: boolean } } };
    ascensionMaterials: { [key: string]: number };
    expMaterials: { [key: string]: number };

    constructor(store?: Store) {
        if (store) {
            this.characters = {...store.characters}
            this.ascensionMaterials = {...store.ascensionMaterials}
            this.expMaterials = {...store.expMaterials}
        } else {
            this.characters = {}
            this.ascensionMaterials = {}
            this.expMaterials = {}
        }
    }

    stEx(fn: (...args: any[]) => any, ...args: any[]) {
        fn.apply(this, args)

        return new Store(this)
    }

    createCharacter(id: string) {
        this.characters[id] = {status: {}}
    }

    setAscensionMaterialCount(material: string, count: number) {
        this.ascensionMaterials[material] = Math.max(count, 0)
    }

    getAscensionMaterialCount(material: string) {
        return this.ascensionMaterials[material] || 0
    }

    setExpMaterialCount(material: string, count: number) {
        this.expMaterials[material] = Math.max(count, 0)
    }

    getExpMaterialCount(material: string) {
        return this.expMaterials[material] || 0
    }

    getRequiredExpForCharacter(id: string) {
        return Object.entries(this.characters[id]?.status).filter(([key, value]) => {
                return key.startsWith("level") && !this.characters[id]?.status[key]
            }).map(([key]) => ExpLevels[key]).reduce((acc, curr) => acc + curr, 0)
    }

    getRequiredExpForAllCharacters() {
        return Object.keys(this.characters).map(key => {
            return this.getRequiredExpForCharacter(key)
        }).reduce((acc, curr) => acc + curr, 0)
    }

    getCurrentExp() {
        return (
            ((this.expMaterials["heros_wit"] || 0) * 20000) +
            ((this.expMaterials["adventurer_exp"] || 0) * 5000) +
            ((this.expMaterials["wanderers_advice"] || 0) * 1000)
        )
    }

    getCurrentExpWithoutMaterial(material: string) {
        return Object.keys(this.expMaterials)
            .filter(key => key !== material)
            .map(key => [key, this.expMaterials[key]])
            .map(([key, value]) => {
                return {
                    heros_wit: 20000,
                    adventurers_experience: 5000,
                    wanderers_advice: 1000
                }[key]! * (value as number)
            })
            .reduce((acc, curr) => acc + curr, 0)
    }

    setCharacterStatus(id: string, status: { [key: string]: boolean }) {
        if (!this.characters[id]) this.createCharacter(id)

        this.characters[id].status = status
    }

    getCharacterStatus(id: string) {
        return this.characters[id]?.status
    }

    getRequiredAscensionMaterialsForCharacter(id: string) {
        // Some Array.map Array.filter Array.reduce magic
        const character = CharacterMaterials[id]
        const keysToAggregate = Object.keys(character).filter(key => {
            if (!this.characters[id]) return true
            return !this.characters[id].status[key]
        })
        const aggregatedMaterials = keysToAggregate.map(key => character[key])

        return aggregatedMaterials.reduce((acc, curr) => {
            Object.keys(curr).forEach(key => {
                acc[key] = acc[key] ? acc[key] + curr[key] : curr[key]
            })

            return acc
        }, {})
    }

    getRequiredAscensionMaterialsForAllCharacters() {
        return Object.keys(this.characters).map(key => {
            return this.getRequiredAscensionMaterialsForCharacter(key)
        }).reduce((acc, curr) => {
            Object.keys(curr).forEach(key => {
                acc[key] = acc[key] ? acc[key] + curr[key] : curr[key]
            })

            return acc
        }, {})
    }

    serialize() {
        return JSON.stringify({
            characters: this.characters,
            ascensionMaterials: this.ascensionMaterials,
            expMaterials: this.expMaterials
        })
    }

    deserialize(data: string) {
        const store = JSON.parse(data)

        this.characters = store.characters
        this.ascensionMaterials = store.ascensionMaterials
        this.expMaterials = store.expMaterials
    }
}
