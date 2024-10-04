const loadAllPhones = async () => {
  document.getElementById("progress").classList.add("hidden");
  console.log("3 second gone");

  // fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
  //   .then((res) => res.json())
  //   .then((data) => showAllPhones(data.data));

  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  showAllPhones(data.data.slice(0, 6));
};

const showAllPhones = (phones) => {
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.getElementById("phone-card");
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-xl">
          <figure class="px-10 pt-10">
            <img src='${phone.image}' alt="Shoes" class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p class="text-sm text-gray-500">
            ${phone.slug}
            </p>
            <p class="font-bold">$999</p>
            <div class="card-actions">
              <button class="btn bg-[#0D6EFD] text-white">Show Details</button>
            </div>
          </div>
        </div>
    `;
    phoneCard.appendChild(div);
  });
};

const handleSearchButton = () => {
  document.getElementById("progress").classList.remove("hidden");
  setTimeout(() => {
    loadAllPhones();
  }, 3000);
};

loadAllPhones();
