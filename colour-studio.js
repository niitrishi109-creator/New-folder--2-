
const shades = [
    // Asian Paints
    { brand: "Asian Paints", name: "Air Breeze", code: "9436", hex: "#DDE9E7" },
    { brand: "Asian Paints", name: "Button Rose", code: "8108", hex: "#DDA7B2" },
    { brand: "Asian Paints", name: "Soft Breeze", code: "8116", hex: "#E7DCD6" },
    { brand: "Asian Paints", name: "Zinnia Bloom", code: "8716", hex: "#D9A3B4" },
    { brand: "Asian Paints", name: "Essence", code: "8099", hex: "#E8D5C5" },
    { brand: "Asian Paints", name: "Pink Mist", code: "8092", hex: "#E9C8D0" },
    { brand: "Asian Paints", name: "Angel Harp", code: "8124", hex: "#E6DDD1" },
    { brand: "Asian Paints", name: "Lucid Dream", code: "5182", hex: "#C7D7E1" },
    { brand: "Asian Paints", name: "Winged Angel", code: "8100", hex: "#F1E8DD" },
    { brand: "Asian Paints", name: "Touch of Fuchsia", code: "8140", hex: "#C95D91" },
    { brand: "Asian Paints", name: "Day Lily", code: "8060", hex: "#E5D5B5" },
    { brand: "Asian Paints", name: "Tinge of Rose", code: "8084", hex: "#E2BFC3" },
    { brand: "Asian Paints", name: "Soft Chenille", code: "8036", hex: "#D8C8B9" },
    { brand: "Asian Paints", name: "Zen", code: "8676", hex: "#B8C5B4" },
    { brand: "Asian Paints", name: "White Clay", code: "8620", hex: "#E7E1D7" },
    { brand: "Asian Paints", name: "Lilac Frost", code: "7148", hex: "#D8D0E6" },
    { brand: "Asian Paints", name: "Twilight Sky", code: "8204", hex: "#8997B5" },
    { brand: "Asian Paints", name: "Willow Creek", code: "8068", hex: "#AABBA6" },
    { brand: "Asian Paints", name: "Gossamer", code: "8052", hex: "#E2DDD5" },
    { brand: "Asian Paints", name: "Blush", code: "L139", hex: "#E8C1C8" },
    { brand: "Asian Paints", name: "Summer Blush-N", code: "0945", hex: "#E6B9BB" },

    // Berger Paints
    { brand: "Berger Paints", name: "Pink Possum", code: "1P2816", hex: "#DCA8B6" },
    { brand: "Berger Paints", name: "Sweet Shop", code: "6P0173", hex: "#E5B9C7" },
    { brand: "Berger Paints", name: "Shrimp Tint", code: "1D0322", hex: "#E8B5A5" },
    { brand: "Berger Paints", name: "Royal Dignity", code: "6D2358", hex: "#B6A0BD" },
    { brand: "Berger Paints", name: "Elemint", code: "4P0093", hex: "#C9D8C9" },
    { brand: "Berger Paints", name: "Gold Coast", code: "2D0710", hex: "#D6C49B" },
    { brand: "Berger Paints", name: "Spring Bliss", code: "7T1475", hex: "#DCE6B6" },

    // Kansai Nerolac
    { brand: "Kansai Nerolac", name: "Foam White", code: "W-161", hex: "#F1EEE6" },
    { brand: "Kansai Nerolac", name: "Concrete Step", code: "W-192", hex: "#C8C7C2" },
    { brand: "Kansai Nerolac", name: "White Berries", code: "W-160", hex: "#F4EEE5" },
    { brand: "Kansai Nerolac", name: "Magical White", code: "W-159", hex: "#F2F0E9" },
    { brand: "Kansai Nerolac", name: "Brinkley White", code: "W-158", hex: "#E9E5DC" },

    // Dulux
    { brand: "Dulux", name: "Almond White I", code: "5309", hex: "#E7DCC7" },
    { brand: "Dulux", name: "Buttercup Fool 6", code: "I 5361", hex: "#E9D995" },
    { brand: "Dulux", name: "Barley Beige", code: "30YY 68/024", hex: "#D9C9AC" },
    { brand: "Dulux", name: "Light Biscuit", code: "5473", hex: "#E8D5B9" },
    { brand: "Dulux", name: "Ivory", code: "5447", hex: "#E8DFC6" },
    { brand: "Dulux", name: "Sweet Embrace", code: "70RR 64/034", hex: "#D8B8C4" },
    { brand: "Dulux", name: "Coastal Beige", code: "90YR 51/109", hex: "#CBB49B" },
    { brand: "Dulux", name: "Wool White", code: "57YY 72/138", hex: "#EAE5D8" },
    { brand: "Dulux", name: "Mesmerize", code: "70BB 49/082", hex: "#9BAFCB" },
    { brand: "Dulux", name: "Blue Moment", code: "04BB 34/244", hex: "#667FAD" },
    { brand: "Dulux", name: "Terracotta Pot", code: "26YR 18/404", hex: "#A95E48" },
    { brand: "Dulux", name: "True Joy", code: "40YY 49/546", hex: "#D6B94B" },
    { brand: "Dulux", name: "Green Seeweed", code: "53YY 26/275", hex: "#777C4C" },
    { brand: "Dulux", name: "Nourish Grey", code: "66BB 06/077", hex: "#8B9298" }
];

const brandSelect = document.getElementById("brandSelect");
const shadeSearch = document.getElementById("shadeSearch");
const shadeGrid = document.getElementById("shadeGrid");
const shadeCount = document.getElementById("shadeCount");
const noResults = document.getElementById("noResults");
const whatsappEnquiry = document.getElementById("whatsappEnquiry");
const selectedShadePanel = document.getElementById("selectedShadePanel");
const selectedShadeName = document.getElementById("selectedShadeName");
const selectedShadeDetails = document.getElementById("selectedShadeDetails");
const clearSelection = document.getElementById("clearSelection");

let selectedShade = null;

function renderShades() {
    const selectedBrand = brandSelect.value;
    const searchTerm = shadeSearch.value.trim().toLowerCase();

    const filteredShades = shades.filter(shade => {
        const matchesBrand =
            selectedBrand === "all" || shade.brand === selectedBrand;

        const searchableText =
            `${shade.name} ${shade.code} ${shade.brand}`.toLowerCase();

        return matchesBrand && searchableText.includes(searchTerm);
    });

    shadeCount.textContent =
        `Is collection mein ${filteredShades.length} shades dikh rahe hain. Total loaded entries: ${shades.length}.`;

    shadeGrid.replaceChildren();
    noResults.hidden = filteredShades.length !== 0;

    filteredShades.forEach(shade => {
        const card = document.createElement("article");
        card.className = "shade-card";

        const swatch = document.createElement("div");
        swatch.className = "shade-swatch";
        swatch.style.backgroundColor = shade.hex;
        swatch.title = "Approximate screen preview";
        swatch.setAttribute("aria-label", `Approximate colour preview for ${shade.name}`);

        const info = document.createElement("div");
        info.className = "shade-info";

        const brand = document.createElement("div");
        brand.className = "shade-brand";
        brand.textContent = shade.brand;

        const name = document.createElement("h3");
        name.textContent = shade.name;

        const code = document.createElement("p");
        code.className = "shade-code";
        code.textContent = `Shade code: ${shade.code}`;

        const actions = document.createElement("div");
        actions.className = "shade-actions";

        const selectButton = document.createElement("button");
        selectButton.type = "button";
        selectButton.textContent =
            selectedShade === shade ? "Selected ✓" : "Select Colour";

        selectButton.addEventListener("click", () => {
            selectedShade = shade;
            updateSelectedShade();
            updateWhatsApp();
            renderShades();

            document.querySelector(".colour-enquiry").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });

        const copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.textContent = "Copy Code";

        copyButton.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(shade.code);
                copyButton.textContent = "Copied!";
            } catch {
                window.prompt("Shade code copy karein:", shade.code);
            }

            setTimeout(() => {
                copyButton.textContent = "Copy Code";
            }, 1500);
        });

        actions.append(selectButton, copyButton);
        info.append(brand, name, code, actions);
        card.append(swatch, info);
        shadeGrid.appendChild(card);
    });
}

function updateSelectedShade() {
    if (!selectedShade) {
        selectedShadePanel.hidden = true;
        return;
    }

    selectedShadePanel.hidden = false;
    selectedShadeName.textContent = selectedShade.name;
    selectedShadeDetails.textContent =
        `${selectedShade.brand} · Shade Code: ${selectedShade.code}`;
}

function updateWhatsApp() {
    const phoneNumber = "919560165748";

    const shadeDetails = selectedShade
        ? `Namaste Daksha Paints!\nMujhe ye shade pasand aaya:\nBrand: ${selectedShade.brand}\nColour: ${selectedShade.name}\nShade Code: ${selectedShade.code}\n\nIs colour mein painting ka quotation chahiye.`
        : "Namaste Daksha Paints! Mujhe ghar ki painting aur colour selection ke liye quotation chahiye.";

    whatsappEnquiry.href =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(shadeDetails)}`;
}

brandSelect.addEventListener("change", renderShades);
shadeSearch.addEventListener("input", renderShades);

clearSelection.addEventListener("click", () => {
    selectedShade = null;
    updateSelectedShade();
    updateWhatsApp();
    renderShades();
});

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

updateSelectedShade();
updateWhatsApp();
renderShades();
