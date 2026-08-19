class StepValidator {
  canEnter(step, context) {
    if (!step) return false;

    if (typeof step.canEnter === "function") {
      return step.canEnter(context) !== false;
    }

    return true;
  }

  canLeave(step, context) {
    if (!step) return false;

    if (typeof step.validate === "function") {
      return step.validate(context) !== false;
    }

    return true;
  }
}

export default StepValidator;
