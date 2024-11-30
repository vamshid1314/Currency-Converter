
// const fromCurrency = document.getElementById('from-currency');
// const toCurrency = document.getElementById('to-currency');
// const fromFlag = document.getElementById('from-flag');
// const toFlag = document.getElementById('to-flag');

const dropDowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button")

for(let select of dropDowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;

        if(select.name==="from" && currCode === "USD"){
            newOption.selected = "selected"
        }else if(select.name==="to" && currCode === "INR"){
            newOption.selected = "selected"
        }

        select.append(newOption);

        select.addEventListener("change", (evt) =>{
            updateFlag(evt.target);
        });
    }
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal < 1){
        amtVal=1;
        amount.value="1";
    }

    const fromCountry = document.querySelector("#from-currency").value;
    const toCountry = document.querySelector("#to-currency").value;

    fetch(`https://open.er-api.com/v6/latest/${fromCountry}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCountry];
            const convertedAmount = (amtVal*rate).toFixed(2);

            document.querySelector("#target-val").value = convertedAmount;
        })
        .catch(error => {
                console.error('Error fetching exchange rates:', error);
                 alert('Failed to fetch exchange rates. Please try again later.');
             });
            
});






