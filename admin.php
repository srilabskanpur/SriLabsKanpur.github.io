<?php
// Database connection
$host = "localhost";
$user = "root";
$password = "";
$dbname = "srilabs";  // Replace with your database name
$conn = mysqli_connect($host, $user, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle Add Gem
if (isset($_POST['addGem'])) {
    // Sanitize and retrieve form data
    $reportNo = mysqli_real_escape_string($conn, $_POST['reportNo']);
    $colour = mysqli_real_escape_string($conn, $_POST['colour']);
    $weight = mysqli_real_escape_string($conn, $_POST['weight']);
    $species = mysqli_real_escape_string($conn, $_POST['species']);
    $shape = mysqli_real_escape_string($conn, $_POST['shape']);

    // Handle the image upload
    $targetDir = "uploads/";  // Directory where the images will be stored
    $imageName = basename($_FILES["gemImage"]["name"]);
    $targetFile = $targetDir . $imageName;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Validate image type (only allow certain formats)
    if (in_array($imageFileType, ["jpg", "jpeg", "png", "gif"])) {
        if (move_uploaded_file($_FILES["gemImage"]["tmp_name"], $targetFile)) {
            // Insert gem data into the database along with image path
            $sql = "INSERT INTO gems (reportNo, colour, weight, species, shape, image) 
                    VALUES ('$reportNo', '$colour', '$weight', '$species', '$shape', '$targetFile')";
            if (mysqli_query($conn, $sql)) {
                echo "Gem added successfully.";
            } else {
                echo "Error: " . mysqli_error($conn);
            }
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    } else {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    }
}

// Handle Delete Gem
if (isset($_GET['delete'])) {
    $gemId = $_GET['delete'];

    // Query to delete gem by ID
    $sql = "DELETE FROM gems WHERE id = $gemId";
    if (mysqli_query($conn, $sql)) {
        echo "Gem deleted successfully.";
    } else {
        echo "Error deleting gem: " . mysqli_error($conn);
    }
}

// Fetch existing gems from the database
$sql = "SELECT * FROM gems";
$result = mysqli_query($conn, $sql);

// Display the gems in a table
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<tr>
                <td>" . $row['reportNo'] . "</td>
                <td>" . $row['colour'] . "</td>
                <td>" . $row['weight'] . "</td>
                <td>" . $row['species'] . "</td>
                <td><img src='" . $row['image'] . "' alt='Gem Image'></td>
                <td><a href='admin.php?delete=" . $row['id'] . "'><button>Delete</button></a></td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='6'>No gems found</td></tr>";
}

mysqli_close($conn);
?>
