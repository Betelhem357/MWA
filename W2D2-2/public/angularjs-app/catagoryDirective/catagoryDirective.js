angular.module("instrumentsApp").filter("catagory", catagory);
function catagory() {
    return function (cata) {
        if (cata) {       
            switch (cata) {
                case 'Membranophones':
                    value = "$";
                    break;
                case "Chordophones":
                    value = "#";
                    break;
                case 'Aerophones':
                    value = "*";
                    break;
                default:
                    value = "vibration";
                    break;
            }
            return value;
        }
        return cata;
    }
}