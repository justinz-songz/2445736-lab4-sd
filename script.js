document.getElementById("countryForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const inputData = document.getElementById("countryName").value;
    try {
        const response = await fetch("https://restcountries.com/v3.1/name/" + inputData);
        const result = await response.json();
        const countryInfo = result[0];
        const capital = countryInfo.capital.join(", ");
        const population = countryInfo.population;
        const region = countryInfo.region;
        const flag = countryInfo.flags.png;
        document.getElementById("dispContInfo").innerHTML = `
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Flag:</strong> <img src="${flag}" alt="Flag of ${countryInfo.name.common}"></p>
        `;
        
        // Display bordering countries flags
        const borders = countryInfo.borders;
        if (borders && borders.length > 0) {
            const borderFlags = [];
            for (let i = 0; i < borders.length; i++) {
                const res = await fetch("https://restcountries.com/v3.1/alpha/" + borders[i]);
                const borderCountry = await res.json();
                const flagForCountry = borderCountry[0].flags.png;
                borderFlags.push(`<img src="${flagForCountry}" alt="Flag of ${borderCountry[0].name.common}" style="width: 50px; height: 30px; margin: 5px;">`);
            }
            document.getElementById("borderConts").innerHTML = borderFlags.join(" ");
        } else {
            document.getElementById("borderConts").innerHTML = "No bordering countries";
        }
    } catch (error) {
        document.getElementById("dispContInfo").innerHTML = "An error occurred: " + error.message;
    }
});