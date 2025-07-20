document.getElementById("decodeBtn").addEventListener("click", function () {
  const vin = document
    .getElementById("vinInput")
    .ariaValueMax.trim()
    .toUpperCase();

  if (vin.length !== 17) {
    document.getElementById("result").innerText =
      "VIN must be exactly 17 characters.";
    return;
  }

  const url =
    "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const results = data.Results;
      const fields = ["Make", "Model", "Model Year", "Engine Model"];
      let output = "";

      fields.forEach((field) => {
        const match = results.find((item) => item.Variable === field);
        if (match && match.Value) {
          output += "<b>${field}:</b> ${match.Value}<br>";
        }
      });

      document.getElementById("result").innerHTML =
        output || "No vehicle data found.";
    })
    .catch(() => {
      document.getElementById("result").innerText = "Error retrieving data.";
    });
});
