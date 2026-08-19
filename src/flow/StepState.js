class StepState {

    #current = null;

    #visited = new Set();

    #completed = new Set();

    #disabled = new Set();

    get current() {

        return this.#current;

    }

    set current(step) {

        this.#current = step;

    }

    reset() {

        this.#current = null;

        this.#visited.clear();

        this.#completed.clear();

        this.#disabled.clear();

    }

}