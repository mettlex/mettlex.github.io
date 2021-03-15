const loadFallbackImage = (event) => {
  event.preventDefault();
  event.target.src =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wAARCABkAGQDAREAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAwQCBQABBgcI/8QAJBAAAgEEAgEFAQEAAAAAAAAAAAECAwQRITFRBRITFEFhFSL/xAAaAQACAwEBAAAAAAAAAAAAAAAAAwECBAUG/8QAGxEBAAMBAQEBAAAAAAAAAAAAAAECAxESEyH/2gAMAwEAAhEDEQA/APs6NddnSUS95dkBnvr8IDTuF2TAQ99Aog7hdkhB112ETwAzqrey3UcLVKmc7D0OEqs+S0XRMEKz5G1sTaOK6uuR1ZJtBGS2xsSW7aN+uzlOn1L567IT1F+QXZHR0N+SXYdR0N+SXYdQ1/RXZMSGv6Cf2T1DHe5+w6kN3WfsrNhEdAlXz9kRZPAJzzkdSxVoJ1d5NNZImCcuWNiSjMb99nL66CX9B45IAcr99gAZX77ABvyD7AMjft/YAWF6+wA0btv7ImQIrh9i5svWE1WKxZbjHPJopYq0A1JcmvOWa0FpYyx0SVwllr7OfMNzPU+yoabYANpgA3FgEoxYAxTiwBiCZSQNHONibSbWE1LAv0Zxv1jqWKvCEpm3OzNeAXJZNMEcCdLkyNcNKlkpKU40SBxP4/4WgNO2JQ1G3w+AA0KJRI0aWClpTEMcMGa8n1gKUvShHTIqBKslnYzOylqhOut7N+dmW9Q/fXZrrb8Z+HcCJlpiE4xFTYyKiwgivpPlPCwWiyk1RlhIn0jyE5IpN1oolCaKTdeKDxawUm60URm9Mz3sbWiuuKnpyZpudFFZWufTnZal1bUKSvMfZuy0Zb0Q+b+muNPxn8OnjyRex1KjQWTPNj60FXAv2t4QlLAfRWaF51OQnRHzLSrb5FW1Mrm3CtsVOpsZHKVTRX6rfJKpP/LFW0XrmqLyfJmtobGahuazTewroJzVlS5azs2Z6s9si7u3l7NUa/hHyemU9mm1lKUN04ZRmtLTWqbp6FTK8QWqrGRc3T4I1XjIudExmUlLLE21Nrm3TexM6nRmdotkfRPzFm/8lZ0TFFTd7TETcyKcUF1F7CthNFXVpvZqzuRahb2pdGuLfhPiHpNtcqT5Nn06RFOLa3qJojvVog08NFLQtBGusZEWgyFXWe2Z7GRBYRbptYTpxyKnpsHqS0ERI/E5rRExIiVZdLkpMLQprinlsKwCnxvU+DVnBF5TVhlcG2tfwjqdn5RZWxNNemWz46Ox8ipJbNlLdZ7RxcU7pSiNK6FWqZTF2r1aLK6tvJntmbW5fAqczIuPSWCnyX+huDwg+SPbJy0ROSYurrh8i5yWjRWVFlsmuQnRujTyzVnmTa6wp26ceDXWn4zzZ5fZ+SeVs4WN3Z0o6jxvkW8bOpjLnaRx1NndOUVs3V/WOVgpOSL+FfQU4ZFzRMWDVL8KfNaLiQhjIfKFvYqykw+Q9hTk8Mr8hFydZN5KzktGhN03kIyT9BqFLY2tC5ss6UP8DooX6fP1ncv1cnlMZem1h13h6rlg6+Dl6w7rxacoo6Obn3dFQoNo0RBMj/EfQcDPifhHkda+K19B5HUXbvonzCehStn0R5HoCVq39EeITFkPhPoPEJ9C07P0vgtFeI9G4W+Ikq9fMdg25I8bi9bq7rwaTcTr4OVq9H8PCPpidPNz7uttaUfStGgiTsaMMcE8VZ7MOiYgIujDoniUHQhvQQgKVGG9E8Sh7MOgDSowzwCGezBfQJZ6EUmE8f/Z";
};

const applyMarkup = (imageURLs = [], width = 100, height = 100) => {
  const galleryEl = document.getElementById("gallery");

  const markup = imageURLs.reduce(
    (acc, url) =>
      acc +
      `<a href="${url}" target=_blank><img style="width: ${width}px; height: ${height}px;" src="${
        "https://media.discordapp.net/" +
        url.replace(/.+\.com\//gi, "") +
        `?width=${width}&height=${height}`
      }" loading=lazy onerror="loadFallbackImage(event)"/></a>`,
    "",
  );

  galleryEl.innerHTML = markup;

  lightGallery(galleryEl, {
    thumbnail: true,
  });
};

const main = () => {
  const galleryURL = new URLSearchParams(location.search).get("g");
  const form = document.getElementById("form");
  const inputField = form.querySelector('input[name="url"]');
  const btn = form.querySelector("button");
  const zoomInBtn = document.getElementById("zoom-in");
  const zoomOutBtn = document.getElementById("zoom-out");

  let imageURLs = [];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementById(
      "gallery",
    ).innerHTML = `<img class="loading-img" src="./img/loading.gif" alt="loading..." />`;

    btn.disabled = true;

    const url = form.elements[0].value;

    const data = await fetch(url, {
      method: "GET",
    })
      .then((r) => r.text())
      .catch((e) => {
        console.error(e);
        return null;
      });

    if (!data) {
      alert("Unable to get photo links. Please enter a correct URL.");
      return;
    }

    try {
      imageURLs = data.split("\n").filter((x) => x);

      applyMarkup(imageURLs);
    } catch (error) {
      alert("Unable to get parse for links. Please enter a correct URL.");
      console.error(error);
    }

    btn.disabled = false;

    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("g", url);

    const newRelativePathQuery =
      window.location.pathname + "?" + searchParams.toString();

    history.pushState(null, "", newRelativePathQuery);

    document.querySelector(".controls").style.display = "flex";
  });

  inputField.addEventListener("focus", () => {
    inputField.select();
  });

  if (galleryURL) {
    inputField.value = galleryURL;
  }

  let defaultThumnailWidth = 100;
  let defaultThumnailHeight = 100;
  let zoomLevel = 1;

  zoomInBtn.addEventListener("click", (event) => {
    event.preventDefault();
    zoomLevel++;
    const currentThumnailWidth = defaultThumnailWidth * zoomLevel;
    const currentThumnailHeight = defaultThumnailHeight * zoomLevel;
    applyMarkup(imageURLs, currentThumnailWidth, currentThumnailHeight);
  });

  zoomOutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (zoomLevel === 1) {
      return;
    }
    zoomLevel--;
    const currentThumnailWidth = defaultThumnailWidth * zoomLevel;
    const currentThumnailHeight = defaultThumnailHeight * zoomLevel;
    applyMarkup(imageURLs, currentThumnailWidth, currentThumnailHeight);
  });
};

main();
