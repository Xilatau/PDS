//use api

import { data } from "react-router-dom";

export function GetPost () {
e.preventDefault();
fetch('https://localhost:7061/post/feed')
    .then(response => {
    if (!response.ok) throw new Error("Erro na API");
    return response.json();
    })
    .then(data => { 
        return data.$values;})
    .catch(error => {
    console.error("Erro ao conectar com a API:", error);
    });
    
};

export async function createPost({ userName, title, message }) {
    const payload = { userName, title, message, createdAt: new Date().toISOString() }
    const res = await fetch('https://localhost:7061/post/novo', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error("Falha ao criar o post")
    return res.json()
}
