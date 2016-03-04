var CalculatorMixin = Base => class extends Base {
  bfn() {
    return this.b;
  }
};

var RandomizerMixin = Base => class extends Base {
  afn() {
    return this.a;
  }
};

class Foo {
  constructor(a) {
    this.a = a;
  }
}
class Bar extends CalculatorMixin(RandomizerMixin(Foo)) {
  constructor(a, b) {
    super(a);
    this.b = b;
  }
}

export default Bar;
