document.addEventListener("DOMContentLoaded", function() {
    const usdtRateElement = document.getElementById("usdt-rate");
    const btcRateElement = document.getElementById("btc-rate");
    const ethRateElement = document.getElementById("eth-rate");
    const ltcRateElement = document.getElementById("ltc-rate");
    const xrpRateElement = document.getElementById("xrp-rate");
    const tonRateElement = document.getElementById("ton-rate");
    const notRateElement = document.getElementById("not-rate");
    const exchangeForm = document.getElementById("exchange-form");
    const exchangeResult = document.getElementById("exchange-result");

    let rates = {};

    async function fetchRates() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,ripple,the-open-network,tether,notcoin&vs_currencies=usd');
            const data = await response.json();
            
            rates = {
                USDT: data.tether.usd,
                BTC: data.bitcoin.usd,
                ETH: data.ethereum.usd,
                LTC: data.litecoin.usd,
                XRP: data.ripple.usd,
                TON: data['the-open-network'].usd,
                NOT: data.notcoin.usd
            };

            usdtRateElement.textContent = `USDT: $${rates.USDT}`;
            btcRateElement.textContent = `BTC: $${rates.BTC}`;
            ethRateElement.textContent = `ETH: $${rates.ETH}`;
            ltcRateElement.textContent = `LTC: $${rates.LTC}`;
            xrpRateElement.textContent = `XRP: $${rates.XRP}`;
            tonRateElement.textContent = `TON: $${rates.TON}`;
            notRateElement.textContent = `NOT: $${rates.NOT}`;
        } 
        catch (error) {
            console.error('Error fetching rates:', error);
        }
    }

    function performExchange() {
        const fromCurrency = document.getElementById("from-currency").value;
        const toCurrency = document.getElementById("to-currency").value;
        const amount = parseFloat(document.getElementById("amount").value);
        
        if (fromCurrency === toCurrency) {
            exchangeResult.textContent = "Please select different currencies for exchange.";
            return;
        }

        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];
        
        const exchangedAmount = (amount * fromRate) / toRate;
        
        exchangeResult.textContent = `You will receive ${exchangedAmount.toFixed(4)} ${toCurrency}`;
    }

    fetchRates();
    exchangeForm.addEventListener("input", performExchange);
    performExchange();
});

// function addLeadingZero(value) {
//    return value < 10 ? '0' + value : value;
// }

// function displayDateTime() {
//    var date = new Date();

//    var day = addLeadingZero(date.getDate());
//    var month = addLeadingZero(date.getMonth() + 1); // Months are zero-based, so add 1
//    var year = date.getFullYear();

//    var hours = addLeadingZero(date.getHours());
//    var minutes = addLeadingZero(date.getMinutes());
//    var seconds = addLeadingZero(date.getSeconds());

//    var formattedDate = day + "." + month + "." + year + " | ";
//    var formattedTime = hours + ":" + minutes + ":" + seconds;

//    document.getElementById('dateContainer').innerText = formattedDate;
//    document.getElementById('timeContainer').innerText = formattedTime;
// }

// // Display date and time when the page loads
// displayDateTime();

// // Update the time every second
// setInterval(displayDateTime, 1000);

// // Add event listeners to show custom tooltip on hover
// var timeContainer = document.getElementById('timeContainer');
// var tooltip = document.getElementById('tooltip');

// timeContainer.addEventListener('mouseover', function() {
//     tooltip.style.display = 'block';
// });

// timeContainer.addEventListener('mouseout', function() {
//     tooltip.style.display = 'none';
// });