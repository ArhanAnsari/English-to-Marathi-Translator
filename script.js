document.getElementById('inputText').addEventListener('input', async function() {
    const inputField = this;
    const inputText = inputField.value.trim();

    // If the user types a space, fetch the last word and translate it
    if (inputText.endsWith(' ')) {
        const words = inputText.split(' ');
        const lastWord = words[words.length - 2]; // Get the last word before the space

        if (lastWord) {
            const translatedWord = await translateToMarathi(lastWord);

            // Replace the last word with the translated word in the text area
            words[words.length - 2] = translatedWord;
            inputField.value = words.join(' ') + ' '; // Keep the trailing space for further typing
        }
    }
});

async function translateToMarathi(word) {
    const url = 'https://microsoft-translator-text.p.rapidapi.com/translate?to=mr&api-version=3.0&profanityAction=NoAction&textType=plain';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'a31edf94ccmsh591b19161e4448fp1f3636jsn3cd66e78c9ef',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: JSON.stringify([{ Text: word }])
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Translation failed: ' + response.statusText);
        }
        const data = await response.json();
        const translatedText = data[0].translations[0].text;
        return translatedText;
    } catch (error) {
        console.error('Error translating word:', error);
        return word; // Return the original word in case of an error
    }
}