const categoriesContainer = document.getElementById("categories-container");
const plantCardsContainer = document.getElementById("plants-container");

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch data:", error);
    }
};

const loadAllPlants = async () => {
    const data = await fetchData(
        "https://openapi.programming-hero.com/api/plants"
    );
    displayAllPlants(data.plants);
};
loadAllPlants();

const displayAllPlants = (plants) => {
    console.log(plants);
    plants.map(plant => {
        plantCardsContainer.innerHTML += `
        <div class="h-[100%] w-[350px] bg-white px-2 pt-3 rounded-lg shadow-md">
            <div className="h-[100%]">
                <img class="w-[320px] h-[180px] mx-auto object-cover rounded-2xl" loading="lazy" src="${plant.image}" alt="tree1" />
                <p class="pl-1 mt-2 text-sm font-semibold">${plant.name}</p>
                <p class="pl-1 mt-2 text-xs text-justify text-gray-500">${plant.description}</p>
                <div class="flex justify-between items-center px-1 mt-3">
                    <p class="text-xs font-semibold rounded-3xl px-3 py-1 bg-[#DCFCE7] text-[#15803D]">${plant.category}</p>
                    <p class="py-1 px-1">৳<span>${plant.price}</span></p>
                </div>
                <button class="btn btn-block rounded-full bg-[var(--primary)] text-white mt-2 mb-3 ">Add to Cart</button>
            </div>
        </div>
        `;
    })
};

const loadCategories = async () => {
    const data = await fetchData(
        "https://openapi.programming-hero.com/api/categories"
    );
    displayCategories(data.categories);

    categoriesContainer.addEventListener("click", (e) => {
        const allActiveLink = document.querySelectorAll(".active");
        allActiveLink.forEach((li) => {
            li.classList.remove("active", "bg-[var(--primary)]", "text-white");
        });

        if (e.target && e.target.localName === "li") {
            console.log(e.target.innerText);
            e.target.classList.add(
                "active",
                "bg-[var(--primary)]",
                "text-white"
            );
        }
    });
};
loadCategories();

function displayCategories(categories) {
    categories.forEach((category) => {
        categoriesContainer.innerHTML += `
            <li id="category-${category.id}" class="px-2 cursor-pointer rounded-md">${category.category_name}</li>
        `;
    });
}
