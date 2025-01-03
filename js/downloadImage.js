(function () {
    // Function to download the report as an image
    function downloadReport(elementId, buttonId) {
        const button = document.getElementById(buttonId);
        const element = document.getElementById(elementId);

        if (!button || !element) {
            console.error(`Error: ${elementId} or ${buttonId} element not found.`);
            return;
        }

        // Set up the label of the button
        button.innerText = "Download Report"; // Default text for the button

        // Attach click event to the button
        button.addEventListener("click", function (e) {
            e.preventDefault(); // Prevents the default anchor action

            if (!element) {
                console.error("Error: Report element not found.");
                return;
            }

            // Temporarily show the report card
            element.style.display = "block";

            // Wait for the content to be fully rendered
            html2canvas(element, { useCORS: true, logging: true })
                .then(function (canvas) {
                    var imageData = canvas.toDataURL("image/jpeg");

                    // Create an invisible temporary link to trigger download
                    var tempLink = document.createElement('a');
                    tempLink.href = imageData;
                    tempLink.download = "GemReport.jpg";

                    // Append the link to the body to trigger the download
                    document.body.appendChild(tempLink);
                    tempLink.click();

                    // Remove the temporary link after triggering the download
                    document.body.removeChild(tempLink);

                    // Clear error field if any
                })
                .catch(function (error) {
                    // Handle errors if any
                    console.error("Error capturing screenshot: " + error.message);
                });
        });
    }

    // Expose the function globally so it can be called
    window.downloadReport = downloadReport;
})();
