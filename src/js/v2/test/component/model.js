import elements from "../../elements/index.js";

const defaultState = {
  title: "",
  description: "",
  image: "",
}

export default class Component extends elements.CustomElement {
  constructor(data = defaultState) {
    super()
  }
}