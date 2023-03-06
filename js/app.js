const loadData = async(dataLimit) =>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayAI(data.data.tools,dataLimit)
}
const displayAI = (AIUniverse,dataLimit ) =>{
    const aiContainer = document.getElementById('ai-container');  
    const showAll = document.getElementById('show-all');

    if(dataLimit && AIUniverse.length < 6){
        showAll.classList.remove('d-none');
        AIUniverse = AIUniverse.slice(0,6);
    }
    else{
        showAll.classList.add('d-none');
        
    }


  toggleSpinner(true);
    AIUniverse.forEach(aiData =>{
        const AIdiv = document.createElement('div');
        AIdiv.classList.add('col');
        AIdiv.innerHTML= `
        <div class="card h-100 rounded-4">
            <div class="cd-body">
                <img src="${aiData.image}" class="card-img-top rounded-4" style= alt="...">
                <div class="card-body features">
                    <h5 class="ai-title"><h3>Features</h3></h5>
                    <ol class="feature-list">
                        <li>${aiData.features [0]}</li>
                        <li>${aiData.features [1]}</li>
                        <li>${aiData.features [2] ? aiData.features[2] : ''}</li>
                    </ol>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                <div class="card-footer chang-color">
                    <h3 style="color: black;">${aiData.name}</h3>
                    <div class="time"><i class="fa-regular fa-calendar-days"></i><P>${aiData.published_in}</P></div>
                </div>
                <button class="modal-btn"  onclick="loadAiDetails('${aiData.id}')" data-bs-toggle="modal" data-bs-target="#AiModal"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        `;
        aiContainer.appendChild(AIdiv);
    });

    toggleSpinner(false);
    // console.log(AIUniverse);
}
const prSer = (dataLimit) =>{
    toggleSpinner(true);

}

document.getElementById('')

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loder')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}


const loadAiDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayAiDetails(data.data);
}

const displayAiDetails = aiDetails =>{
    // console.log(aiDetails);
    const modalTitle = document.getElementById('modal-container');
    modalTitle.innerHTML=`
    <div class="col">
                          <div class="card h-100 border background-style">
                            <div>
                                <div>
                                    <p class="datel">${aiDetails.description}</p>
                                    <div class="amount">
                                        <div id="basic-amount" class="price"><p>${aiDetails.pricing[0].price + '' + aiDetails.pricing[0].plan ? aiDetails.pricing[0].price + '' + aiDetails.pricing[0].plan :'Free of Cost/Basic'}</p></div>
                                        <div id="pro-amount" class="price"><p>${aiDetails.pricing[1].price + '' + aiDetails.pricing[1].plan ? aiDetails.pricing[1].price + '' + aiDetails.pricing[1].plan :'Free of Cost/Basic'}</p></div>
                                        <div id="contact-amount" class="price"><p>${aiDetails.pricing[2].price + '' + aiDetails.pricing[2].plan ? aiDetails.pricing[2].price + '' + aiDetails.pricing[2].plan :'Free of Cost/Basic'}</p></div>
                                    </div>
                                </div>
                                <div class="list-section">
                                    <div>
                                        <h3>Features</h3>
                                        <ul>
                                        <li class="m-0 p-0">${aiDetails.features ? aiDetails.features[1].feature_name : 'No features found' }</li>
                                        <li class="m-0 p-0">${aiDetails.features ? aiDetails.features[2].feature_name : 'No features found' }</li>
                                        <li class="m-0 p-0">${aiDetails.features ? aiDetails.features[3].feature_name : 'No features found' }</li>
                                           
                                        </ul>
                                    </div>
                                    <div>
                                        <div>
                                            <h3>Integrations</h3>
                                            <ul>
                                            <li class="m-0 p-0">${aiDetails.integrations ? aiDetails.integrations[0] : 'No data Found'}</li>
                                            <li class="m-0 p-0">${aiDetails.integrations ? aiDetails.integrations[1] : 'No data Found'}</li>
                                            <li class="m-0 p-0">${aiDetails.integrations ? aiDetails.integrations[2] : 'No data Found'}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div class="col">
                          <div class="card h-100">
                            <div>
                                <div class="padding">
                                <img src="${aiDetails.image_link[0]}" class="card-img-top" alt="...">
                                <h3>${aiDetails.input_output_examples[1].input}</h3>
                                <p>${aiDetails.input_output_examples[1].output? aiDetails.input_output_examples[1].output : 'No! Not Yet! Take a break!!!'}</p>
                            </div>
                            </div>
                          </div>
                        </div>
    `
}



loadAiDetails()

loadData()