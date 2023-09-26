let selectedCategory = "";
let selectedStep1Answer = "";
let selectedStep2Answer = "";
let selectedCategoryButton = null;
let selectedStep1Button = null;
let selectedStep2Button = null;

const nextButton = document.getElementById("nextButton");
const target1Element = document.getElementById("step1AnswersContainer");
const target2Element = document.getElementById("step2AnswersContainer");
const categoryElement = document.getElementById("categoryContainer");
const stepper2Element = document.querySelector(".stepper2");
const stepper3Element = document.querySelector(".stepper3");
const staticQuestion = document.getElementById("static-question");

nextButton.disabled = true;
const submitButton = document.getElementById("submitButton");

submitButton.disabled = true;

nextButton.addEventListener("click", function () {
  if (target1Element.style.display === "none") {
    target1Element.style.display = "block";
    target2Element.style.display = "none";
    categoryElement.style.display = "none";
    backButton.style.display = "block";
    staticQuestion.style.display = "none";
    stepper2Element.style.backgroundColor = "black";
    nextButton.disabled = true;
    if (selectedStep1Button) {
      selectedStep1Button.classList.remove("selected-step1-button");
    }
  } else {
    target1Element.style.display = "none";
    target2Element.style.display = "block";
    submitButton.style.display = "block";
    stepper3Element.style.backgroundColor = "black";
    nextButton.style.display = "none";
    if (selectedStep2Button) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
});

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function () {
  if (categoryElement.style.display === "block") {
    target1Element.style.display = "none";
    target2Element.style.display = "none";
    backButton.style.display = "none";
    submitButton.style.display = "none";
  } else if (target1Element.style.display === "block") {
    target1Element.style.display = "none";
    target2Element.style.display = "none";
    categoryElement.style.display = "flex";
    backButton.style.display = "none";
    submitButton.style.display = "none";
    staticQuestion.style.display = "block";
    nextButton.disabled = false;
    stepper2Element.style.backgroundColor = "rgb(203, 203, 203)";
  } else {
    target1Element.style.display = "block";
    target2Element.style.display = "none";
    categoryElement.style.display = "none";
    submitButton.style.display = "none";
    nextButton.style.display = "block";
    stepper3Element.style.backgroundColor = "rgb(203, 203, 203)";
  }
});

let categoryContainer = document.getElementById("categoryContainer");
let step1AnswersContainer = document.getElementById(
  "step1AnswersContainer"
);
let step2AnswersContainer = document.getElementById(
  "step2AnswersContainer"
);

let questionsData = ["questions.json"];

fetch(questionsData)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((questionsData) => {
    questionsData.forEach(function (category) {
      var button = document.createElement("button");
      button.textContent = category.name;
      button.addEventListener("click", function () {
        if (selectedCategory !== category.name) {
          if (selectedCategoryButton) {
            selectedCategoryButton.classList.remove(
              "selected-category-button"
            );
          }
          selectedCategoryButton = button;
          selectedCategoryButton.classList.add(
            "selected-category-button"
          );
          selectedCategory = category.name;
          clearAnswers();
          showSubTitle(category.steps);
          showQuestions(category.steps);
          showAnswers(category.steps);
          target1Element.style.display = "none";
          target2Element.style.display = "none";
          backButton.style.display = "none";
          nextButton.disabled = false;
        }
      });
      categoryContainer.appendChild(button);
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function showAnswers(steps) {
  let step1 = steps[1];
  let step2 = steps[2];

  step1.answers.forEach(function (answer) {
    let answerButton = document.createElement("button");
    answerButton.style.backgroundColor = answer;

    answerButton.addEventListener("click", function () {
      let selectedStep1Buttons = document.querySelectorAll(
        ".selected-step1-button" 
      );

      selectedStep1Buttons.forEach(function (button) {
        button.classList.remove("selected-step1-button");
      });

      if (selectedStep1Button) {
        selectedStep1Button.classList.remove("selected-step1-button");
      }
      answerButton.classList.add("selected-step1-button");
      selectedStep1Button = answerButton;

      if (selectedStep2Button) {
        selectedStep2Button.classList.remove("selected-step2-button");
      }

      selectedStep1Button = answerButton;
      selectedStep2Button = null;
      selectedStep1Answer = answer;
      selectedStep2Answer = "";

      nextButton.disabled = false;
    });

    step1AnswersContainer.appendChild(answerButton);
  });

  step2.answers.forEach(function (answer) {
    let answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.style.backgroundColor = answer;

    answerButton.addEventListener("click", function () {
      selectedStep2Answer = answer;

      submitButton.disabled = false;

      if (selectedStep1Button) {
        selectedStep1Button.classList.remove("selected-step2-button");
        selectedStep1Button.classList.remove("selected-step1-button");
      }
      nextButton.disabled = true;
      if (selectedStep2Button) {
        selectedStep2Button.classList.remove("selected-step2-button");
      }
      answerButton.classList.add("selected-step2-button");
      selectedStep1Button = null;
      selectedStep2Button = answerButton;
    });

    step2AnswersContainer.appendChild(answerButton);
  });
}

function showQuestions(steps) {
  let step1 = steps[1];
  let step2 = steps[2];

  let questionTitle1 = document.createElement("h2");
  questionTitle1.textContent = step1.title;
  step1AnswersContainer.appendChild(questionTitle1);

  let questionTitle2 = document.createElement("h2");
  questionTitle2.textContent = step2.title;
  step2AnswersContainer.appendChild(questionTitle2);
}

function showSubTitle(steps) {
  let step1 = steps[1];
  let step2 = steps[2];

  let subTitle1 = document.createElement("p");
  subTitle1.textContent = step1.subtitle;
  step1AnswersContainer.appendChild(subTitle1);

  let subTitle2 = document.createElement("p");
  subTitle2.textContent = step2.subtitle;
  step2AnswersContainer.appendChild(subTitle2);
}

function clearAnswers() {
  step1AnswersContainer.innerHTML = "";
  step2AnswersContainer.innerHTML = "";

  if (selectedStep1Button) {
    selectedStep1Button.classList.remove("selected-step1-button");
  }
  if (selectedStep2Button) {
    selectedStep2Button.classList.remove("selected-step2-button");
  }
}

let productsData = ["products.json"];

function filterProducts(data, category, color, priceRange) {
  return data.filter(function (product) {
    const categoryMatch = product.category.includes(category);
    const colorMatch = product.colors.some(
      (productColor) => productColor.toLowerCase() === color.toLowerCase()
    );
    const priceMatch = comparePriceRange(product.price, priceRange);

    return categoryMatch && colorMatch && priceMatch;
  });
}

function comparePriceRange(price, priceRange) {
  switch (priceRange) {
    case "0-25":
      return price >= 0 && price <= 25;
    case "25-50":
      return price > 25 && price <= 50;
    case "50-100":
      return price > 50 && price <= 100;
    case "100+":
      return price > 100;
    default:
      return true;
  }
}

submitButton.addEventListener("click", function () {
  const questionsContainer = document.querySelector(
    ".questions-container"
  );
  questionsContainer.style.display = "none";
  const loader = document.querySelector(".loader");
  loader.style.display = "block";
  const loaderTimeout = setTimeout(function () {

    fetch(productsData)
      .then((response) => {
        clearTimeout(loaderTimeout); 
        const loader = document.querySelector(".loader");
        loader.style.display = "none"; 

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((productsData) => {
        let filteredProducts = filterProducts(
          productsData,
          selectedCategory,
          selectedStep1Answer,
          selectedStep2Answer
        );

        if (filteredProducts.length === 0) {
          let productNotFound = document.createElement("p");
          productNotFound.textContent = "Product Not Found";
          productCardContainer.appendChild(productNotFound);
        }
        for (i = 0; i < filteredProducts.length; i++) {
          const dotsContainer = document.querySelector(".dots");
          let dotStepper = document.createElement("span");
          dotStepper.setAttribute("id", `dot${i + 1}`);

          dotsContainer.appendChild(dotStepper);
        }

        const productsContainer = document.querySelector(
          ".slideshow-container"
        );
        const mappedProducts = filteredProducts.map((product, index) => {
          const hasOldPrice =
            product.oldPrice !== undefined && product.oldPrice !== null;
          const oldPriceHtml = hasOldPrice
            ? `<div class="product-old-price">${product.oldPrice} ${product.currency}</div>`
            : "";
          return `
    <div class="mySlides fade" key=${index}>
      <div class="numbertext">${index + 1} / ${filteredProducts.length}</div>
      <a href="${product.url}">
        <img src="${product.image}" class="product-img" style="width: 100%" />
        <div class="product-name">${product.name}</div></a>
        ${oldPriceHtml}
        <div class="product-price">${product.price} ${product.currency}</div>
        <a href="${product.url}">
        <div class="product-view"><p class="product-view-text">View Product</p></div>
        
      </a>
    </div>
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>`;
        });
        productsContainer.innerHTML = mappedProducts.join("");

        showSlides(1);
      })
      .catch((error) => {
        console.error(
          "There was a problem with the fetch operation:",
          error
        );
      });
  }, 1000);
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.querySelectorAll(".dots > span");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", ""); 
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active"; 
}