class MapStructure {

    #items = new Map();

    set(key, value) {

        this.#items.set(key, value);

        return this;

    }

    get(key) {

        return this.#items.get(key);

    }

    has(key) {

        return this.#items.has(key);

    }

    delete(key) {

        return this.#items.delete(key);

    }

    clear() {

        this.#items.clear();

        return this;

    }

    values() {

        return [...this.#items.values()];

    }

    keys() {

        return [...this.#items.keys()];

    }

    entries() {

        return [...this.#items.entries()];

    }

    forEach(callback) {

        this.#items.forEach(callback);

    }

    get size() {

        return this.#items.size;

    }

}
export default MapStructure;