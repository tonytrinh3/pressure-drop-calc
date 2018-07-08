function pressureCalc(){
    let item = document.getElementById("item").value; /* duct fitting device */
    let ductDia = document.getElementById("ductDia").value; /* ductDia or width  */
    let quantity = document.getElementById("quantity").value; /* number or feet */
    let airFlow = document.getElementById("airFlow").value; /*airflow in cfm */
    let material = document.getElementById("material").value;
    let stndAirDensity = 0.075; /* lb.ft^3 */
    /*let coeffDrop = document.getElementById("coeffDrop").value;*/

    if (item === "duct" || item === "Duct"){
        document.getElementById("fitLossCoeff").value = '-';
    } else {
        let fitLossCoeff = document.getElementById("fitLossCoeff").value; /* fitting loss coeffienct */
    }



    /* determine duct type  */

    let ductType;

    if (typeof ductDia == "number"){
        ductType = "round";
    } else{
        ductType = "rect";
    }


    console.log(ductType);

    /* equivalent diameter

    need to call in the if function
    */

    let ductRect = ductDia.split("x");
    let ductWidth = parseFloat(ductRect[0]);
    let ductHeight = parseFloat(ductRect[1]);

    let equivDia;


    if (ductType === "rect") {
        equivDia = Math.floor((1.30*Math.pow((ductWidth * ductHeight),0.625))/(Math.pow((ductWidth + ductHeight),0.25)));
    } else {
        equivDia = ductDia;
    }

    console.log(equivDia);

    /* Velocity through duct */

    let vel = (airFlow*144) / (Math.PI* Math.pow((equivDia/2),2));

    console.log(vel);

    /* Velocity pressure through duct */

    let velPressure = Math.pow((vel/4005),2);

    console.log(velPressure);

    /* Reynold's Number */

    let Re = 8.56 *equivDia * vel;

    console.log(Re);

    /*Roughness of duct based on material
    default is galvanized */


    let roughness;

    switch (material){
    case "stainless":
    case "Stainless":
        roughness = 0.0018;
        break;
    case "galvanized":
    case "Galvanized":
        roughness = 0.0005;
        break;
    case "aluminum":
    case "Aluminum":
        roughness = 0.0003;
        break;
    default:
        roughness = 0.0005;
    }

    console.log(roughness);

    /* Friction Factor */

    let fr;

    let fprime;

    if (equivDia === 0 || Re === 0 ){
    fr = 0;
    } else {
    
        fprime = 0.11 * Math.pow(((12*roughness/equivDia) + (68 / Re)), .25);

        
        if (fprime => 0.018){
        fr = fprime;
        } else{
        fr = 0.85 * fprime + 0.0028;
        
        }
        
        console.log(fr);
        
    }

    /* Pressure Drop / 100 ft (inch wc) */



    let p100f = 12 * 100 * fr / equivDia * stndAirDensity * Math.pow((vel/1097),2);

    console.log(p100f);

    /* Pressure drop (inch wc) */

    let pf;

    if (item === "duct" || item === "Duct"){
    pf = quantity*p100f/100;
    
    } else if (item ==="fitting" || item === "Fitting"){
    pf = fitLossCoeff * velPressure * quantity;
    }

    console.log(pf);


    /*
    Table 14-10 Loss Coefficients, Elbow

    table for round elbow for 90 deg elbow
    first row is R/D coeff
    second row is the C coefficients
    */


    const tableA10 = [['R/D',0.5, 0.75, 1, 1.5, 2,2.5 ],
    ['C',0.71, 0.33, .22, .15, .13, .12 ] ];

    /*note 1 for angels other than 90 */

    const tableA101 = [['theta',0,20,30,45,60,75,90,110,130,150,180],
    ['K']]

   

    const tableA10Object = {
        RD: [0.5, 0.75, 1, 1.5, 2,2.5],
        C: [0.71, 0.33, .22, .15, .13, .12],
        theta: [0,20,30,45,60,75,90,110,130,150,180],
        K: [0,0.31,0.45,0.60,0.78,0.90,1,1.13,1.20,1.28,1.4]
    }

     console.log(tableA10Object.RD[2]);

  

  
  document.getElementById('demo').innerHTML= material;
  document.getElementById('ductType').innerHTML = ductType;
  document.getElementById('equivDia').innerHTML = equivDia.toFixed(2); //to fixed is a rounding thing. the number is number of decmial points
  document.getElementById('vel').innerHTML =  vel.toFixed(2);
  document.getElementById('velPressure').innerHTML = velPressure.toFixed(4);
  document.getElementById('Re').innerHTML = Re.toFixed(2);
  document.getElementById('roughness').innerHTML = roughness.toFixed(4);
  document.getElementById('fr').innerHTML = fr.toFixed(2);
  document.getElementById('p100f').innerHTML = p100f.toFixed(2);
  document.getElementById('pf').innerHTML = pf.toFixed(4);
  document.getElementById('pfDev').innerHTML = pf.toFixed(4); /*user input*/
  document.getElementById('pfCum').innerHTML = pf.toFixed(4); /* maybe be based on array? */


}




/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}