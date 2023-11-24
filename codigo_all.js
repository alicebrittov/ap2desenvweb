const url = "https://botafogo-atletas.mange.li/all";

//const numero_jogador = 54;

const body = document.body;

const preenche = (atleta) => {
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');
    const descricao = document.createElement('p');
    const saibamais = document.createElement('h3')
    const posicao = document.createElement('h3')

    saibamais.textContent = 'Saiba Mais'; // Adicione o texto desejado, se aplicável
    saibamais.classList.add('saibamais'); // Adicione uma classe ao elemento
    saibamais.addEventListener('click', () => toggleDescricao(descricao)); // Adiciona um ouvinte de evento para mostrar/ocultar a descrição
    
    container.dataset.id = atleta.id;
    container.dataset.altura = atleta.altura;
    container.dataset.nome_completo = atleta.nome_completo;
    container.dataset.nascimento = atleta.nascimento;
    container.dataset.posicao = atleta.posicao;


    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;
    descricao.innerHTML = atleta.descricao;

    container.appendChild(imagem);
    container.appendChild(saibamais);
    container.appendChild(titulo);
    container.appendChild(descricao);
    container.appendChild(posicao);

    container.onclick = handleClick;

    document.body.appendChild(container);

      // Oculta a descrição inicialmente
      descricao.style.display = 'none';

};

const toggleDescricao = (descricao) => {
    // Adiciona ou remove a descrição com base na sua visibilidade atual
    if (descricao.style.display === 'block') {
        descricao.style.display = 'none';
    } else {
        descricao.style.display = 'block';
    }
};


const handleClick = (e) => {
    const artigo = e.target.closest('article');
    
    document.cookie = `id=${artigo.dataset.id}`;
    document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
    document.cookie = `nascimento=${artigo.dataset.nascimento}`;
    document.cookie = `altura=${artigo.dataset.altura}`;
    document.cookie = `posicao=${artigo.dataset.posicao}`;

    /*console.log(acha_cookie('nome_completo')); */
    
    const id = artigo.dataset.id;
    const nomeCompleto = encodeURIComponent(artigo.dataset.nome_completo);
    const nascimento = encodeURIComponent(artigo.dataset.nascimento);
    const altura = encodeURIComponent(artigo.dataset.altura);
    const imagem = encodeURIComponent(artigo.querySelector('img').src);
    const descricao = encodeURIComponent(artigo.querySelector('p').innerHTML);
    const posicao = encodeURIComponent(artigo.dataset.posicao);

     // Criar a URL com os parâmetros
     const detalhesURL = `detalhes.html?id=${id}&nome=${nomeCompleto}&nascimento=${nascimento}&altura=${altura}&imagem=${imagem}&descricao=${descricao}&posicao=${posicao}`;
    

     // Abrir a nova página detalhes.html com informações do atleta
     window.location.href = detalhesURL;
};

const acha_cookie = (chave) => {
    const lista_de_cookies = document.cookie.split("; ");
    const procurado = lista_de_cookies.find(
        (e) => e.startsWith(chave));
    return procurado.split("=")[1];
}


const pegar_coisas = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}


document.addEventListener('DOMContentLoaded', () => {
    // Seu código aqui
    pegar_coisas(`${url}`).then((entrada) => {
        for (atleta of entrada) {
            preenche(atleta);
        }
    });

    console.log('assíncrono');
});