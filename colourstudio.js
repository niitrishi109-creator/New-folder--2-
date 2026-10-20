
/* ==========================================
   DAKSHA PAINTS - COLOUR STUDIO
   2000+ Generated Colour Shades
========================================== */

"use strict";

const $ = (id) => document.getElementById(id);

const grid = $("colour-grid");
const searchInput = $("colour-search");
const filters = $("colour-filters");
const countLabel = $("colour-count");
const emptyState = $("empty-state");
const selectedPreview = $("selected-preview");
const selectedName = $("selected-name");
const selectedHex = $("selected-hex");
const copyButton = $("copy-code");
const copyMessage = $("copy-message");
const customColour = $("custom-colour");

const TOTAL_SHADES = 2400;

const palettes = [
    {
        category: "White",
        names: ["Snow White", "Pearl White", "Ivory White", "Cloud White",
            "Cotton White", "Almond White", "Milk White", "Arctic White",
            "Pure White", "Linen White", "Chalk White", "Frost White"]
    },
    {
        category: "Cream",
        names: ["Soft Cream", "Vanilla Cream", "Warm Cream", "Butter Cream",
            "Champagne Cream", "Almond Cream", "Honey Cream", "Silk Cream",
            "Biscuit Cream", "Ivory Cream", "Custard Cream", "Lemon Cream"]
    },
    {
        category: "Pink",
        names: ["Baby Pink", "Rose Pink", "Blush Pink", "Dusty Pink",
            "Coral Pink", "Peach Pink", "Candy Pink", "Flamingo Pink",
            "Pastel Pink", "Mauve Pink", "Bubblegum Pink", "Vintage Pink"]
    },
    {
        category: "Red",
        names: ["Cherry Red", "Ruby Red", "Rose Red", "Brick Red",
            "Wine Red", "Scarlet Red", "Crimson Red", "Tomato Red",
            "Burgundy Red", "Berry Red", "Velvet Red", "Rust Red"]
    },
    {
        category: "Orange",
        names: ["Peach Orange", "Sunset Orange", "Coral Orange",
            "Apricot Orange", "Burnt Orange", "Tangerine Orange",
            "Terracotta Orange", "Amber Orange", "Copper Orange",
            "Pumpkin Orange", "Soft Orange", "Honey Orange"]
    },
    {
        category: "Yellow",
        names: ["Lemon Yellow", "Butter Yellow", "Golden Yellow",
            "Mustard Yellow", "Sunshine Yellow", "Canary Yellow",
            "Pale Yellow", "Honey Yellow", "Saffron Yellow",
            "Vanilla Yellow", "Sand Yellow", "Daisy Yellow"]
    },
    {
        category: "Green",
        names: ["Mint Green", "Sage Green", "Olive Green", "Forest Green",
            "Pistachio Green", "Emerald Green", "Sea Green", "Moss Green",
            "Lime Green", "Jade Green", "Fern Green", "Meadow Green"]
    },
    {
        category: "Blue",
        names: ["Sky Blue", "Ocean Blue", "Navy Blue", "Royal Blue",
            "Powder Blue", "Ice Blue", "Teal Blue", "Denim Blue",
            "Steel Blue", "Baby Blue", "Sapphire Blue", "Midnight Blue"]
    },
    {
        category: "Purple",
        names: ["Lavender Purple", "Lilac Purple", "Violet Purple",
            "Plum Purple", "Mauve Purple", "Orchid Purple",
            "Amethyst Purple", "Pastel Purple", "Royal Purple",
            "Grape Purple", "Heather Purple", "Iris Purple"]
    },
    {
        category: "Brown",
        names: ["Chocolate Brown", "Coffee Brown", "Walnut Brown",
            "Caramel Brown", "Mocha Brown", "Cocoa Brown",
            "Chestnut Brown", "Cinnamon Brown", "Hazelnut Brown",
            "Sand Brown", "Earth Brown", "Espresso Brown"]
    },
    {
        category: "Grey",
        names: ["Pearl Grey", "Silver Grey", "Ash Grey", "Smoke Grey",
            "Slate Grey", "Charcoal Grey", "Cloud Grey", "Stone Grey",
            "Dove Grey", "Steel Grey", "Graphite Grey", "Mist Grey"]
    },
    {
        category: "Black",
        names: ["Jet Black", "Soft Black", "Charcoal Black",
            "Midnight Black", "Onyx Black", "Ink Black",
            "Raven Black", "Ebony Black", "Coal Black",
            "Matte Black", "Shadow Black", "Obsidian Black"]
    }
];

// Base colours used to create related shades.
const bases = {
    White:  [245, 245, 240],
    Cream:  [245, 225, 190],
    Pink:   [225, 145, 175],
    Red:    [190, 45, 60],
    Orange: [235, 125, 45],
    Yellow: [240, 205, 65],
    Green:  [65, 145, 95],
    Blue:   [55, 110, 190],
    Purple: [135, 85, 170],
    Brown:  [125, 80, 50],
    Grey:   [130, 135, 145],
    Black:  [35, 38, 45]
};

const variations = [
    "Light", "Soft", "Pale", "Pastel", "Fresh", "Warm",
    "Cool", "Classic", "Rich", "Deep", "Muted", "Bright",
    "Elegant", "Modern", "Natural", "Gentle", "Vintage",
    "Premium", "Silky", "Smooth", "Misty", "Dreamy",
    "Bold", "Velvet", "Royal", "Calm", "Luxury",
    "Subtle", "Dark", "Golden"
];

const colours = [];

function clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}

function toHex(value) {
    return clamp(value).toString(16).padStart(2, "0").toUpperCase();
}

function rgbToHex(rgb) {
    return "#" + rgb.map(toHex).join("");
}

function createColour(category, index) {
    const palette = palettes.find(item => item.category === category);
    const names = palette.names;
    const base = bases[category];

    const baseName = names[index % names.length];
    const variation = variations[
        Math.floor(index / names.length) % variations.length
    ];

    const cycle = Math.floor(index / (names.length * variations.length));
    const hueShift = ((cycle * 17 + index * 7) % 35) - 17;
    const lightness = ((index * 13 + cycle * 19) % 65) - 30;
    const saturation = 0.78 + ((index * 11) % 23) / 100;

    const rgb = base.map((value, channel) => {
        let adjusted = value + hueShift * (channel === 1 ? 0.65 : 0.4);

        if (lightness > 0) {
            adjusted += (255 - adjusted) * (lightness / 100);
        } else {
            adjusted *= (100 + lightness) / 100;
        }

        adjusted = base.reduce((unused, baseValue, i) => {
            return unused + (i === channel ? adjusted : baseValue);
        }, 0) / 3;

        return adjusted * saturation +
            (1 - saturation) * (lightness > 0 ? 245 : 35);
    });

    // Mix each generated shade with a deterministic channel variation.
    const finalRgb = rgb.map((value, channel) => {
        return clamp(value + (((index * (channel + 3)) % 31) - 15));
    });

    return {
        id: category + "-" + index,
        category,
        name: variation + " " + baseName + " " + (cycle + 1),
        hex: rgbToHex(finalRgb),
        rgb: finalRgb
    };
}

function generateColours() {
    const categories = palettes.map(item => item.category);
    const perCategory = Math.floor(TOTAL_SHADES / categories.length);
    let remaining = TOTAL_SHADES;

    categories.forEach((category, categoryIndex) => {
        const amount = categoryIndex === categories.length - 1
            ? remaining
            : perCategory;

        for (let i = 0; i < amount; i++) {
            colours.push(createColour(category, i));
        }

        remaining -= amount;
    });
}

let activeCategory = "All";
let selectedColour = null;
let visibleColours = [];
let renderVersion = 0;

function selectColour(colour) {
    selectedColour = colour;

    selectedPreview.style.backgroundColor = colour.hex;
    selectedName.textContent = colour.name;
    selectedHex.textContent = colour.hex;
    customColour.value = colour.hex;

    copyMessage.textContent =
        "Category: " + colour.category + " | RGB: " + colour.rgb.join(", ");

    document.querySelectorAll(".colour-card.selected").forEach(card => {
        card.classList.remove("selected");
    });

    const selectedCard = document.querySelector(
        '[data-colour-id="' + colour.id + '"]'
    );

    if (selectedCard) {
        selectedCard.classList.add("selected");
    }
}

function makeCard(colour) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "colour-card";
    card.dataset.colourId = colour.id;
    card.setAttribute("aria-label", colour.name + ", " + colour.hex);

    const swatch = document.createElement("span");
    swatch.className = "colour-swatch";
    swatch.style.backgroundColor = colour.hex;

    const info = document.createElement("span");
    info.className = "colour-card-info";

    const name = document.createElement("strong");
    name.textContent = colour.name;

    const code = document.createElement("small");
    code.textContent = colour.hex;

    info.append(name, code);
    card.append(swatch, info);

    card.addEventListener("click", () => selectColour(colour));

    if (selectedColour && selectedColour.id === colour.id) {
        card.classList.add("selected");
    }

    return card;
}

function renderColours() {
    const version = ++renderVersion;
    const query = searchInput.value.trim().toLowerCase();

    visibleColours = colours.filter(colour => {
        const matchesCategory =
            activeCategory === "All" ||
            colour.category === activeCategory;

        const matchesSearch =
            colour.name.toLowerCase().includes(query) ||
            colour.hex.toLowerCase().includes(query) ||
            colour.category.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    countLabel.textContent =
        visibleColours.length.toLocaleString("en-IN") + " Shades";

    emptyState.hidden = visibleColours.length > 0;
    grid.replaceChildren();

    // Render in batches to keep large catalogues responsive.
    const batchSize = 120;
    let position = 0;

    function renderBatch() {
        if (version !== renderVersion) return;

        const fragment = document.createDocumentFragment();
        const end = Math.min(position + batchSize, visibleColours.length);

        for (; position < end; position++) {
            fragment.appendChild(makeCard(visibleColours[position]));
        }

        grid.appendChild(fragment);

        if (position < visibleColours.length) {
            requestAnimationFrame(renderBatch);
        }
    }

    requestAnimationFrame(renderBatch);
}

filters.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");

    if (!button) return;

    activeCategory = button.dataset.filter;

    filters.querySelectorAll(".filter-btn").forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
    });

    renderColours();
});

searchInput.addEventListener("input", renderColours);

copyButton.addEventListener("click", async () => {
    if (!selectedColour) return;

    try {
        await navigator.clipboard.writeText(selectedColour.hex);
        copyMessage.textContent = "✅ " + selectedColour.hex + " copy ho gaya!";
    } catch {
        copyMessage.textContent =
            "Clipboard access nahi mila. Code select karke copy karo: " +
            selectedColour.hex;
    }
});

customColour.addEventListener("input", () => {
    const hex = customColour.value.toUpperCase();

    selectedPreview.style.backgroundColor = hex;
    selectedName.textContent = "Custom Colour";
    selectedHex.textContent = hex;

    selectedColour = {
        id: "custom",
        category: "Custom",
        name: "Custom Colour",
        hex,
        rgb: [
            parseInt(hex.slice(1, 3), 16),
            parseInt(hex.slice(3, 5), 16),
            parseInt(hex.slice(5, 7), 16)
        ]
    };

    copyMessage.textContent = "Tumhara custom colour select ho gaya.";
});

generateColours();

// Make the first shade available in the detail panel.
selectColour(colours[0]);

// Initial display.
renderColours();

console.log("Daksha Colour Studio ready:", colours.length, "generated shades.");
