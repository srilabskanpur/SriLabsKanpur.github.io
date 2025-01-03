async function fetchAndSetImage(url, imgElementId) {
    if (!url || !imgElementId) {
        console.error("URL and Image Element ID are required.");
        return;
    }

    try {
        const response = await fetch(
            `https://script.google.com/macros/s/AKfycbwY9f0TpPSJBG-nIy9u-WiDt8g8KiW-zW7DDCphHSqil79FrKhMSo0vggvYM5HWmoQRwA/exec?url=${encodeURIComponent(url)}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch the image data.");
        }

        // Get the Base64-encoded data URL
        const dataUrl = await response.text();

        // Log the Blob (Base64 data)
        console.log("Fetched Blob (Base64 Data):", dataUrl);

        // Set the data URL to the specified img element
        const imgElement = document.getElementById(imgElementId);
        if (imgElement) {
            imgElement.src = dataUrl;
            document.getElementById("loadingSpinner").style.display = "none";
            $("#reportCard").show();
        } else {
            console.error(`Image element with ID "${imgElementId}" not found.`);
        }
    } catch (error) {
        console.error("Error fetching the image:", error);
    }
}
