function calc() {
    var age = Document.GetElementByID("age");
    var height = Document.GetElementByID("height");
    var weight = Document.GetElementByID("weight");
    var sysbp = Document.GetElementByID("systolic");
    var diabp = Document.GetElementByID("diastolic");
    var histdiabetes = Document.GetElementByID("diabetes").checked;
    var histcancer = Document.GetElementByID("cancer").checked;
    var histalzheimer = Document.GetElementByID("alzheimer").checked;
    var totalrisk = 0;
    var risk = "Default";
    //Age calculations.
    if (age > 60) {
        totalrisk+= 30;
    }
    else if (age > 45) {
        totalrisk+= 20;
    }
    else if (age > 30) {
        totalrisk+= 10;
    }
    else {
        totalrisk+= 0;
    }
    //Calculating BMI
    var metricheight = height / 1550;
    var metricweight = weight / 2.205;
    var BMI = metricweight / metricheight;
    if (BMI >= 30) {
        totalrisk+= 75;
    }
    else if (BMI >= 25) {
        totalrisk+= 30;
    }
    else {
        totalrisk+= 0;
    }
    //Calculating blood pressure.
    if (sysbp >= 180 || diabp >= 120) {
        totalrisk+= 100;
    }
    else if (sysbp >= 140 || diabp >= 90) {
        totalrisk+= 75;
    }
    else if (sysbp >= 130 || diabp >= 80) {
        totalrisk+= 30;
    }
    else if (sysbp >= 120 && diabp < 15) {
        totalrisk+= 15;
    }
    else {
        totalrisk+= 0;
    }
    //Family history
    if (histdiabetes == true) {
        totalrisk+= 10;
    }
    if (histcancer == true) {
        totalrisk+= 10;
    }
    if (histalzheimer == true) {
        totalrisk+= 10;
    }
    //Final conclusion.
    if (totalrisk <= 20) {
        risk = "Low Risk";
    }
    else if (totalrisk <= 50) {
        risk = "Moderate Risk";
    }
    else if (totalrisk <= 75) {
        risk = "High Risk";
    }
    else {
        risk = "Uninsurable";
    }
    console.log(risk);

}