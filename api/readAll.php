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

// Fetch all bookmarks
$result = $bookmark->readAll();
$data = $result->fetchAll(PDO::FETCH_ASSOC);

if (!empty($data)) {
    echo json_encode($data);
} else {
    echo json_encode(array('message' => 'No bookmark items were found.'));
}
?>
