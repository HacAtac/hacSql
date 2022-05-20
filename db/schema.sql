CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,

  name VARCHAR(50) NOT NULL,

  description TEXT
);


CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,

  -- The candidate's name
  first_name VARCHAR(30) NOT NULL,

  -- The candidate's last name
  last_name VARCHAR(30) NOT NULL,

  -- If candidate's are industry_connected
  industry_connected BOOLEAN NOT NULL
);