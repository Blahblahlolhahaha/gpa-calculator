const input = require("readline-sync");
const fetch = require("fs");
const path = require("path");
var modules = JSON.parse(bufferFile("module.json"));
class Module {
    constructor(name, credit, grade, score) {
        this.name = name;
        this.credit = credit;
        this.grade = grade;
    }
    getDetails() {
        // get details about the module
        this.credit = input.questionFloat("Please input credit points of module\n>>>");
        do {
            this.grade = input.question("Please input your current grade of this module\n>>").toLowerCase();
            if (this.grade != "a" && this.grade != "b+" && this.grade != "b" && this.grade != "c+" && this.grade != "c" && this.grade != "d+" && this.grade != "d" && this.grade != "pass" && this.grade != "fail") {
                console.log("Invalid input!\n")
            }
        } while (this.grade != "a" && this.grade != "b+" && this.grade != "b" && this.grade != "c+" && this.grade != "c" && this.grade != "d+" && this.grade != "d" && this.grade != "pass" && this.grade != "fail");

        var confirm = input.question(`module:${this.name}\n\nCredit:${this.credit}\n\nYour Grade:${this.grade}\n\nAre the following details correct? Press x to confirm, press y to cancel and return to main menu \npress any other key to enter the details again\n>>> `);
        if (confirm == "y") {
            mainMenu()
        }
        else if (confirm != "x") {
            this.getDetails();
        }


    }
    alterGrade() {
        do {
            this.grade = input.question("Please input your current grade of this module\n\n>>>");
            if (this.grade != "a" && this.grade != "b+" && this.grade != "b" && this.grade != "c+" && this.grade != "c" && this.grade != "d+" && this.grade != "d" && this.grade != "pass" && this.grade != "fail") {
                console.log("Invalid input!\n")
            }
        } while (this.grade != "a" && this.grade != "b+" && this.grade != "b" && this.grade != "c+" && this.grade != "c" && this.grade != "d+" && this.grade != "d" && this.grade != "pass" && this.grade != "fail");
    }
    getGrade() {
        // gets the grade in numbers
        switch (this.grade) {
            case "a": this.score = 4.0;
                break;
            case "b+": this.score = 3.5;
                break;
            case "b": this.score = 3.0;
                break;
            case "c+": this.score = 2.5;
                break;
            case "c": this.score = 2.0;
                break;
            case "d+": this.score = 1.5;
                break;
            case "d": this.score = 1.0;
                break;
            case "pass": this.score = 0.5;
                break;
            case "fail": this.score = 0.0;
                break;
        }
    }
    calcGpa() {
        // helps in calculating the gpa of the student
        return this.credit * this.score;
    }
}
function bufferFile(relPath) {
    // function to get the file
    return fetch.readFileSync(path.join(__dirname, relPath)); // zzzz....
}

function WriteFile(relPath, data) {
    // function to write the file
    return fetch.writeFileSync(path.join(__dirname, relPath), data); // zzzz....
}
function addModule(name) {
    class1 = new Module(name);
    class1.getDetails();
    class1.getGrade();
    modules.modules.push(class1);
    WriteFile("module.json", JSON.stringify(modules));
    mainMenu();
}
function alterModule() {
    if (modules.modules.length == 0) {
        console.log("You haven't entered any modules yet! Go add a module instead!\n");
        mainMenu();
    }
    else {
        s = "";
        for (i = 0; i < modules.modules.length; i++) {
            s += `${i + 1}) ${modules.modules[i].name} \n`;
        }
        do {
            var choiceMod = input.questionInt(`${s}Which module would you like to alter? Press 0 to return to main menu\n\n>>>`);
        } while (choiceMod <= 0 && choiceMod > modules.modules.length)

        if (choiceMod == 0) {
            mainMenu();
        }
        else {
            var altClass = new Module(modules.modules[choiceMod - 1].name);
            altClass.getDetails();
            altClass.getGrade();
            modules.modules[choiceMod - 1] = altClass;
            WriteFile("module.json", JSON.stringify(modules));
            console.log("Success!\n");
            mainMenu()
        }
    }
}
function gpa() {
    if (modules.modules.length == 0) {
        console.log("You haven't entered any modules yet! Go add a module to calculate your gpa!\n");
        mainMenu();
    }
    else {
        var hours = 0;
        var score = 0;
        var s = "";
        for (i = 0; i < modules.modules.length; i++) {
            classs = new Module(modules.modules[i].name, modules.modules[i].credit, modules.modules[i].grade);
            classs.getGrade();
            s += `Module${i + 1}:${modules.modules[i].name}\nCredit:${modules.modules[i].credit}\nGrade:${modules.modules[i].grade}\n\n`;
            hours += modules.modules[i].credit;
            score += classs.calcGpa();
        }
        var gpa = score / hours
        console.log(`Here are the details of all your modules:\n${s}Your gpa is ${gpa}!\n`);
        mainMenu();
    }

}
function deleteModule() {
    var s = "";
    for (i = 0; i < modules.modules.length; i++) {
        s += `${i + 1}) ${modules.modules[i].name} \n`;
    }
    do {
        var choiceMod = input.questionInt(`${s}Which module would you like to alter? Press 0 to return to main menu\n\n>>>`);
    } while (choiceMod <= 0 && choiceMod > modules.modules.length)

    if (choiceMod == 0) {
        mainMenu();
    }
    else {
        modules.modules.splice(choiceMod - 1, 1);
        WriteFile("module.json", JSON.stringify(modules));
        console.log("Success!\n");
        mainMenu()
    }
}
function mainMenu() {
    do {
        var choice = input.questionInt("Hi! What would you like to do today?\n1)Add new module\n2)Alter the grade of a module!\n3)Calculate my GPA!\n4)Delete module\n5)Exit>>>");
        if (choice != 1 && choice != 2 && choice != 3 && choice != 4 && choice != 5) {
            console.log("invalid input!\n");
        }
    } while (choice != 1 && choice != 2 && choice != 3 && choice != 4 && choice != 5);
    if (choice == 1) {
        var name = input.question("\nWhat is the name of the module?\n>>>");
        for (i = 0; i < modules.modules.length; i++) {
            // checks whether the module has been entered b4 and alerts the user
            if (name.toLowerCase() == modules.modules[i].name.toLowerCase()) {
                var same = input.question("\nYou have already entered this module before, would you like to alter the details of the module instead? Press x to alter, press any other key to continue\n>>>");
                if (same == "x") {
                    choice = 2;
                }
            }
        }
        addModule(name);
    }
    else if (choice == 2) {
        alterModule();
    }
    else if (choice == 3) {
        gpa();
    }
    else if (choice == 4) {
        deleteModule();
    }
    else {
        WriteFile("module.json", JSON.stringify(modules));
    }
}
mainMenu()