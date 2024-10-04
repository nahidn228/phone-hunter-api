const loadAllPhones = async (isShowAll, brandName) => {
  document.getElementById("progress").classList.add("hidden");

  // fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
  //   .then((res) => res.json())
  //   .then((data) => showAllPhones(data.data));

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      brandName ? brandName : "iphone"
    }`
  );
  const data = await res.json();

  if (isShowAll) {
    document.getElementById("phone-card").innerHTML = "";
    showAllPhones(data.data);
  } else {
    showAllPhones(data.data.slice(0, 6));
  }
};

const showAllPhones = (phones) => {
  phones.forEach((phone) => {
    console.log(phone);

    const { brand, image, phone_name, slug } = phone;

    const phoneCard = document.getElementById("phone-card");
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-xl">
          <figure class="px-10 pt-10 w-full">
            <img src='${image}' alt="Shoes" class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">${phone_name}</h2>
            <p class="text-xs md:text-sm text-gray-500">
            ${slug}
            </p>
            <p class="font-bold">$999</p>
            <div class="card-actions">
              <button onclick="phoneDetails('${slug}')" class="btn bg-[#0D6EFD] text-white">Show Details</button>
            </div>
          </div>
        </div>

        
        
    `;
    phoneCard.appendChild(div);
  });
};

const handleShowAll = () => {
  loadAllPhones(true);
};

const phoneDetails = async (slug) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await res.json();
  console.log(data.data);
  const { image, brand, name, mainFeatures, Bluetooth, releaseDate, others } =
    data.data;
  const { chipSet, displaySize, memory, storage } = mainFeatures;

  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
   <dialog id="modal_2" class="modal">
          <div class="modal-box ">
            <img
              class="min-w-fit"
              src='${image}'
              alt=""
            />
            <h3 class="text-lg font-bold py-4">'${name}'</h3>
            <p class=" text-sm text-gray-500">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            <p class="text-gray-500"> <span class="text-black font-semibold text-sm">Storage :  </span> '${storage}' </p>
            <p class="text-gray-500"> <span class="text-black font-semibold text-sm">Display Size : </span> '${displaySize}' </p>
            <p class="text-gray-500"> <span class="text-black font-semibold text-sm">Chipset : </span> '${chipSet}' </p>
            <p class="text-gray-500"> <span class="text-black font-semibold text-sm">Memory : </span> '${memory}' </p>
            <p class="text-gray-500"> <span class="text-black font-semibold text-sm">Release Date :</span>  '${releaseDate}' </p>
            <p class="text-gray-500"> <span class="text-black font-semibold text-sm">Brand : </span> '${brand}' </p>
            <p class="text-gray-500"> <span class="text-black font-semibold text-sm">GPS : </span> '${others.GPS}' </p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

  `;

  // brand: "Apple"
  // image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg"
  // mainFeatures: {storage: '128GB/256GB/1TB storage, no card slot', displaySize: '6.1 inches, 90.2 cm2 (~86.0% screen-to-body ratio)', chipSet: 'Apple A15 Bionic (5 nm)', memory: '128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM, 1TB 6GB RAM', sensors: Array(6)}
  // name: "iPhone 13 Pro"
  // others: {WLAN: 'Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot', Bluetooth: '5.0, A2DP, LE',
  //   GPS: 'Yes, with A-GPS, GLONASS, GALILEO, BDS, QZSS', NFC: 'Yes', Radio: 'No', …}
  // releaseDate:""
  // slug: "apple_iphone_13_pro-11102"

  modal_2.showModal();
};

const handleSearchButton = () => {
  document.getElementById("progress").classList.remove("hidden");
  document.getElementById("phone-card").innerHTML = "";
  const searchText = document.getElementById("search-box").value;
  setTimeout(() => {
    loadAllPhones(false, searchText);
  }, 3000);
  document.getElementById("search-box").value = "";
};

loadAllPhones(false, "iphone");
