<?php
// Check Request Method
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo json_encode('Method Not Allowed');
    return;
}

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

include_once '../db/Database.php';
include_once '../models/bookmark.php';

// Instantiate a Database object & connect
$database = new Database();
$dbConnection = $database->connect();

// Instantiate Bookmark object
$bookmark = new bookmark($dbConnection);

// Check for the `id` parameter in the GET request
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    http_response_code(422);
    echo json_encode(array('message' => 'Error: Missing or invalid required query parameter id.'));
    return;
}

$bookmark->setId($_GET['id']);

// Fetch the bookmark by ID
$result = $bookmark->readOne();
if ($result) {
    echo json_encode($result);
} else {
    http_response_code(404);
    echo json_encode(array('message' => 'Error: No bookmark found with the given id.'));
}
?>
