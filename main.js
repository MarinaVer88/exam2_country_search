(function () {
    $(function () {
        let countriesArray;
        $("#onSearchCountryClicked").click(showCountryClicked);
        $("#onShowAllCountryClicked").click(showAllCounries);

        function showCountryClicked() {
            let countryToSearch = $("#countryName").val();
            $("#countryName").val("");
            $.get("https://restcountries.eu/rest/v2/name/" + countryToSearch).then(function (countries) {
                    countriesArray = countries;
                    showCountryCard(countriesArray);
                })
                .catch(e => {
                    console.error(e);
                    alert("There has been a problem extracting data from the server")
                })
        }


        function showAllCounries() {
            $("#countryName").val("");
            $.get("https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag;borders").then(function (countries) {
                    countriesArray = countries;
                    showCountryCard(countriesArray);
                })
                .catch(e => {
                    console.error(e);
                    alert("There has been a problem extracting data from the server")
                })
        }

        function getCurrenciesHtml(currencies) {
            let html = "Currencies: <br>";
            for (let i=0; i<currencies.length; i++) {
                let currencyCode = currencies[i].code + " ";
                let currencyName = currencies[i].name + " ";
                let currencySymbol = currencies[i].symbol + "<br>";

                let currency = currencyCode + currencyName + currencySymbol + " ";
                html = html + currency;
            }
            return html;
        }


        function showCountryCard(countries) {
            $("#container").empty();

            for (let country of countries) {

                let currenciesHtml = getCurrenciesHtml(country.currencies);
                let html = `
                <div class="card cardframe countryCard">
                    <div class="card-image text-center">
                        <img src ="${country.flag}">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title text-center">${country.name}</h4>
                        <ul class="card-text list-group list-group-flush">
                            <li class="list-group-item">Capital: ${country.capital}</li>
                            <li class="list-group-item">Top level domain: ${country.topLevelDomain}</li>
                            <li class="list-group-item">Borders: ${country.borders}</li>
                            <li class="list-group-item">` + currenciesHtml + `</li> 
                        </ul>
                    </div>
                </div>`;

                let countryCard = $(html);
                $("#container").append(countryCard);

            }
        }
        

    })
})();