
USE bookmark_db;
CREATE TABLE bookmark (
    id INT AUTO_INCREMENT PRIMARY KEY,       
    URL VARCHAR(2083) NOT NULL,             
    title VARCHAR(255) NOT NULL,         
    dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);


