// Step 1: Hardcoded property data
const properties = [
    {
      id: 1,
      title: "Laie 3-Bedroom Apartment",
      price: "$1200/month",
      description: "Close to BYUH campus. Utilities included.",
      location: "Laie, HI"
    },
    {
      id: 2,
      title: "Hauula Studio Apartment",
      price: "$800/month",
      description: "Private studio 10 mins from campus.",
      location: "Hauula, HI"
    }
  ];
  
  // Step 2: Display properties as cards
  const listContainer = document.getElementById("property-list");
  
  properties.forEach(property => {
    const card = document.createElement("div");
    card.className = "property-card";
  
    card.innerHTML = `
      <h3>${property.title}</h3>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Description:</strong> ${property.description}</p>
      <p><strong>Location:</strong> ${property.location}</p>
    `;
  
    listContainer.appendChild(card);
  });
  