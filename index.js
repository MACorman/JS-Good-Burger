document.addEventListener("DOMContentLoaded", () => {
  console.log("DoOM successfully loaded")
  let burgerMenu = document.getElementById("burger-menu")

  function getBurgers () {
    return fetch("http://localhost:3000/burgers")
    .then(response => response.json())
    .then(burgers => {
      console.log(burgers)
      burgers.forEach(function (burger) {
        let burgerDiv = document.createElement("div")
        burgerDiv.classList.add("burger")
        burgerDiv.innerHTML = `
        <h3 class="burger_title">${burger.name}</h3>
        <img src="${burger.image}">
        <p class="burger_description">${burger.description}</p>
        <button class="button">Add to Order</button>
        `
        burgerMenu.append(burgerDiv)
      })
    })
  }
  getBurgers()

  let orderList = document.getElementById("order-list")
  document.addEventListener("click", function (e) {
    if (e.target.className === "button") {
      let orderLi = document.createElement("li")
      orderLi.innerHTML = `${e.target.parentNode.firstElementChild.innerText}`
      orderList.append(orderLi)
    }
  })

  let customBurgerForm = document.getElementById("custom-burger")
  customBurgerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let burgerTitle = e.target.elements[0].value
    let burgerDescription = e.target.elements[1].value
    let burgerImage = e.target.elements[2].value
    let burgerObj = {
      name: burgerTitle,
      description: burgerDescription,
      image: burgerImage
    }

    fetch("http://localhost:3000/burgers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(burgerObj)
    })
    .then(response => response.json())
    .then(burger => {
      let burgerDiv = document.createElement("div")
        burgerDiv.classList.add("burger")
        burgerDiv.innerHTML = `
        <h3 class="burger_title">${burger.name}</h3>
        <img src="${burger.image}">
        <p class="burger_description">${burger.description}</p>
        <button class="button">Add to Order</button>
        `
        burgerMenu.append(burgerDiv)
        let orderLi = document.createElement("li")
        orderLi.innerHTML = `${burger.name}`
        orderList.append(orderLi)
        customBurgerForm.reset()
    })

  })


})
