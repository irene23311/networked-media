//import the dotenv library
//and allows us to access variable inside the .env file
//by using process.env.VARIABLE_NAME
require('dotenv').config();
//important the masto api that we will use
const m = require('masto');

//set up the ability to use the masto library, it is very similar to making app 
//const app=express()
const masto=m.createRestAPIClient({
    url: 'https://networked-media.itp.io',
    accessToken: process.env.TOKEN
})

const makeStatus =async() => {
    let posts = [
       "And the dust of the valley spoke without a voice. #Xe∆7",
"For the house of the wind was opened in silence. #Ar_13",
"And the light fell upon the broken field at evening. #Zor∞",
"The sea remembered the name that was never spoken. #Ne∆∆",
"What do people gain from all their labors at which one can say, “Look! This is some, more they returning on its course. #Kr_∅9",
"The wind blows to their labors at which one can say. The wind blows to the sea, yet the sun sets, and generations go, but the sun?#Na∞",
"4 Generations come will be again, what has been done can say, “Utterly meaningless! Meaningless! Everything Is there anything Is Meaningless! Meaningless! Meaningless! Everything of which one can say. The eye never has enough of seeing, nor the sun.#Cl_00",
"10 Is the Teacher, son of David, king in Jerusalem:#Zinium∆",
"2 “Meaningless.”#Hydra∆",
"3 What has been will of hearing.#Li_α3",
"9 What has enough of seeing, nor the sun.#Na∞",
"10 Is the Teacher. “Utterly meaningless! Meaningless! Meaningless.”#Li_α3",
"For the shadow of the mountain moved among the living. #Li_α3",
"And the voice of the river was lost in the earth. #Velium_04",
"The stone bore witness though no one remained. #Cl_00",
"And the night gathered the fragments of the day. #Na∞",
"For the house stood empty, yet full of breath. #Ferr∆",
"And the field answered with no language known. #Auri_∅7",
"The wind carried a message without origin. #Pb∞3",
"And the waters rose softly against the memory of the shore. #Zinium∆",
"For the path divided and forgot its purpose. #Si_19",
"And the sky bent low over the silent city. #Hydra∆",
"The earth opened but revealed nothing within. #Ca_8",
"And the flame burned without consuming the night. #Brom∞2",
"For the voice returned though no call was given. #Titan∆1",
"And the dust gathered itself into a form unseen. #Cobalt_5",
"The house remembered what the people had forgotten. #Mn∅7",
"And the tree leaned toward a light not present. #Xe∆7",
"For the shadow walked ahead of the body. #Ar_13",
"3 What do people gain from all their labors at which one can say, “Look! This is some, more they returning on its course.#Velium_04",
"7 All streams flow into the south and even those yet to come will be again.#Velium_04",
"8 All things are wearisome, more our time.#Velium_04",
"11 No one can says the former generations go, but there it rises.#Cl_00",
"6 The wind blows to the sea, yet the sun sets, and hurries back to where is nothing is meaningless! Meaningless!” says the Teacher. “Utterly meaningless#Velium_04",
"1 The words of the Teacher. “Utterly meaningless.”#Kr_∅9",
"3 What do people gain from all thing Is there is not be again.#Zor∞",
"10 Is the Teacher. “Utterly meaningless! Everything new under the Teacher. “Look! This is something new under the sun sets, and even those who follow them.#Xe∆7",
"The wind carried fragments of an unfinished word #Cl_00"                              
    ]
    let randomSelection= Math.floor(Math.random()*posts.length)


    const s = await masto.v1.statuses.create({
        status: posts[randomSelection],
        //change it to private to test
        visibility:'public',
    })
    console.log(s.url)
}

setInterval(makeStatus, 1000 * 60 * 77)