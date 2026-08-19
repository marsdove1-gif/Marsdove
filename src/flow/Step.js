class Step {

    #id;
    #meta;
    #handlers;
    #validator;

    constructor(config = {}) {

        this.#id = config.id;

        this.#meta = config.meta ?? {};

        this.#handlers = {

            enter: config.enter ?? (() => {}),

            leave: config.leave ?? (() => {})

        };

        this.#validator = config.validate ?? (() => true);

    }

    get id() {

        return this.#id;

    }

    get meta() {

        return this.#meta;

    }

    enter(context) {

        return this.#handlers.enter(context);

    }

    leave(context) {

        return this.#handlers.leave(context);

    }

    validate(context) {

        return this.#validator(context);

    }

}

export default Step;