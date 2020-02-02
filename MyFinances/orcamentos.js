// Função para o botão collapse do Total
let collTotal = document.getElementsByClassName("collapsibleTotal");
let iTotal;

for (iTotal = 0; iTotal < collTotal.length; iTotal++) {
  collTotal[iTotal].addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  })
}

// Função para o botão collapse
let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  })
}

// Altera a data para o mês e ano atual
document.querySelector("#date").valueAsDate = new Date();

// Leitura localstorage
let compareDate = document.getElementById("date").value;
let budgets = []

if (localStorage.getItem("budgets")) {
  budgets = JSON.parse(localStorage.getItem("budgets"))

  for (let i = 0; i < budgets.length; i++) {
    const savedItem = budgets[i]

    if (savedItem.date === compareDate) {

      document.getElementById("alimentacaoMaxBudget").value = savedItem.food
      document.querySelector("#habitacaoMaxBudget").value = savedItem.home
      document.querySelector("#lazerMaxBudget").value = savedItem.entertainment
      document.querySelector("#saudeMaxBudget").value = savedItem.health
      document.querySelector("#vehicleMaxBudget").value = savedItem.vehicle
      document.querySelector("#totalMaxBudget").value = savedItem.total
    }
  }
} else {
  budgets = []
}

// Botão guardar orçamentos
saveButton = document.querySelector(".saveButton")
let foodBudget = document.getElementById("foodBudget")
let foodBudgetLabel = document.getElementById("alimentacaoMaxBudget")
let homeBudget = document.getElementById("homeBudget")
let homeBudgetLabel = document.getElementById("habitacaoMaxBudget")
let lazerBudget = document.getElementById("entertainmentBudget")
let lazerBudgetLabel = document.getElementById("lazerMaxBudget")
let healthBudget = document.getElementById("healthBudget")
let healthBudgetLabel = document.getElementById("saudeMaxBudget")
let vehicleBudget = document.getElementById("vehicleBudget")
let vehicleBudgetLabel = document.getElementById("vehicleMaxBudget")

saveButton.addEventListener("click", function () {
  foodBudgetLabel.value = +foodBudget.value + +foodBudgetLabel.value
  homeBudgetLabel.value = +homeBudget.value + +homeBudgetLabel.value
  lazerBudgetLabel.value = +lazerBudget.value + +lazerBudgetLabel.value
  healthBudgetLabel.value = +healthBudget.value + +healthBudgetLabel.value
  vehicleBudgetLabel.value = +vehicleBudget.value + +vehicleBudgetLabel.value
  totalMaxBudget.value = +foodBudgetLabel.value + +homeBudgetLabel.value + +lazerBudgetLabel.value + +healthBudgetLabel.value + +vehicleBudgetLabel.value
  checkOverflow()

  let foundDate = false;
  let savedItem;
  let compareDate = document.querySelector("#date").value;

  // Ciclo que compara se a data escolhida já existe no localstorage; se existir substitui os dados, senão cria uns novos
  for (let i = 0; i < budgets.length; i++) {
    savedItem = budgets[i];

    if (savedItem.date === compareDate) {
      SaveItem(savedItem);
      foundDate = true;
    }
  }

  if (!foundDate) {
    let newBudgets = {};
    SaveItem(newBudgets, foundDate);
  }
  location.reload();
})

// Escolher cor das despesas conforme ultrapasse ou não o orçamento
function checkOverflow() {
  if (+actualExpenseFood.value > +foodBudgetLabel.value) {
    actualExpenseFood.style.color = "red"
  } else if (+actualExpenseFood.value < +foodBudgetLabel.value) {
    actualExpenseFood.style.color = "green"
  } else actualExpenseFood.style.color = "black"

  if (+actualExpenseHome.value > +homeBudgetLabel.value) {
    actualExpenseHome.style.color = "red"
  } else if (+actualExpenseHome.value <= +homeBudgetLabel.value) {
    actualExpenseHome.style.color = "green"
  } else actualExpenseFood.style.color = "black"

  if (+actualExpenseEntertainment.value > +lazerBudgetLabel.value) {
    actualExpenseHome.style.color = "red"
  } else if (+actualExpenseEntertainment.value <= +lazerBudgetLabel.value) {
    actualExpenseEntertainment.style.color = "green"
  } else actualExpenseFood.style.color = "black"

  if (+actualExpenseHealth.value > +healthBudgetLabel.value) {
    actualExpenseHealth.style.color = "red"
  } else if (+actualExpenseHealth.value <= +healthBudgetLabel.value) {
    actualExpenseHealth.style.color = "green"
  } else actualExpenseFood.style.color = "black"

  if (+actualExpenseVehicle.value > +vehicleBudgetLabel.value) {
    actualExpenseVehicle.style.color = "red"
  } else if (+actualExpenseVehicle.value <= +vehicleBudgetLabel.value) {
    actualExpenseVehicle.style.color = "green"
  } else actualExpenseFood.style.color = "black"
}

// Dados para posteriormente carregar valores
date = document.getElementById("date");
let expensesData = JSON.parse(localStorage.getItem('expenses'))

let actualExpenseFood = document.getElementById("food")
let actualExpenseHome = document.getElementById("home")
let actualExpenseEntertainment = document.getElementById("entertainment")
let actualExpenseHealth = document.getElementById("health")
let actualExpenseVehicle = document.getElementById("vehicle")
let totalActual = document.getElementById("totalActual")

function loadDataExpenses() {

  for (let i = 0; i < expensesData.length; i++) {

    let savedItem = expensesData[i];

    if (savedItem.date === date.value && (
        savedItem.generalFood > 0 || savedItem.restaurant > 0 ||
        savedItem.electricity > 0 || savedItem.water > 0 || savedItem.rent > 0 || savedItem.internet > 0 || savedItem.otherHousePay > 0 ||
        savedItem.movies > 0 || savedItem.sports > 0 || savedItem.gym > 0 || savedItem.nightOut > 0 || savedItem.trip > 0 ||
        savedItem.pharm > 0 || savedItem.doctor > 0 || savedItem.otherHealthPay > 0 ||
        savedItem.fuel > 0 || savedItem.carMaintenance > 0 || savedItem.carInsurance > 0 || savedItem.carFine > 0)) {

      actualExpenseFood.value = savedItem.generalFood + savedItem.restaurant;
      actualExpenseHome.value = savedItem.electricity + savedItem.water + savedItem.rent + savedItem.internet + savedItem.otherHousePay;
      actualExpenseEntertainment.value = savedItem.movies + savedItem.sports + savedItem.gym + savedItem.nightOut + savedItem.trip;
      actualExpenseHealth.value = savedItem.pharm + savedItem.doctor + savedItem.otherHealthPay;
      actualExpenseVehicle.value = savedItem.fuel + savedItem.carMaintenance + savedItem.carInsurance + savedItem.carFine;
      totalActual.value = ` ${+actualExpenseFood.value + +actualExpenseHome.value + +actualExpenseEntertainment.value + +actualExpenseHealth.value + +actualExpenseVehicle.value}`;
      break;

    } else if (savedItem.date !== date.value) {
      actualExpenseFood.value = 0;
      actualExpenseHome.value = 0;
      actualExpenseEntertainment.value = 0;
      actualExpenseHealth.value = 0;
      actualExpenseVehicle.value = 0;
      totalActual.value = 0;
    }
  }
}

// Carrega valores quando se abre a página
window.onload = function () {
  loadDataExpenses();
  checkOverflow()
}

// Carrega valores de cada mês das despesas ao mudar mês
date.onchange = function () {
  loadDataExpenses();
  checkOverflow()
}

// Função que guarda os valores no localstorage
function SaveItem(savedItem, foundDate = true) {
  savedItem.date = document.querySelector("#date").value;
  savedItem.food = +document.querySelector("#alimentacaoMaxBudget").value
  savedItem.home = +document.querySelector("#habitacaoMaxBudget").value
  savedItem.entertainment = +document.querySelector("#lazerMaxBudget").value
  savedItem.health = +document.querySelector("#saudeMaxBudget").value
  savedItem.vehicle = +document.querySelector("#vehicleMaxBudget").value
  savedItem.total = +document.querySelector("#totalMaxBudget").value

  if (!foundDate) {
    budgets[budgets.length] = savedItem;
  }

  localStorage.setItem("budgets", JSON.stringify(budgets))
}

// Função que vai meter os inputs todos a zero se nao existir a data no localstorage
function resetValues() {
  let elements = document.querySelectorAll("input[class=cssMaxBudget],input[class=cssMaxBudgetTotal")

  for (var i = 0, element; element = elements[i++];) {
    element.value = 0;
  }
}

// Leitura localstorage
function loadData(savedItem) {
  document.getElementById("alimentacaoMaxBudget").value = savedItem.food
  document.querySelector("#habitacaoMaxBudget").value = savedItem.home
  document.querySelector("#lazerMaxBudget").value = savedItem.entertainment
  document.querySelector("#saudeMaxBudget").value = savedItem.health
  document.querySelector("#vehicleMaxBudget").value = savedItem.vehicle
  document.querySelector("#totalMaxBudget").value = savedItem.total
}

let dataPick = document.getElementById("date");

// Função que: ou mete os valores dos inputs a zero, ou lê os dados do localstorage caso existam
dataPick.onchange = function () {

  let foundDate = false;
  let savedItem;
  let compareDate = document.querySelector("#date").value;

  for (let i = 0; i < budgets.length; i++) {
    savedItem = budgets[i];

    if (savedItem.date === compareDate) {
      foundDate = true;
      break;
    }
  }

  if (!foundDate)
    resetValues();
  else
    loadData(savedItem);
  loadDataExpenses()
}