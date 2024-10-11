CREATE DATABASE GasStationDB;
USE GasStationDB;

CREATE TABLE Station (
    station_id INT PRIMARY KEY,
    station_name VARCHAR(100) NOT NULL,
    station_address VARCHAR(255) NOT NULL,
    station_phone VARCHAR(15)
);
CREATE TABLE Product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    unit_price FLOAT NOT NULL
);
CREATE TABLE Pump (
    pump_id INT PRIMARY KEY,
    station_id INT NOT NULL,
    product_id INT NOT NULL,
    pump_number INT NOT NULL
);
CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY,
    transaction_date DATETIME NOT NULL,
    station_id INT NOT NULL,
    pump_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity FLOAT NOT NULL,
    total_price FLOAT NOT NULL
);
-- Khóa ngoại cho bảng Pump
ALTER TABLE Pump
ADD CONSTRAINT fk_station
    FOREIGN KEY (station_id) REFERENCES Station(station_id)

ALTER TABLE Pump
ADD CONSTRAINT fk_product
    FOREIGN KEY (product_id) REFERENCES Product(product_id)

-- Khóa ngoại cho bảng Transaction
ALTER TABLE Transactions
ADD CONSTRAINT fk_transaction_station
    FOREIGN KEY (station_id) REFERENCES Station(station_id)

ALTER TABLE Transactions
ADD CONSTRAINT fk_transaction_pump
    FOREIGN KEY (pump_id) REFERENCES Pump(pump_id)

ALTER TABLE Transactions
ADD CONSTRAINT fk_transaction_product
    FOREIGN KEY (product_id) REFERENCES Product(product_id)


