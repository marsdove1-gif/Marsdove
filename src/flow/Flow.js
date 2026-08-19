import StepState from "./StepState.js";
import StepValidator from "./StepValidator.js";

import canNext from "./helpers/canNext.js";
import canPrev from "./helpers/canPrev.js";
import progress from "./helpers/progress.js";

class Flow {

    #steps = new Map();

    #order = [];

    #state = new StepState();

    #validator = new StepValidator();

    register(step) {

        this.#steps.set(step.id, step);

        this.#order.push(step.id);

        if (this.#state.current === null) {

            this.#state.current = 0;

        }

        return this;

    }

    get(id) {

        return this.#steps.get(id);

    }

    current() {

        return this.#steps.get(

            this.#order[this.#state.current]

        );

    }

    next(context) {

        const step = this.current();

        if (!this.#validator.canLeave(step, context)) {

            return false;

        }

        if (!canNext(this.#state.current, this.#order.length)) {

            return false;

        }

        step.leave(context);

        this.#state.current++;

        this.current().enter(context);

        return true;

    }

    prev(context) {

        if (!canPrev(this.#state.current)) {

            return false;

        }

        this.current().leave(context);

        this.#state.current--;

        this.current().enter(context);

        return true;

    }

    progress() {

        return progress(

            this.#state.current,

            this.#order.length

        );

    }

}

export default Flow;