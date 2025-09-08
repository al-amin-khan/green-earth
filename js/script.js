const categoriesContainer = document.getElementById("categories-container");
const plantCardsContainer = document.getElementById("plants-container");

const loadingSpinner = () => `
    <div class="flex w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
    </div>
`;

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
    loadingSpinner();
    plantCardsContainer.innerHTML = loadingSpinner().repeat(6);
    const data = await fetchData(
        "https://openapi.programming-hero.com/api/plants"
    );
    displayAllPlants(data.plants);
};
loadAllPlants();

const displayAllPlants = (plants) => {
    plantCardsContainer.innerHTML = '';

    plants.map(plant => {
        plantCardsContainer.innerHTML += `
        <div class="h-full w-[340px] md:w-[260px] mx-auto bg-white px-2 md:px-2 lg:px-2 pt-3 rounded-lg shadow-md">
            <div class="h-[100%]">
                <img class="w-[280px] h-[150px] mx-auto object-cover rounded-2xl" loading="lazy" src="${plant.image}" alt="${plant.name}" />
                <button onclick="my_modal_${plant.id}.showModal()" class="pl-1 mt-2 text-sm font-semibold cursor-pointer">${plant.name}</button>
                <p class="pl-1 mt-2 text-xs text-justify text-gray-500">${plant.description}</p>
                <div class="flex justify-between items-center px-1 mt-3">
                    <p class="text-xs font-semibold rounded-3xl px-3 py-1 bg-[#DCFCE7] text-[#15803D]">${plant.category}</p>
                    <p class="py-1 px-1">৳<span>${plant.price}</span></p>
                </div>
                <button class="btn btn-block rounded-full bg-[var(--primary)] text-white mt-2 mb-3 ">Add to Cart</button>
            </div>
        </div>

        <dialog id="my_modal_${plant.id}" class="modal">
            
        </dialog>
        `;
        loadShowModalDialog(plant.id);
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
            <li id="category-${category.id}" onclick="loadPlantsByCategory(${category.id})" class="border-2 md:border-0 lg:border-0 lg:bg-none md:bg-none px-2 cursor-pointer rounded-md">${category.category_name}</li>
        `;
    });
}

const loadPlantsByCategory = async (id) => {
    loadingSpinner();
    plantCardsContainer.innerHTML = loadingSpinner().repeat(3);
    const data = await fetchData(`https://openapi.programming-hero.com/api/category/${id}`);
    displayAllPlants(data.plants);
}

// https://openapi.programming-hero.com/api/plant/1
const loadShowModalDialog = async (id) => {
    const data = await fetchData(`https://openapi.programming-hero.com/api/plant/${id}`);
    const plant = data.plants;
    
    const modal = document.getElementById(`my_modal_${id}`);
    modal.innerHTML = `
        <div class="modal-box">
            <div class="text-end -mr-5 -mt-5">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-sm text-sm rounded-full bg-[#15803D]/80 text-white">x</button>
                </form>
            </div>
            <div class="h-[100%] m-0">
                <img class="w-[450px] h-[250px] mx-auto object-cover rounded-2xl" loading="lazy" src="${plant.image}" alt="${plant.name}" />
                <p class="pl-1 mt-2 text-base font-semibold cursor-pointer">${plant.name}</p>
                <p class="pl-1 mt-2 text-sm text-justify text-gray-500">${plant.description}</p>
                <div class="flex justify-between items-center px-1 mt-3">
                    <p class="text-sm font-semibold rounded-3xl px-3 py-1 bg-[#DCFCE7] text-[#15803D]">${plant.category}</p>
                    <p class="text-sm font-semibold rounded-3xl px-3 py-1 bg-[#DCFCE7] text-[#15803D]">Plant ID: ${plant.id}</p>
                    <p class="text-sm font-semibold rounded-3xl px-3 py-1 bg-[#DCFCE7] text-[#15803D]"><span>৳</span>${plant.price}</p>
                </div>
            </div>
            
            </div>
        </div>
    `;
    
}