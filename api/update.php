<?php
// Check Request Method
if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
    header('Allow: PUT');
    http_response_code(405);
    echo json_encode('Method Not Allowed');
    return;
}

// Response Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');

include_once '../db/Database.php';
include_once '../models/bookmark.php';

// Instantiate a Database object & connect
$database = new Database();
$dbConnection = $database->connect();

// Instantiate Bookmark object
$bookmark = new bookmark($dbConnection);

// Get the HTTP PUT request JSON body
$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->id) || !isset($data->URL) || !isset($data->title)) {
    http_response_code(422);
    echo json_encode(['message' => 'Error: Missing required parameters id, URL, or title in the JSON body.']);
    return;
}

$bookmark->setId($data->id);
$bookmark->setURL($data->URL);
$bookmark->setTitle($data->title);

// Update the Bookmark
if ($bookmark->update()) {
    echo json_encode(['message' => 'Bookmark updated successfully.']);
} else {
    echo json_encode(['message' => 'Error: Failed to update bookmark.']);
}
