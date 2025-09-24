function Sample(): PropertyDecorator {
  return (...args) => {
    console.log(args);
  };
}

class A {
  @Sample()
  name: string;
}
