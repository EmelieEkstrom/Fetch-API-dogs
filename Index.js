let file = "https://majazocom.github.io/Data/dogs.json"

fetch('https://majazocom.github.io/Data/dogs.json') 
.then(function(response) {
    //koden körs när servern svarar
    return response.json(); //ett promise,gör om svaret till ett objekt 
})
.then(function(data) {   
    //objekt
    //den här koden körs när svaret gjorts om till ett objekt
        console.log(data);
})
.catch(function(error) {
    console.error(error) //Denna kod körs om det blir fel exempelvis att servern inte svarar
})

const dogsElem = document.querySelector('.dogs');

function displayDogs(dogs) {

    let allDogs = '';

    for(let i = 0; i < dogs.length; i++) {
        console.log(dogs[i]);
        const imageUrl = dogs[i].img
            .replace('/Akita_inu_blanc.jpg', '/akita_inu_blanc.jpg')
            .replace('/Akita_Inu_dog.jpg', '/akita_inu_dog.jpg')
            .replace('/n02113186_314.jpg', '/n02113186_4760.jpg');

    allDogs += `
        <article>
            <img src="${imageUrl}" alt="${dogs[i].name}" data-breed="${dogs[i].breed}">
                <h2>${dogs[i].name}</h2>
                <p>${dogs[i].age}</p>
                <p>${dogs[i].breed}</p>
                <p>${dogs[i].sex}</p>
            <p>Chipnummer: ${dogs[i].chipNumber}</p>
            
            <h3>Ägare</h3>

                <p>

                    ${dogs[i].owner.name}

                    ${dogs[i].owner.lastName}

                </p>

                <p>Telefon: ${dogs[i].owner.phoneNumber}</p>

            </article>

        `;
}
console.log(dogs);
dogsElem.innerHTML = allDogs;

dogsElem.querySelectorAll('img').forEach(function(img) {
        img.addEventListener('error', async function() {
            if (img.dataset.fallbackAttempted) {
                img.hidden = true;
                return;
            }

            img.dataset.fallbackAttempted = 'true';

            try {
                const response = await fetch(
                    `https://dog.ceo/api/breed/${encodeURIComponent(img.dataset.breed)}/images/random`
                );
                if (!response.ok) {
                    throw new Error(`Image API returned ${response.status}`);
                }

                const data = await response.json();
                if (data.status !== 'success' || typeof data.message !== 'string') {
                    throw new Error(`No fallback image found for breed: ${img.dataset.breed}`);
                }

                img.src = data.message;
            } catch (error) {
                console.error(`Could not load a fallback image for ${img.dataset.breed}`, error);
                img.hidden = true;
            }
        });
    });

}

async function getDogs() {
    try {
        const response = await fetch('https://majazocom.github.io/Data/dogs.json');
        const data = await response.json();

        console.log(data);
        displayDogs(data);

    } catch  (error) {
        console.log('Could not get dogs');
    }
}

getDogs();