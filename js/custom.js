/* 
===========================================================================
                         Handle Search Button
===========================================================================
 */

// Loading Spinner Function
const showSpinner = displayLoading => {
    const loading = document.getElementById('spinner').style.display = displayLoading;
}

document.getElementById('searchBtn').addEventListener("click", function () {
    const getInput = document.getElementById('searchInput').value;
    //loading spinner 
    showSpinner('block');
    //Error Message
    const errorMessage = document.getElementById('errorMessage');
    if (getInput == '') {
        errorMessage.innerText = "Please Type Phone Name Then Try aggain";
        //loading spinner 
        showSpinner('none');
    }
    else {
        //Load Phones API 
        fetch(`https://openapi.programming-hero.com/api/phones?search=${getInput}`)
            .then(res => res.json())
            .then(result => loadPhonesData(result.data))

        //Clear Input Value 
        document.getElementById('searchInput').value = "";

        //Clear Error Message
        errorMessage.innerText = '';
    }
})




/* 
========================================================================
                        Load Phones Data Function
========================================================================
 */
const loadPhonesData = loadPhone => {
    const showPhone = document.getElementById('showPhone');
    showPhone.innerHTML = '';

    //Error Message
    if (loadPhone.length == 0) {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.innerText = "No Phone found please Try aggain"
        //loading spinner 
        showSpinner('none');
    }
    else {
        loadPhone.map(phone => {
            const div = document.createElement('div');
            div.classList.add('makeCard');
            div.innerHTML = `
            <div class="text-center mt-5">
                <img src="${phone.image}" class="card-img-top img-fluid d-block mx-auto mt-3" alt="..." style="height:200px; width:200px">
                <div class="card-body">
                    <h3>${phone.phone_name}</h3>
                    <p class="text-secondary fw-bold"><span class="text-primary fw-bold">Brand : </span>${phone.brand}</p>
                    <a href="#" class="btn btn-primary fw-bold mt-2" onclick="handleShowPhone('${phone.slug}')">Show Details <span class="ms-2"><i class="fa-solid fa-circle-arrow-right"></i></span></a>
                </div>
            </div>
            `
            showPhone.appendChild(div);
        })
    }
    //loading spinner 
    showSpinner('none');
}



/* 
===================================================================
                     Handle Show Phone Function
===================================================================
 */

const handleShowPhone = phoneData => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneData}`)
        .then(res => res.json())
        .then(result => {
            //loading spinner 
            showSpinner('none');
            const phoneInfo = result.data;
            const showDetails = document.getElementById('showDetails');
            showDetails.innerHTML = `
            <div class="card rounded mt-5 mb-5">
             <h3 class="fw-bold text-center text-decoration-underline mb-4 pt-4">Phone Details</h3>
                    <img src="${phoneInfo.image}" class="card-img-top img-fluid d-block mx-auto mt-3" alt="..." style="height:200px; width:200px">
                    <h3 class="text-primary fw-bold mt-5 text-center">${phoneInfo.name} Full Specifications </h3>
                    <div class="card-body">
                       <table class="table table-bordered">
                        <tbody>
                            <tr>
                            <td class="fw-bold">Release </td>
                            <td>${phoneInfo.releaseDate ? phoneInfo.releaseDate : 'No release date'}</td>
                            </tr>
                            <tr>
                            <td class="fw-bold">Storage </td>
                             <td>${phoneInfo.mainFeatures.storage}</td>
                            </tr>
                            <tr>
                            <td class="fw-bold">Display Size </td>
                            <td>${phoneInfo.mainFeatures.displaySize}</td>
                            </tr>
                            <td class="fw-bold">Memory </td>
                            <td>${phoneInfo.mainFeatures.memory}</td>
                            </tr>
                             </tr>
                            <td class="fw-bold">WLAN </td>
                            <td>${phoneInfo.others.WLAN}</td>
                            </tr>
                             </tr>
                            <td class="fw-bold">Bluetooth </td>
                            <td>${phoneInfo.others.Bluetooth}</td>
                            </tr>
                             <td class="fw-bold">GPS </td>
                            <td>${phoneInfo.others.GPS}</td>
                            </tr>
                             <td class="fw-bold">Radio </td>
                            <td>${phoneInfo.others.Radio}</td>
                            </tr>
                             <td class="fw-bold">USB </td>
                            <td>${phoneInfo.others.USB}</td>
                            </tr>
                             </tr>
                             <td class="fw-bold">Sensors </td>
                            <td>${phoneInfo.mainFeatures.sensors[0]}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>

            `
        })
    //loading spinner 
    showSpinner('block');

}