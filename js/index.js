function defineListaProdutos(produtos){

    let pesquisar =  document.querySelector(".btnPesquisar")
    
    let novaLista = defineListaProdutosMenu(produtos)

    pesquisar.addEventListener("click",function(){
        
        let input = document.querySelector(".inputPesquisar")
        
        valor  = input.value
        
        novaLista = verificaOAtivo(produtos)

        novaLista = defineListaProdutosPesquisa(novaLista,valor)
        
        filtra(novaLista)
    })
    

  return  novaLista

}

function defineListaProdutosPesquisa(produtos,valor){

    let novaLista = []

    produtos.forEach((produto) =>{
        let produtoNome = produto.nameItem.split(" ")

        produtoNome.forEach((nome) => {
            
            if(nome.toLowerCase() == valor.toLowerCase()){
                novaLista.push(produto)
            }
        })
    })

    return novaLista
}

function defineListaProdutosMenu(produtos){

    let element = document.querySelector(".menu")

    element.addEventListener("click",eventoClickItemMenu)

    return produtos
}

function eventoClickItemMenu(event){
    let input = document.querySelector(".inputPesquisar")
    input.value = ""

    produtos = [...data]

    let lista = document.querySelectorAll(".itemMenu")
       
    for(let i = 0; i < lista.length ; i++){

        if(lista[i].innerText == event.target.innerText){
            lista[i].classList.add("ativo")
            lista[i].classList.remove("naoAtivo") 
        }else{
            lista[i].classList.add("naoAtivo") 
            lista[i].classList.remove("ativo") 
        }

    }

    produtos = verificaOAtivo(produtos)
    
    filtra(produtos)
}


function verificaOAtivo(produtos){

    let categoria  = document.querySelector(".ativo").innerHTML

    if(categoria != "Todos"){
        produtos = produtos.filter(produto => {
            return produto.tag[0] == categoria
        })
    }

  return produtos
}

function filtra(novaLista){

    let ul = document.querySelector(".produtos ul")

    ul.innerHTML  = ''

    penduraCard(novaLista)

}

function reloadCarrinho(){
  
    carrinho(listCarrinho)

}

function criaCardProduto(produto){

    let li = document.createElement("li")
    li.classList.add("item")
    li.id = `${produto.id}`

    li.addEventListener("click", adicionarProduto)

    let img = document.createElement("img")
    img.src = "../img/jaqueta.svg"
    img.height = 150
    img.width  = 290
    img.alt = `${produto.nameItem}`
    li.appendChild(img)

    let div = criaDescricaoProduto(produto)
    li.appendChild(div)

    return li
}

function criaDescricaoProduto(produto){
    let div = document.createElement("div")
    div.classList.add("dadosCard")

    let h3 = document.createElement("h3")
    h3.classList.add("categoria")
    h3.innerText = `${produto.tag[0]}`
    div.appendChild(h3)

    let h2 = document.createElement("h2")
    h2.classList.add("nomeProduto")
    h2.innerText = `${produto.nameItem}`
    div.appendChild(h2)


    let pDescriacao = document.createElement("p")
    pDescriacao.classList.add("descricao")
    pDescriacao.innerText =`${produto.description}`
    div.appendChild(pDescriacao)

    let pValor = document.createElement("p")
    pValor.classList.add("valor")
    pValor.innerText = `${`R$${produto.value.toFixed(2)}`}`
    div.appendChild(pValor)
    
    let buttonAdicionar = document.createElement("button")
    buttonAdicionar.classList.add("btnAdicionar")
    buttonAdicionar.innerText = "Adicionar ao carrinho"

    div.appendChild(buttonAdicionar)

    return div
}

function adicionarProduto(event){

    if(event.target.tagName == "BUTTON"){
        
        data.forEach(produto =>{

            if(produto.id ==  event.currentTarget.id){
                listCarrinho.push(produto)
            }

        })
       
    }

    reloadCarrinho()

}

function penduraCard(produtos){
    
    let ul = document.querySelector(".produtos ul")

    produtos.forEach(produto => {

        let li = criaCardProduto(produto)

        ul.appendChild(li)

    })

}

function criaCardCarrinho(produto){

    let li = document.createElement("li")
    li.classList.add("itemCarrinho")
    li.id = produto.id

    li.addEventListener("click", removeProduto)

    let img = document.createElement("img")
    img.src = `${produto.img}`
    img.height = 67
    img.width  = 88
    img.alt = `${produto.nameItem}`
    li.appendChild(img)

    let div = criaDetalhesProdutoCarrinho(produto)
    li.appendChild(div)

    return li

}

function removeProduto(event){

    let removeu = true

    if(event.target.tagName == "BUTTON"){
        listCarrinho.forEach((produto,index) => {
            if(produto.id == event.currentTarget.id  && removeu){
                listCarrinho.splice(index,1)
                removeu = false
            }
        })
    
        reloadCarrinho()
    }
    
}

function criaDetalhesProdutoCarrinho(produto){
    let div = document.createElement("div")
    div.classList.add("carrinhoProdutoDetalhes")

    let h2 = document.createElement("h2")
    h2.classList.add("tituloProdutoCarrinho")
    h2.innerText = `${produto.nameItem}`
    div.appendChild(h2)

    let pValor = document.createElement("p")
    pValor.classList.add("valor")
    pValor.innerText = `${`R$${produto.value.toFixed(2)}`}`
    div.appendChild(pValor)
    
    let buttonAdicionar = document.createElement("button")
    buttonAdicionar.classList.add("removerProduto")
    buttonAdicionar.innerText = "Remover Produto"
    div.appendChild(buttonAdicionar)

    return div
}


function penduraCardCarrinho(produtos){
    
    let ul = document.querySelector(".produtosCarrinho")

    produtos.forEach(produto => {

        let li = criaCardCarrinho(produto)

        ul.appendChild(li)

    })

}

function detalhesCompra(produtos){
 
    let total = 0

    produtos.forEach(produto => {
        total += produto.value
    })
    
    let detalhesCompra = document.createElement("div")
    detalhesCompra.classList.add(".detalhesCompra")

    let detalheQuantidadeElement = deatalheQuantidade(produtos)
    let detalheTotalElement = detalheTotal(total)
    
    detalhesCompra.appendChild(detalheQuantidadeElement)
    detalhesCompra.appendChild(detalheTotalElement)

    return detalhesCompra

}

function deatalheQuantidade(produtos){
    let div = document.createElement("div")
    div.classList.add("detalhes")

    let pQuantidade = document.createElement("p")    
    pQuantidade.innerText = "Quantidade:"

    let quantidade = document.createElement("p") 
    pQuantidade.classList.add("quantidade")
    quantidade.innerText = `${produtos.length}`

    div.appendChild(pQuantidade)
    div.appendChild(quantidade)

    return div
}

function detalheTotal(total){
    let div = document.createElement("div")
    div.classList.add("detalhes")
    
    let p = document.createElement("p")
    p.innerText = `Total:`

    let valorTotal = document.createElement("p")
    valorTotal.classList.add("total")
    valorTotal.innerText = `R$${total.toFixed(2)}`


    div.appendChild(p)
    div.appendChild(valorTotal)

    return div
}

function produtos(baseDados){

    let produtos = defineListaProdutos([...baseDados])

    penduraCard(produtos)

}

function carrinho(lista){
    
    let secao = document.querySelector(".carrinhoCompra")
    secao.innerHTML = ""

    let titulo =  document.createElement("h2")
    titulo.innerText = "Carrinho de compras"
    titulo.classList.add("tituloCarrinho")
    secao.appendChild(titulo)

    if(lista.length > 0){
        
        let ul = document.createElement("ul")
        ul.classList.add("produtosCarrinho")

        secao.appendChild(ul)

        penduraCardCarrinho(lista)

        let detalhesCompraElement =  detalhesCompra(lista)

        secao.appendChild(detalhesCompraElement)
    
    }else{

        let divVazia = document.createElement("div")
        divVazia.classList.add("listaVazia")

        let  p = document.createElement("p")
        p.classList.add("textoCarrinhoVazioTitulo")
        p.innerText = `Carrinho vázio`
        let  placeHolder = document.createElement("p")
        placeHolder.classList.add("textoCarrinhoVazio")
        placeHolder.innerText = `Adicione itens`

        divVazia.appendChild(p)
        divVazia.appendChild(placeHolder)

        secao.appendChild(divVazia)

    }
   
}

let listCarrinho = []

produtos(data)

carrinho(listCarrinho)





