function progress(flow) {

    const total = flow.steps.length;

    if (!total) {

        return 0;

    }

    return ((flow.state.current + 1) / total) * 100;

}

export default progress;