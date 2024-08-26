// creating a simple server using express
// first import express from the module
// gather the material to build the clinic
const express = require("express");
const { patients, name } = require("./patients")

// create the instance of the express, like opening a hospital
const app = express();


// get no. of healthy and unhealthy kidneys here for both the persons
let data = "";

const updateData = () => {
    data = "";
    patients.forEach(patient => {
        const healthyKidneys = patient.kidneys.reduce((total, kidney) => {
            return kidney.healthy ? total = total + 1 : total
        }, 0);
        const totalKidneys = patient.kidneys.length;
        const unhealthyKidneys = totalKidneys - healthyKidneys;

        data += `-------${patient.name}-------\n
            Total kidneys: ${totalKidneys},\n
            Healthy kidneys: ${healthyKidneys},\n
            Unhealthy kidneys: ${unhealthyKidneys}\n\n`;

    })
}
// one of the room of the doctor - heart, ortho, eyes, dental, etc.
app.get('/', function (req, res) {
    updateData();
    res.send(`<pre>${data}</pre>`);
})

app.use(express.json())
// let's try  to put the unhealthy kidney in both the patients

const newKidney = (isHealthy) => {
    patients.forEach(patient => {
        patient.kidneys.push({ healthy: isHealthy })
    })
}

app.post('/', function (req, res) {
    // when posting anything, you check the body of the request, body contains all the necessary info
    const isHealthy = req.body.isHealthy;

    // update the patients kidneys
    newKidney(isHealthy);

    // when done with operations, you can send some info in the response from the server
    res.json({
        msg: "Done, putting an unhealthy kidney in patients"
    })
})

// let us try to update the unhealthy kidneys to healthy

const replaceKidneys = () => {
    patients.forEach(patient => {
        patient.kidneys.forEach(kidney => {
            kidney.healthy = true;
        })
    });
}

app.put('/', function (req, res) {
    if(isThereAtleastUnhealthyKidney()){
        replaceKidneys();
        res.json({
            msg: "Replaced the unhealthy kidneys with healthy one"
        })
    }  else{
        res.status(411).json({
            msg: "there is no unhealthy kidney"
        })
    }
   
})

//let us try to delete all the unhealthy kidneys
const removeUnhealthyKidneys = () => {
    patients.forEach(patient => {
        const newKidneys = patient.kidneys.filter(kidney => kidney.healthy);
        patient.kidneys = newKidneys;
    })
}

app.delete('/', function (req, res) {
    if (isThereAtleastUnhealthyKidney()) {
        removeUnhealthyKidneys();
        res.json({
            msg: "removed unhealthy kidneys"
        })
    }else{
        res.status(411).json({
            msg: "there is no unhealthy kidney"
        })
    }

})

const isThereAtleastUnhealthyKidney = () => {
    let flag = false;
    patients.forEach(patient => {
        patient.kidneys.forEach(kidney => {
            if (!kidney.healthy) {
                flag = true;
                return flag;
            }
        })
    })
    return flag;
}
// clinic for the doctor
app.listen(3000)
