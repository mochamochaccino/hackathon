function sendTranslation(from_language, to_language, user_text){
    const url = 'https://api.openai.com/v1/chat/completions'
    const apiKey = ''; //insert openAI API KEY HERE
    console.log(from_language, to_language, user_text);
    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: `Please help me translate ${from_language} to ${to_language}`},
            //system sets the context of what you're asking
            { role: 'user', content: `${user_text}` }
            //user is the end user asking the question
        ]
    };

    fetch(url, {
        method: 'POST', //post to openai api
        headers: {
        'Authorization': `Bearer ${apiKey}`, //bearer token with apikey
        'Content-Type': 'application/json' //application utilizing json
        },
        body: JSON.stringify(data) //flattens our message into json
    })
        .then(response => response.json()) //response is set (reminder to display this later)
        .then(reply => {
            const output = document.getElementById('output');
            const message = reply.choices[0].message.content; //pulls the message out of the object located inside the choices array
            // console.log(typeof message);
            output.innerText = message; 
        });
}
//sendTranslation("english", "spanish", "hello world");

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submit');

    button.addEventListener('click', () => {
        const from_language = document.getElementById('from_language');
        const to_language = document.getElementById('to_language');
        const user_text = document.getElementById('user_text');
        console.log(from_language.value, to_language.value, user_text.value);
        sendTranslation(from_language.value, to_language.value, user_text.value);
    });
});

    // response object as a reply
        // {
        //     id: 'chatcmpl-9jbydllHH3Y0h5P0aEYhkER9QiUcW',
        //     object: 'chat.completion',
        //     created: 1720657771,
        //     model: 'gpt-3.5-turbo-0125',
        //     choices: [
        //       {
        //         index: 0,
        //         message: [Object],
        //         logprobs: null,
        //         finish_reason: 'stop'
        //       }
        //     ],
        //     usage: { prompt_tokens: 23, completion_tokens: 9, total_tokens: 32 },
        //     system_fingerprint: null
        //   }

        // language option popup 