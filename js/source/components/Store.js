class Store {

  constructor() {
    this.listOfRecipes = [];
  }

  getRecipes() {
    return this.listOfRecipes;
  }

  setRecipes(newRecipes) {
    this.listOfRecipes = newRecipes;
  }

  saveToLocalStorage() {
    var seen = [];

    var replacer = function(key, value) {
      if (value != null && typeof value == "object") {
        if (seen.indexOf(value) >= 0) {
          return;
        }
        seen.push(value);
      }
      return value;
    };


    localStorage.setItem('data', JSON.stringify(this.listOfRecipes, replacer));
  }

  loadFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem('data'));

    if (!data) {
      data = [];
    }

    return data;
  }


}

export default Store