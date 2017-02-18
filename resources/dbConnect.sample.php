<?php
# Rename this file to dbConnect.php
# Change the mysql details to your servers!
$host = 'localhost';
$username = 'root';
$password = '<MY PASSWORD>';

$connect = new mysqli($host, $username, $password);

if ($connect->connect_error) {
  die('Connection Failed: ' . $connection->connect_error);
}

echo 'Connection Successful.';

?>