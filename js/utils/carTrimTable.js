document.addEventListener('DOMContentLoaded',(loaded) => {

    /* --------------------------------------- */
    /*    CAR CONFIGURATION DROP DOWN MENU     */
    /* --------------------------------------- */

    if (document.getElementById("product-page"))
    {

        // get the selected configuration name
        var configSelected = document.getElementById("config-selected");

        // get the dropdown menu and its value
        var configMenu = document.getElementById("config-menu");
        var configMenuValue = document.getElementById("config-menu").value;

        // get the table value elements (desktop and mobile tables)
        var configPrice = document.querySelectorAll(".config-price");
        var configEngine = document.querySelectorAll(".config-engine");
        var configTransmission = document.querySelectorAll(".config-transmission");
        var configDrivetrain = document.querySelectorAll(".config-drivetrain");
        var configFuel = document.querySelectorAll(".config-fuel");
        var configHP = document.querySelectorAll(".config-hp");
        var configTorque = document.querySelectorAll(".config-torque");

        // Create a CarTrim class
        class CarTrim {
            constructor(name, price, engine, transmission, driveTrain, fuelCity, fuelHwy, hp, torque) {
                this.name = name;
                this.price = price;
                this.engine = engine;
                this.transmission = transmission;
                this.driveTrain = driveTrain;
                this.fuelCity = fuelCity;
                this.fuelHwy = fuelHwy;
                this.hp = hp;
                this.torque = torque;
            }
        }

        // Declare the CarTrim objects
        let coupeV10RWD = new CarTrim("Coupe V10 Performance RWD", "$158,600", "5.2L V10 Gas", "7-Speed Automatic", "Rear-Wheel Drive", "14", "23", "562 HP @ 4475 RPM", "406 lb-ft @ 6300 RPM");
        let coupeV10quattro = new CarTrim("Coupe V10 Performance Quattro", "$209,700", "5.2L V10 Gas", "7-Speed Automatic", "All-Wheel Drive", "13", "18", "602 HP @ 8100 RPM", "413 lb-ft @ 6700 RPM");
        let coupeGTRWD = new CarTrim("Coupe GT RWD", "$249,900", "5.2L V10 Gas", "7-Speed Automatic", "Rear-Wheel Drive", "14", "21", "602 HP @ 8100 RPM", "413 lb-ft @ 6700 RPM");
        let spyderV10RWD = new CarTrim("Spyder V10 Performance RWD", "$171,000", "5.2L V10 Gas", "7-Speed Automatic", "Rear-Wheel Drive", "14", "23", "562 HP @ 4475 RPM", "406 lb-ft @ 6300 RPM");
        let spyderV10Quattro = new CarTrim("Spyder V10 Performance Quattro", "$222,100", "5.2L V10 Gas", "7-Speed Automatic", "All-Wheel Drive", "13", "18", "602 HP @ 8100 RPM", "413 lb-ft @ 6700 RPM");

        // Function to update the values in the config table
        function updateTableData(carTrim) {
            configPrice[0].textContent = carTrim["price"];
            configPrice[1].textContent = carTrim["price"];
            configEngine[0].textContent = carTrim["engine"];
            configEngine[1].textContent = carTrim["engine"];
            configTransmission[0].textContent = carTrim["transmission"];
            configTransmission[1].textContent = carTrim["transmission"];
            configDrivetrain[0].textContent = carTrim["driveTrain"];
            configDrivetrain[1].textContent = carTrim["driveTrain"];
            configFuel[0].innerHTML = "City: " + carTrim["fuelCity"] + " MPG\n" +
                "                    <span>Hwy: " + carTrim["fuelHwy"] + " MPG</span>";
            configFuel[1].innerHTML = "City: " + carTrim["fuelCity"] + " MPG\n" +
                "                    <span>Hwy: " + carTrim["fuelHwy"] + " MPG</span>";
            configHP[0].textContent = carTrim["hp"];
            configHP[1].textContent = carTrim["hp"];
            configTorque[0].textContent = carTrim["torque"];
            configTorque[1].textContent = carTrim["torque"];
            configSelected.textContent = carTrim["name"];
        }

        // function to update the configuration table based on which value is selected from dropdown menu
        function updateConfigTable() {
            configMenuValue = document.getElementById("config-menu").value;

            // switch statement to display table values based on option selected
            switch(configMenuValue) {
                case "1":
                    updateTableData(coupeV10RWD);
                    break;
                case "2":
                    updateTableData(coupeV10quattro);
                    break;
                case "3":
                    updateTableData(coupeGTRWD);
                    break;
                case "4":
                    updateTableData(spyderV10RWD);
                    break;
                case "5":
                    updateTableData(spyderV10Quattro);
                    break;
            }
        }

        // event listener that listens for a change in the menu
        configMenu.addEventListener('change', updateConfigTable);
    }

});