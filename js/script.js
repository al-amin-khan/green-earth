const categoriesContainer = document.getElementById("categories-container");

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
