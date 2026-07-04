export function initFilters() {
    document.getElementById('occasion-filter').addEventListener('change', (e) => {
        console.log("Occasion Filter Active:", e.target.value);
        // Yahan listing filter karne ka logic likhein
    });

    document.getElementById('budget-filter').addEventListener('input', (e) => {
        console.log("Budget Limit:", e.target.value);
    });
}