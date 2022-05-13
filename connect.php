<?php 
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $favtm = $_POST['favtm'];
    
    $conn = new mysqli('localhost', 'root', "reallyStrongPwd123", "CFFLDB");
    if($conn -> connect_error) {
        die('Connection Failed' : '.$conn-> connect_error');
    } else {
        $stmt = $conn-> prepare("INSERT INTO Users (`firstName`, `lastName`, `gender`, `email`, `password`, `fav`) 
        VALUES (?,?,?,?,?,?)");
        $stmt -> bind_param("ssssss", $firstName, $lastName, $gender, $email, $password, $favtm);
        $stmt -> execute();
        echo "registration Sucessfully...";
        $stmt -> close();
        $conn -> close();
    }
?>