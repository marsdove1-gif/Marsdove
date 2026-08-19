const events = new Map();

export const RuntimeEvents = {

  on(name, callback) {

    if (!events.has(name)) {
      events.set(name, new Set());
    }

    events.get(name).add(callback);

    return () => {

      events
        .get(name)
        ?.delete(callback);

    };

  },

  once(name, callback) {

    const off = this.on(name, payload => {

      off();

      callback(payload);

    });

  },

  emit(name, payload) {

    events
      .get(name)
      ?.forEach(callback => callback(payload));

  },

  clear() {

    events.clear();

  }

};